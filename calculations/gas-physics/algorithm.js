import { adaptIncomeDataToServer } from "./utils";
import * as formulas from "./formulas";

export const calculate = (clientData) => {
  const data = adaptIncomeDataToServer(clientData);

  const { ch4, c2h6, c3h8, c4h10, c5h12, n2, co2 } = data;

  const results = {};

  // Розрахунок фізичних властивостей природного газу
  // Визначаємо молярну масу природного газу
  const mu = +formulas.getMolarMass(ch4, c2h6, c3h8, c4h10, c5h12, n2, co2);
  results.molarMass = +mu.toFixed(2);

  // Знаходимо густину природного газу за нормальних умов
  const roNorm = +formulas.getNormalDensity(mu);
  results.normalDensity = +roNorm.toFixed(4);

  // Визначаємо відносну густину газу за повітрям
  const delta = +formulas.getRelativeDensity(roNorm);
  results.relativeDensity = +delta.toFixed(4);

  // Визначаємо густину газу за стандартних фізичних умов
  const roSt = +formulas.getStandartDensity(delta);
  results.standartDensity = +roSt.toFixed(4);

  // Визначаємо газову сталу природного газу
  const R = +formulas.getGasConst(delta);
  results.gasConst = +R.toFixed(1);

  // Знаходимо псевдокритичний тиск природного газу
  const Pkr = +formulas.getPseudoPressure(
    ch4,
    c2h6,
    c3h8,
    c4h10,
    c5h12,
    n2,
    co2
  );
  results.pseudoPressure = +Pkr.toFixed(3);

  // Знаходимо псевдокритичне значення температури природного газу
  const Tkr = +formulas.getPseudoTemperature(
    ch4,
    c2h6,
    c3h8,
    c4h10,
    c5h12,
    n2,
    co2
  );
  results.pseudoTemperature = +Tkr.toFixed(1);

  // Обчислюємо нижчу теплоту згорання газу
  const Qnr = +formulas.getLowerVolumetricHeat(ch4, c2h6, c3h8, c4h10, c5h12);
  results.lowerVolumetricHeat = +Qnr.toFixed(0);

  // Обчислюємо нижчу масову теплоту згорання газу
  const Qnm = +formulas.getLowerMassHeatOfCombustion(Qnr, roNorm);
  results.lowerMassHeatOfCombustion = +Qnm.toFixed(0);

  // Визначаємо коефіцієнт динамічної в'язкості газу
  const eta = +formulas.getDynamicViscosity(
    ch4,
    c2h6,
    c3h8,
    c4h10,
    c5h12,
    n2,
    co2
  );
  results.dynamicViscosity = +eta.toFixed(2);

  // Обчислюємо кінематичну в'язкість природного газу
  const nyu = +formulas.getKinematicViscosity(eta, roNorm);
  results.kinematicViscosity = +nyu.toFixed(2);

  return { physicalProperties: results };
};
