import * as formulas from "./formulas";
import { getWorkingDays, getLengthInCI, getParamsByDiameter } from "./tech";
import { adaptIncomeDataToServer, adaptStationsDataToServer } from "./utils";

export const firstCalculation = (clientData) => {
  const adaptedData = adaptIncomeDataToServer(clientData);

  const {
    annualVolume,
    length,
    density20,
    viscosity0,
    viscosity20,
    diameter,
    wall,
    oilTemp,
    pipelineCondition,
    aCoefMain,
    bCoefMain,
    aCoefSup,
    bCoefSup,
    pumpAmount,
    startGeoPoint,
    endGeoPoint,
  } = adaptedData;
  const lengthCI = getLengthInCI(length, `km`);
  const paramsByDiameter = getParamsByDiameter(diameter);
  const deltaZ = formulas.getDeltaZ(startGeoPoint, endGeoPoint);

  const results = {};

  // Визначення розрахункових величин густини, в’язкості та витрати нафти
  const tempCorrection = formulas.getTemperatureCorrection(density20);
  results.tempCorrection = +tempCorrection.toFixed(4);

  const density = formulas.getDensity(density20, tempCorrection, oilTemp);
  results.density = +density.toFixed(1);

  const viscosityCoef = formulas.getViscosityCoef(viscosity0, viscosity20);
  results.viscosityCoef = +viscosityCoef.toFixed(4);

  const viscosity = formulas.getViscosity(viscosity0, viscosityCoef, oilTemp);
  results.viscosity = +viscosity.toFixed(2);

  const workingDays = getWorkingDays(length, diameter, pipelineCondition);
  results.workingDays = +workingDays.toFixed(0);

  const dailyVolume = formulas.getDailyVolume(
    annualVolume,
    density,
    workingDays
  );
  results.dailyVolume = +dailyVolume.toFixed(1);

  const hourlyVolume = formulas.getHourlyVolume(dailyVolume);
  results.hourlyVolume = +hourlyVolume.toFixed(1);

  const secondlyVolume = formulas.getSecondlyVolume(hourlyVolume);
  results.secondlyVolume = +secondlyVolume.toFixed(4);

  // Характеристика основного обладнання нафтоперекачувальної станції
  const singleMainPumpPressure = formulas.getPumpPressure(
    aCoefMain,
    bCoefMain,
    secondlyVolume
  );
  results.singleMainPumpPressure = +singleMainPumpPressure.toFixed(1);

  const singleSupPumpPressure = formulas.getPumpPressure(
    aCoefSup,
    bCoefSup,
    secondlyVolume
  );
  results.singleSupPumpPressure = +singleSupPumpPressure.toFixed(2);

  const mainStationPumpPressure = formulas.getMainStationPumpPressure(
    singleMainPumpPressure,
    pumpAmount,
    singleSupPumpPressure
  );
  results.mainStationPumpPressure = +mainStationPumpPressure.toFixed(1);

  const mainStationPressure = formulas.getMainStationPressure(
    mainStationPumpPressure,
    density
  );
  results.mainStationPressure = +mainStationPressure.toFixed(3);

  // Гідравлічний розрахунок нафтопроводу
  const innerDiameter = formulas.getInnerDiameter(diameter, wall);
  const diameterCI = getLengthInCI(innerDiameter, `mm`);
  results.diameterCI = +diameterCI.toFixed(3);

  const velosity = formulas.getVelocity(secondlyVolume, diameterCI);
  results.velosity = +velosity.toFixed(3);

  const reynolds = formulas.getReynolds(velosity, diameterCI, viscosity);
  results.reynolds = +reynolds.toFixed(0);

  const coefHydraulicResist = formulas.getResistCoef(
    reynolds,
    paramsByDiameter
  );
  results.coefHydraulicResist = +coefHydraulicResist.toFixed(4);

  const frictionPressureLoss = formulas.getFrictionPressureLoss(
    coefHydraulicResist,
    lengthCI,
    diameterCI,
    velosity
  );
  results.frictionPressureLoss = +frictionPressureLoss.toFixed(1);

  const frictionPressureLoss100 = formulas.getFrictionPressureLoss(
    coefHydraulicResist,
    100000,
    diameterCI,
    velosity
  );
  results.frictionPressureLoss100 = +frictionPressureLoss100.toFixed(1);

  const frictionPressureLossAll = formulas.getFrictionPressureLossComb(
    frictionPressureLoss,
    deltaZ
  );
  results.frictionPressureLossAll = +frictionPressureLossAll.toFixed(1);

  const stationPressure = formulas.getStationPressure(
    paramsByDiameter.pressureLimit,
    density,
    singleSupPumpPressure
  );
  results.stationPressure = +stationPressure.toFixed(1);

  const stationsQuantity = formulas.getStationsQuantity(
    frictionPressureLossAll,
    stationPressure
  );
  results.stationsQuantity = +stationsQuantity.toFixed(2);
  const isLooping = stationsQuantity % 1 < 0.2;
  results.isLooping = isLooping;
  const stations = isLooping
    ? Math.floor(stationsQuantity)
    : Math.ceil(stationsQuantity);
  results.stations = +stations.toFixed(0);

  if (isLooping) {
    const hydraulicTilt = formulas.getHydraulicTilt(
      frictionPressureLoss,
      lengthCI
    );
    results.hydraulicTilt = +hydraulicTilt.toFixed(4);
    const coefW = formulas.getCoefW(reynolds, paramsByDiameter);
    results.coefW = +coefW.toFixed(3);
    const loopingLength = formulas.getLoopingLength(
      hydraulicTilt,
      stationsQuantity,
      stations,
      stationPressure,
      coefW
    );
    results.loopingLength = +loopingLength.toFixed(1);
  }

  // Уточнений гідравлічний розрахунок нафтопроводу
  let currentVolume = secondlyVolume;
  let isConditionNotSatisfies = true;
  do {
    const volCoefA = formulas.getVolumeCoef(
      aCoefSup,
      pumpAmount,
      stations,
      aCoefMain
    );
    results.volCoefA = +volCoefA.toFixed(1);
    const volCoefB = formulas.getVolumeCoef(
      bCoefSup,
      pumpAmount,
      stations,
      bCoefMain
    );
    results.volCoefB = +volCoefB.toFixed(1);

    const coefKappa = formulas.getCoefKappa();
    results.coefKappa = +coefKappa.toFixed(5);

    const factVelosity = formulas.getVelocity(currentVolume, diameterCI);
    results.factVelosity = +factVelosity.toFixed(3);

    const factReynolds = formulas.getReynolds(
      factVelosity,
      diameterCI,
      viscosity
    );
    results.factReynolds = +factReynolds.toFixed(0);

    const resistCoef = formulas.getResistCoef(factReynolds, paramsByDiameter);
    results.resistCoef = +resistCoef.toFixed(4);

    const factSingleMainPumpPressure = formulas.getPumpPressure(
      aCoefMain,
      bCoefMain,
      currentVolume
    );
    results.factSingleMainPumpPressure = +factSingleMainPumpPressure.toFixed(1);

    const factSingleSupPumpPressure = formulas.getPumpPressure(
      aCoefSup,
      bCoefSup,
      currentVolume
    );
    results.factSingleSupPumpPressure = +factSingleSupPumpPressure.toFixed(2);

    const factMainStationPumpPressure = formulas.getMainStationPumpPressure(
      factSingleMainPumpPressure,
      pumpAmount,
      factSingleSupPumpPressure
    );
    results.factMainStationPumpPressure =
      +factMainStationPumpPressure.toFixed(1);

    const factMainStationPressure = formulas.getMainStationPressure(
      factMainStationPumpPressure,
      density
    );
    results.factMainStationPressure = +factMainStationPressure.toFixed(3);

    const throttlePressure = formulas.getThrottlePressure(
      factMainStationPressure,
      paramsByDiameter.pressureLimit,
      density
    );
    results.throttlePressure = +throttlePressure.toFixed(2);

    const sumThrottlePressure = formulas.getSumThrottlePressure(
      stations,
      throttlePressure
    );
    results.sumThrottlePressure = +sumThrottlePressure.toFixed(1);

    const factVolume = formulas.getFactualVolume(
      volCoefA,
      volCoefB,
      coefKappa,
      resistCoef,
      deltaZ,
      sumThrottlePressure,
      lengthCI,
      diameterCI
    );
    results.factVolume = +factVolume.toFixed(4);

    if (Math.abs(currentVolume - factVolume) <= 0.0001) {
      isConditionNotSatisfies = false;
    } else {
      currentVolume = factVolume;
    }
  } while (isConditionNotSatisfies);

  return results;
};

