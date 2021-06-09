import { PIPE_ROUGHNESS, END_SUPPORT } from "./const";

export const getDeltaZ = (startGeoPoint, endGeoPoint) =>
  endGeoPoint - startGeoPoint;

export const getTemperatureCorrection = (density20) =>
  1.825 - 0.001315 * density20;

export const getDensity = (density20, temperatureCorrection, oilTemp) =>
  density20 - temperatureCorrection * (oilTemp - 20);

export const getViscosityCoef = (viscosity0, viscosity20) =>
  (1 / (20 - 0)) * Math.log(viscosity0 / viscosity20);

export const getViscosity = (viscosity0, viscosityCoef, oilTemp) =>
  viscosity0 * Math.exp(-viscosityCoef * (oilTemp - 0));

export const getDailyVolume = (annualVolume, density, workingDays) =>
  (1.07 * annualVolume * 10 ** 9) / (density * workingDays);

export const getHourlyVolume = (dailyVolume) => dailyVolume / 24;

export const getSecondlyVolume = (hourlyVolume) => hourlyVolume / 3600;

export const getPumpPressure = (aCoef, bCoef, volume) =>
  aCoef - bCoef * volume ** 2;

export const getMainStationPumpPressure = (
  singleMainPumpPressure,
  pumpAmount,
  singleSupPumpPressure
) => singleSupPumpPressure + pumpAmount * singleMainPumpPressure;

export const getMainPumpPressureTogather = (
  pumpAmount,
  singleMainPumpPressure
) => pumpAmount * singleMainPumpPressure;

export const getMainStationPressure = (mainStationPumpPressure, density) =>
  density * 9.81 * mainStationPumpPressure * 10 ** -6;

export const getInnerDiameter = (diameter, wall) => diameter - 2 * wall;

export const getVelocity = (volume, diameter) =>
  (4 * volume) / (Math.PI * diameter ** 2);

export const getReynolds = (velosity, diameter, viscosity) =>
  (velosity * diameter) / (viscosity * 10 ** -6);

export const getCoefHydraulicResistLam = (reynolds) => 64 / reynolds;

export const getCoefHydraulicResistTrans = (reynolds) =>
  (0.16 * reynolds - 13) * 10 ** -4;

export const getCoefHydraulicResistBlazius = (reynolds) =>
  0.3164 / reynolds ** 0.25;

export const getCoefHydraulicResistMix = (reynolds, coefB) =>
  coefB + 1.7 / reynolds ** 0.5;

export const getResistCoef = (reynolds, paramsByDiameter) => {
  const {
    reynoldsFirstPassingNumber,
    reynoldsSecondPassingNumber,
    reynoldsCoefB,
  } = paramsByDiameter;

  if (reynolds <= 2000) {
    return getCoefHydraulicResistLam(reynolds);
  }
  if (reynolds > 2000 && reynolds <= 2800) {
    return getCoefHydraulicResistTrans(reynolds);
  }
  if (reynolds > 2800 && reynolds < reynoldsFirstPassingNumber) {
    return getCoefHydraulicResistBlazius(reynolds);
  }
  if (
    reynolds > reynoldsFirstPassingNumber &&
    reynolds < reynoldsSecondPassingNumber
  ) {
    return getCoefHydraulicResistMix(reynolds, reynoldsCoefB);
  }
  return 0;
};

export const getCoefHydraulicResistAfter = (reynolds) =>
  1 / (1.8 * Math.log10(reynolds) - 1.5) ** 2;

export const getCoefHydraulicResistLast = (reynolds, diameter) =>
  0.11 * (68 / reynolds + PIPE_ROUGHNESS / diameter) ** 0.25;

export const getFrictionPressureLoss = (
  resistCoef,
  length,
  diameter,
  velosity
) => (((resistCoef * length) / diameter) * velosity ** 2) / (2 * 9.81);

export const getFrictionPressureLossComb = (frictionPressureLoss, dz) =>
  1.02 * frictionPressureLoss + dz + END_SUPPORT;

export const getStationPressure = (
  pressureLimit,
  density,
  singleSupPumpPressure
) => (pressureLimit * 10 ** 6) / (density * 9.81) - singleSupPumpPressure;

export const getStationsQuantity = (frictionPressureLossAll, stationPressure) =>
  frictionPressureLossAll / stationPressure;

export const getHydraulicTilt = (frictionPressureLoss, lengthCI) =>
  frictionPressureLoss / lengthCI;

export const getCoefW = (reynolds, paramsByDiameter) => {
  const { reynoldsFirstPassingNumber, reynoldsSecondPassingNumber } =
    paramsByDiameter;

  if (reynolds <= 2800) {
    return 0.5;
  }
  if (reynolds > 2800 && reynolds < reynoldsFirstPassingNumber) {
    return 0.297;
  }
  if (
    reynolds > reynoldsFirstPassingNumber &&
    reynolds < reynoldsSecondPassingNumber
  ) {
    return 0.272;
  }
  return 0.25;
};

export const getLoopingLength = (
  hydraulicTilt,
  stationsQuantity,
  stations,
  stationPressure,
  coefW
) =>
  ((stationsQuantity - stations) * stationPressure) /
  (1.02 * hydraulicTilt * (1 - coefW));

export const getVolumeCoef = (coefSup, pumpAmount, stations, coefMain) =>
  coefSup + pumpAmount * stations * coefMain;

export const getCoefKappa = () => (1.02 * 8) / (Math.PI ** 2 * 9.81);

export const getThrottlePressure = (
  mainStationPressure,
  pressureLimit,
  density
) => {
  if (mainStationPressure > pressureLimit) {
    return ((mainStationPressure - pressureLimit) * 10 ** 6) / (density * 9.81);
  }
  return 0;
};

export const getSumThrottlePressure = (stations, throttlePressure) =>
  stations * throttlePressure;

export const getFactualVolume = (
  volCoefA,
  volCoefB,
  coefKappa,
  resistCoef,
  deltaZ,
  sumThrottlePressure,
  lengthCI,
  diameterCI
) =>
  Math.sqrt(
    (volCoefA - deltaZ - END_SUPPORT - sumThrottlePressure) /
      (volCoefB + coefKappa * resistCoef * (lengthCI / diameterCI ** 5))
  );

export const getAllowablePressure = (pressureLimit, density) =>
  (pressureLimit * 10 ** 6) / (density * 9.81);

export const getCoefEpsilon = (diameter) =>
  (2 * PIPE_ROUGHNESS) / (diameter * 10 ** 3);

export const getReynoldsFirstNum = (coefEps) => 59.5 / coefEps ** (8 / 7);

export const getReynoldsSecondNum = (coefEps) =>
  (665 - 765 * Math.log10(coefEps)) / coefEps;

export const getPumpPressureLoss = (
  coefKappa,
  resistCoef,
  length,
  diameter,
  volume,
  z1,
  z2
) =>
  coefKappa * resistCoef * ((length * 10 ** 3) / diameter ** 5) * volume ** 2 +
  (z2 - z1);

export const getOutletSupport = (stationPumpPressure, sumPressureLoss) =>
  stationPumpPressure - sumPressureLoss;

export const getExceedingSupport = (outletSupport, minAllowablePressure) =>
  outletSupport - minAllowablePressure;

export const getStationOutletPumpPressure = (
  stationMainPumpPressureTogather,
  outletSupport
) => stationMainPumpPressureTogather + outletSupport;
