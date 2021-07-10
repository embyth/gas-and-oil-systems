import {
  AnnualNormsOfHeatConsumptionFor,
  GAS_CONSUMPTION_FOR_HEATING_COEF,
  NORM_OF_TOTAL_LIVING_SPACE_PER_PERSON,
  GAS_FURNACES_EFFICIENCY,
  BOILER_EFFICIENCY,
  NORMATIVE_TERM_FOR_VENTILATION,
  GAS_CONSUMPTION_FOR_HEATING_PUBLIC_BUILDINGS_COEF,
} from "./const";

// Розрахунок витрат газу споживачами сільського населеного пункту
// Річна витрата тепла на господарсько-побутові потреби населення у житлових будинках
export const getAnnualHeatConsumptionHousehold = (
  inhibitantsAmount,
  devicesGpCvg,
  devicesGpVng,
  devicesGp
) =>
  Math.round(inhibitantsAmount * devicesGpCvg) *
    AnnualNormsOfHeatConsumptionFor.GP_CGP +
  Math.round(inhibitantsAmount * devicesGpVng) *
    AnnualNormsOfHeatConsumptionFor.GP_VNG +
  Math.round(inhibitantsAmount * devicesGp) *
    AnnualNormsOfHeatConsumptionFor.GP;

// Річна витрата тепла на утримання тварин
export const getAnnualHeatConsumptionAnimals = (
  cowsAmount,
  horsesAmount,
  pigsAmount
) =>
  cowsAmount * AnnualNormsOfHeatConsumptionFor.COWS +
  horsesAmount * AnnualNormsOfHeatConsumptionFor.HORSES +
  pigsAmount * AnnualNormsOfHeatConsumptionFor.PIGS;

// Загальна кількість тепла на господарсько-побутові потреби для житлового сектора
export const getAnnualHeatConsumptionCombined = (
  annualHeatConsumptionHousehold,
  annualHeatConsumptionAnimals
) => annualHeatConsumptionHousehold + annualHeatConsumptionAnimals;

// Річна витрата газу на господарсько-побутові потреби (тис. м3/рік)
export const getAnnualHeatConsumptionGas = (
  annualHeatConsumptionCombined,
  lowerVolumetricHeat
) => annualHeatConsumptionCombined / lowerVolumetricHeat;

// Максимальна годинна витрати газу на господарсько-побутові потреби
export const getMaxAnnualHeatConsumptionGas = (annualHeatConsumptionGas) =>
  annualHeatConsumptionGas * 10 ** 3 * (1 / GAS_CONSUMPTION_FOR_HEATING_COEF);

// Кількість жителів, що проживає у будинках
export const getBuildingResidents = (inhibitantsAmount, buildingState) =>
  Math.round(inhibitantsAmount * buildingState);

// Интерполяція для укрупненого показника на опалення
export const getInterpolationForHeating = (
  isSkip,
  tempForHeating,
  indicatorHeatingFluxes
) => {
  if (isSkip) {
    return 0;
  }

  if (indicatorHeatingFluxes.some((item) => item.temp === tempForHeating)) {
    return indicatorHeatingFluxes.find((item) => item.temp === tempForHeating)
      .heatFlux;
  }

  const higherItemIndex = indicatorHeatingFluxes.findIndex(
    (item) => item.temp < tempForHeating
  );

  const higherItem = indicatorHeatingFluxes[higherItemIndex];
  const lowerItem = indicatorHeatingFluxes[higherItemIndex - 1];

  const heatFlux1 = lowerItem.heatFlux;
  const heatFlux2 = higherItem.heatFlux;

  const tempForHeating1 = lowerItem.temp;
  const tempForHeating2 = higherItem.temp;

  return (
    heatFlux2 -
    ((heatFlux2 - heatFlux1) * (tempForHeating - tempForHeating2)) /
      (tempForHeating1 - tempForHeating2)
  );
};

