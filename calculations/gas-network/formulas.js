import {
  AnnualNormsOfHeatConsumptionFor,
  GAS_CONSUMPTION_FOR_HEATING_COEF,
  NORM_OF_TOTAL_LIVING_SPACE_PER_PERSON,
  GAS_FURNACES_EFFICIENCY,
  BOILER_EFFICIENCY,
  NORMATIVE_TERM_FOR_VENTILATION,
  GAS_CONSUMPTION_FOR_HEATING_PUBLIC_BUILDINGS_COEF,
} from "./const";

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
