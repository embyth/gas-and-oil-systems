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
) => highloadCoef * ((pressureStart ** 2 - pressureEnd ** 2) / segmentLength);

// Гідравлічний нахил
export const getHydraulicTilt = (
  pipeRoughness,
  segmentDiameter,
  segmentConsumption,
  kinematicViscosity,
  normalDensity
) =>
  (69 *
    (pipeRoughness / segmentDiameter +
      (1922 * (kinematicViscosity * segmentDiameter)) /
        Math.abs(segmentConsumption)) **
      0.25 *
    (segmentConsumption ** 2 * normalDensity)) /
  segmentDiameter ** 5;

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

// Перепад тиску
export const getDeltaPressureDrop = (hydraulicTilt, length) =>
  hydraulicTilt * length;

// Кінцевий тиску для мережі низького тиску
export const getEndPressureLow = (startPressure, dropPressure) =>
  startPressure - dropPressure;

// Кінцевий тиску для мережі середнього тиску
export const getEndPressureMedium = (startPressure, energyParameter, length) =>
  (startPressure ** 2 - energyParameter * length) ** 0.5;