// Максимальний тепловий потік на опалення житлових і громадських будівель
export const getMaximumHeatFlow = (
  ns1,
  qs1,
  ns2,
  qs2,
  ns3,
  qs3,
  nn1,
  qn1,
  nn2,
  qn2,
  nn3
) =>
  (1 + GAS_CONSUMPTION_FOR_HEATING_PUBLIC_BUILDINGS_COEF) *
  NORM_OF_TOTAL_LIVING_SPACE_PER_PERSON *
  (ns1 * qs1 + ns2 * qs2 + ns3 * qs3 + nn1 * qn1 + nn2 * qn2 + nn3 * qn2);

// Максимальна годинна витрата теплоти на опалення житлових і громадських будівель
export const getMaximumHourlyHeatConsumption = (maximumHeatFlow) =>
  maximumHeatFlow * 3600 * 10 ** -6;

// Максимальна годинна витрата газу на опалення житлових і громадських будівель
export const getMaximumHourlyGasConsumption = (
  maximumHourlyHeatConsumption,
  lowerVolumetricHeat,
  heatingDeviceGgp,
  heatingDeviceIok
) =>
  (maximumHourlyHeatConsumption / (lowerVolumetricHeat * 10 ** -3)) *
  (heatingDeviceGgp / GAS_FURNACES_EFFICIENCY +
    heatingDeviceIok / BOILER_EFFICIENCY);

// Середня годинна витрата газу на опалення житлових і громадських будівель
export const getAverageHourlyGasConsumption = (
  maximumHourlyGasConsumption,
  temperatureInside,
  temperatureAvgHeating,
  temperatureForHeating
) =>
  (maximumHourlyGasConsumption * (temperatureInside - temperatureAvgHeating)) /
  (temperatureInside - temperatureForHeating);

// Річна витрата газу на опалення житлових і громадських будівель
export const getAnnualGasConsumptionForHeating = (
  averageHourlyGasConsumption,
  heatingDuration
) => averageHourlyGasConsumption * 24 * heatingDuration * 0.001;

// Максимальний тепловий потік на вентиляцію громадських будівель
export const getMaximumHeatFlowForVentilation = (
  ns1,
  qs1,
  ns2,
  qs2,
  ns3,
  qs3,
  nn1,
  qn1,
  nn2,
  qn2,
  nn3
) =>
  GAS_CONSUMPTION_FOR_HEATING_PUBLIC_BUILDINGS_COEF *
    0.4 *
    NORM_OF_TOTAL_LIVING_SPACE_PER_PERSON *
    (ns1 * qs1 + ns2 * qs2 + ns3 * qs3) +
  GAS_CONSUMPTION_FOR_HEATING_PUBLIC_BUILDINGS_COEF *
    0.6 *
    NORM_OF_TOTAL_LIVING_SPACE_PER_PERSON *
    (nn1 * qn1 + nn2 * qn2 + nn3 * qn2);

// Максимальна годинна витрата теплоти на вентиляцію громадських будівель
export const getMaximumHourlyHeatConsumptionForVentilation = (
  maximumHeatFlowForVentilation
) => maximumHeatFlowForVentilation * 3600 * 10 ** -6;

// Максимальна годинна витрата газу на вентиляцію громадських будівель
export const getMaximumHourlyGasConsumptionForVentilation = (
  maximumHourlyHeatConsumptionForVentilation,
  lowerVolumetricHeat,
  heatingDeviceGp,
  heatingDeviceIok
) =>
  (maximumHourlyHeatConsumptionForVentilation /
    (lowerVolumetricHeat * 10 ** -3)) *
  (heatingDeviceGp / GAS_FURNACES_EFFICIENCY +
    heatingDeviceIok / BOILER_EFFICIENCY);

// Середня годинна витрата газу на вентиляцію громадських будівель
export const getAverageHourlyGasConsumptionForVentilation = (
  maximumHourlyGasConsumptionForVentilation,
  temperatureInside,
  temperatureAvgHeating,
  temperatureForVenting
) =>
  (maximumHourlyGasConsumptionForVentilation *
    (temperatureInside - temperatureAvgHeating)) /
  (temperatureInside - temperatureForVenting);

