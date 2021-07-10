// Oсновні фізичні властивості природного газу
// Молярна маса природного газу
export const getMolarMass = (ch4, c2h6, c3h8, c4h10, c5h12, n2, co2) =>
  0.01 *
  (16.04 * ch4 +
    30.07 * c2h6 +
    44.1 * c3h8 +
    58.12 * c4h10 +
    72.15 * c5h12 +
    28.01 * n2 +
    44.01 * co2);

// Густина природного газу за нормальних умов
export const getNormalDensity = (molarMass) => molarMass / 22.41;

// Відносна густина газу за повітрям
export const getRelativeDensity = (normalDensity) => normalDensity / 1.293;

// Густина природного газу за стандартних фізичних умов
export const getStandartDensity = (relativeDensity) => 1.205 * relativeDensity;

// Газова стала природного газу
export const getGasConst = (relativeDensity) => 287.1 / relativeDensity;

// Псевдокритичний тиск природного газу
export const getPseudoPressure = (ch4, c2h6, c3h8, c4h10, c5h12, n2, co2) =>
  0.01 *
  (4.64 * ch4 +
    4.884 * c2h6 +
    4.255 * c3h8 +
    3.799 * c4h10 +
    3.373 * c5h12 +
    3.394 * n2 +
    7.386 * co2);

// Псевдокритичний температура природного газу
export const getPseudoTemperature = (ch4, c2h6, c3h8, c4h10, c5h12, n2, co2) =>
  0.01 *
  (190.66 * ch4 +
    305.46 * c2h6 +
    369.9 * c3h8 +
    425.2 * c4h10 +
    469.5 * c5h12 +
    126.2 * n2 +
    304.26 * co2);

// Нижча об’ємна теплота згорання
export const getLowerVolumetricHeat = (ch4, c2h6, c3h8, c4h10, c5h12) =>
  0.01 *
  (35760 * ch4 + 63650 * c2h6 + 91140 * c3h8 + 118530 * c4h10 + 146180 * c5h12);

// Нижча масова теплота згорання газу
export const getLowerMassHeatOfCombustion = (
  lowerVolumetricHeat,
  normalDensity
) => lowerVolumetricHeat / normalDensity;

// Коефіцієнт динамічної в'язкості газу
export const getDynamicViscosity = (ch4, c2h6, c3h8, c4h10, c5h12, n2, co2) =>
  0.01 *
  (10.3 * ch4 +
    8.46 * c2h6 +
    7.36 * c3h8 +
    6.29 * c4h10 +
    6.99 * c5h12 +
    16.59 * n2 +
    13.8 * co2);

// Кінематична в'язкість природного газу
export const getKinematicViscosity = (dynamicViscosity, normalDensity) =>
  dynamicViscosity / normalDensity;