export const secondCalculation = (clientData) => {
  const adaptedData = adaptStationsDataToServer(clientData);

  const { aCoefMain, bCoefMain, aCoefSup, bCoefSup } = adaptedData.incomeData;
  const {
    lengths,
    geoPoints,
    pumpUnits,
    pressureMinLimits,
    pressureMaxLimits,
  } = adaptedData.stationsData;
  const {
    density,
    stations: stationsData,
    diameterCI,
    viscosity,
  } = adaptedData.results;

  const stations = stationsData.length - 1;

  const results = { stations: {} };

  // Пропускна здатність магістрального нафтопроводу
  const kappa = formulas.getCoefKappa();

  let iteration = 0;
  let countingVolume = 0.1;
  let isCondition = true;
  do {
    iteration += 1;
    countingVolume += 0.0001;

    if (iteration > 100000) {
      throw new Error(`Розрахунок увійшов у нескінченний цикл!`);
    }

    for (let station = 0; station < stations; station += 1) {
      const stationResults = {};

      const maxAllowablePressure = formulas.getAllowablePressure(
        pressureMaxLimits[station],
        density
      );
      stationResults.maxAllowablePressure = +maxAllowablePressure.toFixed(1);

      const minAllowablePressure = formulas.getAllowablePressure(
        pressureMinLimits[station],
        density
      );
      stationResults.minAllowablePressure = +minAllowablePressure.toFixed(1);

      const velosityFact = formulas.getVelocity(countingVolume, diameterCI);
      stationResults.velosityFact = +velosityFact.toFixed(4);

      const reynoldsFact = formulas.getReynolds(
        velosityFact,
        diameterCI,
        viscosity
      );
      stationResults.reynoldsFact = +reynoldsFact.toFixed(0);

      const coefEpsilon = formulas.getCoefEpsilon(diameterCI);
      stationResults.coefEpsilon = +coefEpsilon.toFixed(7);

      const reynoldsFirst = formulas.getReynoldsFirstNum(coefEpsilon);
      stationResults.reynoldsFirst = +reynoldsFirst.toFixed(0);

      const reynoldsSecond = formulas.getReynoldsSecondNum(coefEpsilon);
      stationResults.reynoldsSecond = +reynoldsSecond.toFixed(0);

      let resistCoefFact;
      if (reynoldsFact <= 2320) {
        resistCoefFact = formulas.getCoefHydraulicResistLam(reynoldsFact);
      } else if (
        reynoldsFact > 2320 &&
        reynoldsFact < reynoldsFirst &&
        reynoldsFact < 10 ** 5
      ) {
        resistCoefFact = formulas.getCoefHydraulicResistBlazius(reynoldsFact);
      } else if (
        reynoldsFact > 2320 &&
        reynoldsFact < reynoldsFirst &&
        reynoldsFact > 10 ** 5
      ) {
        resistCoefFact = formulas.getCoefHydraulicResistAfter(reynoldsFact);
      } else {
        resistCoefFact = formulas.getCoefHydraulicResistLast(
          reynoldsFact,
          diameterCI
        );
      }
      stationResults.resistCoefFact = +resistCoefFact.toFixed(5);

      const sumPressureLoss = formulas.getPumpPressureLoss(
        kappa,
        resistCoefFact,
        lengths[station],
        diameterCI,
        countingVolume,
        geoPoints[station],
        geoPoints[station + 1]
      );
      stationResults.sumPressureLoss = +sumPressureLoss.toFixed(1);

      const stationMainPumpPressure = formulas.getPumpPressure(
        aCoefMain,
        bCoefMain,
        countingVolume
      );
      stationResults.stationMainPumpPressure =
        +stationMainPumpPressure.toFixed(1);

      const stationMainPumpPressureTogather =
        formulas.getMainPumpPressureTogather(
          pumpUnits[station],
          stationMainPumpPressure
        );
      stationResults.stationMainPumpPressureTogather =
        +stationMainPumpPressureTogather.toFixed(1);

      const stationSupPumpPressure = formulas.getPumpPressure(
        aCoefSup,
        bCoefSup,
        countingVolume
      );
      stationResults.stationSupPumpPressure =
        +stationSupPumpPressure.toFixed(1);

      let stationPumpPressure = formulas.getMainStationPumpPressure(
        stationMainPumpPressure,
        pumpUnits[station],
        stationSupPumpPressure
      );
      if (stationPumpPressure >= maxAllowablePressure) {
        stationPumpPressure = maxAllowablePressure;
      }
      stationResults.stationPumpPressure = +stationPumpPressure.toFixed(1);

      const outletSupport = formulas.getOutletSupport(
        stationPumpPressure,
        sumPressureLoss
      );
      stationResults.outletSupport = +outletSupport.toFixed(1);

      const exceedingSupport = formulas.getExceedingSupport(
        outletSupport,
        minAllowablePressure
      );
      stationResults.exceedingSupport = +exceedingSupport.toFixed(1);

      let stationOutletPumpPressure;
      if (station === 0) {
        stationOutletPumpPressure = formulas.getMainStationPumpPressure(
          stationMainPumpPressure,
          pumpUnits[station],
          stationSupPumpPressure
        );
      } else {
        const previousStationOutletSupport =
          results.stations[station - 1].outletSupport;
        stationOutletPumpPressure = formulas.getStationOutletPumpPressure(
          stationMainPumpPressureTogather,
          previousStationOutletSupport
        );
      }
      stationResults.stationOutletPumpPressureFull =
        +stationOutletPumpPressure.toFixed(1);
      if (stationOutletPumpPressure >= maxAllowablePressure) {
        stationOutletPumpPressure = maxAllowablePressure;
      }
      stationResults.stationOutletPumpPressure =
        +stationOutletPumpPressure.toFixed(1);

      results.stations[station] = stationResults;

      if (exceedingSupport <= 0.1 && exceedingSupport >= -0.1) {
        isCondition = false;
        results.stationVolume = +countingVolume.toFixed(4);
        break;
      }
    }
  } while (isCondition);

  return {
    main: {
      ...adaptedData.results,
      stations: adaptedData.results.stations.length - 1,
    },

    extra: {
      ...results.stations[0],
      stationVolume: results.stationVolume,
    },

    stations: Object.values(results.stations),
  };
};