// Річна витрата газу на вентиляцію громадських будівель
export const getAnnualGasConsumptionForVentilation = (
  averageHourlyGasConsumptionForVentilation,
  heatingDuration
) =>
  averageHourlyGasConsumptionForVentilation *
  NORMATIVE_TERM_FOR_VENTILATION *
  heatingDuration *
  0.001;

// Сума максимальних годинних витрат газу
export const getSumOfTheMaximumHourlyGasConsumption = (
  maxAnnualHeatConsumptionGas,
  maximumHourlyGasConsumption,
  maximumHourlyGasConsumptionForVentilation
) =>
  maxAnnualHeatConsumptionGas +
  maximumHourlyGasConsumption +
  maximumHourlyGasConsumptionForVentilation;

// Сума річних витрат газу
export const getAmountOfAnnualGasConsumption = (
  annualHeatConsumptionGas,
  annualGasConsumptionForHeating,
  annualGasConsumptionForVentilation
) =>
  annualHeatConsumptionGas +
  annualGasConsumptionForHeating +
  annualGasConsumptionForVentilation;

// Максимальний об'єм газу який буде рухатись газопроводами низького тиску
export const getMaximumVolumeOfGas = (
  maxAnnualHeatConsumptionGas,
  maximumHourlyGasConsumption
) => maxAnnualHeatConsumptionGas + (4 / 5) * maximumHourlyGasConsumption;

// Максимальна годинна витрата газу на вентиляцію
export const getMaxHourlyGasConsumptionForVentilation = (
  maximumHourlyGasConsumptionForVentilation,
  maximumHourlyGasConsumption
) =>
  maximumHourlyGasConsumptionForVentilation +
  (1 / 5) * maximumHourlyGasConsumption;

// Максимальна годинна витрата газу на ГРП
export const getMaximumHourlyGasConsumptionGRP = (
  maximumVolumeOfGas,
  maxHourlyGasConsumptionForVentilation
) => maximumVolumeOfGas + maxHourlyGasConsumptionForVentilation;

// Cередній гідравлічний нахил для мережі низького тиску
export const getAverageHydraulicInclination = (
  highloadCoef,
  pressureDrop,
  segmentLength
) => (highloadCoef * pressureDrop) / (1.1 * segmentLength);

// Cередній гідравлічний нахил для мережі середнього тиску
export const getAverageHydraulicInclinationMedium = (
  highloadCoef,
  pressureStart,
  pressureEnd,
  segmentLength
) =>
  highloadCoef *
  ((pressureStart ** 2 - pressureEnd ** 2) / (1.1 * segmentLength));

// Фактичне значення енергетичного параметру
export const getActualEnergyParameter = (
  pipeRoughness,
  segmentDiameter,
  segmentConsumption,
  kinematicViscosity,
  normalDensity
) =>
  (1.54 *
    10 ** -5 *
    (pipeRoughness / segmentDiameter +
      (1922 * (kinematicViscosity * segmentDiameter)) /
        Math.abs(segmentConsumption)) **
      0.25 *
    (segmentConsumption ** 2 * normalDensity)) /
  segmentDiameter ** 5;

// Число Рейнольдса
export const getReynoldsNumber = (
  segmentConsumption,
  segmentDiameter,
  kinematicViscosity
) =>
  0.0354 *
  (Math.abs(segmentConsumption) / (segmentDiameter * kinematicViscosity));

// Гідравлічний нахил для Рейнольдса > 4000
export const getHydraulicTilt4000 = (
  pipeRoughness,
  segmentDiameter,
  segmentConsumption,
  kinematicViscosity,
  normalDensity
) =>
  (75.9 *
    (pipeRoughness / segmentDiameter +
      (1922 * (kinematicViscosity * segmentDiameter)) /
        Math.abs(segmentConsumption)) **
      0.25 *
    (segmentConsumption ** 2 * normalDensity)) /
  segmentDiameter ** 5;

