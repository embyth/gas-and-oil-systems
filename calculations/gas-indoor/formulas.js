// Розрахункова довжина ділянки
export const estimatedLength = (length, resistCoef) =>
  length * (1 + resistCoef / 100);

// Надлишковий тиск на вході до споживача
export const inletPressure = (startPressure, allowablePressure) =>
  startPressure - allowablePressure;

// Середній абсолютний тиск газу в системі
export const averagePressure = (
  atmosphericPressure,
  startPressure,
  inletPressureVal
) =>
  (atmosphericPressure + 0.5 * (startPressure + inletPressureVal)) * 10 ** -6;

// Середній гідравлічний нахил в газовій мережі
export const averageHydraulicInc = (
  overloadFactor,
  allowablePressure,
  sumEstimatedLength
) => overloadFactor * (allowablePressure / sumEstimatedLength);

// Внутрішній діаметр ділянки газової мережі, що має усереднене значення витрати газу
export const innerDiameter = (
  consumption,
  temperature,
  averagePressureVal,
  velocity
) =>
  0.036238 *
  Math.sqrt((consumption * temperature) / (averagePressureVal * velocity));

// Гідравлічний нахил на характерній ділянці при прийнятій швидкості руху газу
export const estimatedHydraulicInc = (
  roughness,
  diameter,
  viscosity,
  consumption,
  density
) =>
  (69 *
    (roughness / diameter + (1922 * (viscosity * diameter)) / consumption) **
      0.25 *
    (consumption ** 2 * density)) /
  diameter ** 5;

// Число Рейнольдса
export const reynoldsNumber = (consumption, diameter, viscosity) =>
  (0.0354 * consumption) / (diameter * viscosity);

// Втрата тиску від тертя на ділянці якщо Re<=2000
export const pressureLossRe2000 = (
  consumption,
  viscosity,
  density,
  diameter,
  estimatedLengthVal
) =>
  (1.132 * 10 ** 6 * (consumption * viscosity * density * estimatedLengthVal)) /
  diameter ** 4;

// Втрата тиску від тертя на ділянці якщо 2000<Re<4000
export const pressureLossRe3000 = (
  consumption,
  density,
  estimatedLengthVal,
  diameter,
  viscosity
) =>
  (0.516 * (consumption ** 2.333 * density * estimatedLengthVal)) /
  (diameter ** 5.333 * viscosity ** 0.333);

// Втрата тиску від тертя на ділянці якщо Re>=4000
export const pressureLossRe4000 = (
  roughness,
  diameter,
  viscosity,
  consumption,
  density,
  estimatedLengthVal
) =>
  (69 *
    (roughness / diameter + (1922 * (viscosity * diameter)) / consumption) **
      0.25 *
    (consumption ** 2 * density * estimatedLengthVal)) /
  diameter ** 5;

// Зміна надлишковго тиску ділянок
export const pressureChange = (length, density, moveFactor) =>
  9.81 * length * (1.293 - density) * moveFactor;

// Загальна зміна тиску на ділянці
export const totalPressureChange = (pressureLoss, pressureChangeVal) =>
  pressureLoss + pressureChangeVal;

// Зальний кінцевий тиск на ділянці
export const endingPressure = (startingPressure, totalPressureChangeVal) =>
  startingPressure - totalPressureChangeVal;