// Гідравлічний нахил для Рейнольдса > 2000
export const getHydraulicTilt2000 = (
  segmentDiameter,
  segmentConsumption,
  kinematicViscosity,
  normalDensity
) =>
  0.568 *
  ((Math.abs(segmentConsumption) ** 2.333 * normalDensity) /
    (segmentDiameter ** 5.333 * kinematicViscosity ** 0.333));

// Гідравлічний нахил для Рейнольдса < 2000
export const getHydraulicTilt0 = (
  segmentDiameter,
  segmentConsumption,
  kinematicViscosity,
  normalDensity
) =>
  1.245 *
  10 ** 6 *
  ((Math.abs(segmentConsumption) * kinematicViscosity * normalDensity) /
    segmentDiameter ** 4);

// Гідравлічний нахил
export const getHydraulicTilt = (
  reynolds,
  pipeRoughness,
  segmentDiameter,
  segmentConsumption,
  kinematicViscosity,
  normalDensity
) => {
  if (reynolds >= 4000) {
    return getHydraulicTilt4000(
      pipeRoughness,
      segmentDiameter,
      segmentConsumption,
      kinematicViscosity,
      normalDensity
    );
  }

  if (reynolds >= 2000 && reynolds < 4000) {
    return getHydraulicTilt2000(
      segmentDiameter,
      segmentConsumption,
      kinematicViscosity,
      normalDensity
    );
  }

  if (reynolds < 2000) {
    return getHydraulicTilt0(
      segmentDiameter,
      segmentConsumption,
      kinematicViscosity,
      normalDensity
    );
  }

  throw new Error(`Помилка в формулі гідравлічного нахилу`);
};

// Перепад тиску
export const getDeltaPressureDrop = (hydraulicTilt, length) =>
  hydraulicTilt * length;

// Кінцевий тиск
export const getOutSegmentPressure = (startPressure, energyParameter, length) =>
  startPressure - (startPressure ** 2 - energyParameter * length) ** 0.5;

// Значення похибки Кірхгофа
export const getDeltaKirghof = (sumPressureDrop, absoluteSumPressureDrop) =>
  Math.abs((sumPressureDrop / (0.5 * absoluteSumPressureDrop)) * 100);

// Відношення втрат тиску до витрати газу
export const getPressureDropToConsumption = (pressureDrop, consumption) =>
  pressureDrop / consumption;

// Поправочна витрата газу, що враховує нев‘язку у своєму контурі для мережі низького тиску
export const getCorrectiveGasConsumption = (
  sumPressureDrop,
  sumPressureDropToConsumption
) => -(sumPressureDrop / (1.75 * sumPressureDropToConsumption));

// Поправочна витрата газу, що враховує нев‘язку у своєму контурі для мережі середнього тиску
export const getCorrectiveGasConsumptionMedium = (
  sumPressureDrop,
  sumPressureDropToConsumption
) => -(sumPressureDrop / (2 * sumPressureDropToConsumption));

// Поправочна витрата газу, що враховує нев‘язку у сусідніх контурах
export const getCorrectiveGasConsumptionWithNeibghor = (
  sumCorrectiveGasConsumptions,
  sumPressureDropToConsumption
) => sumCorrectiveGasConsumptions / sumPressureDropToConsumption;

// Загальні поправочні витрати газу
export const getTotalCorrectionGasConsumption = (
  correctiveGasConsumption,
  correctiveGasConsumptionWithNeibghor
) => correctiveGasConsumption + correctiveGasConsumptionWithNeibghor;

// Уточнені витрати газу
export const getSpecifiedConsumption = (
  prevConsumption,
  totalCorrectionGasConsumption,
  modificator
) =>
  modificator === "addition"
    ? prevConsumption + totalCorrectionGasConsumption
    : prevConsumption - totalCorrectionGasConsumption;
