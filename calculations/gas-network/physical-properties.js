import { adaptIncomeDataToServer } from "./utils";
import * as formulas from "./formulas";

import { IncreasedIndicatorsOfMaximumHeatFlux } from "./const";

export const calculatePhysicalProperties = (clientData) => {
  const data = adaptIncomeDataToServer(clientData);

  const {
    rch4,
    rc2h6,
    rc3h8,
    rc4h10,
    rc5h12,
    rn2,
    rco2,
    n,
    t0,
    tv,
    tom,
    tvn,
    n0,
    nkor,
    nkon,
    nsvin,
    al1,
    al2,
    al3,
    be1,
    be2,
    a1,
    a2,
    b1,
    b2,
    b3,
  } = data;

  const results = {
    "physical-properties": {},
    "consumption-by-consumers": {},
  };

  // Розрахунок фізичних властивостей природного газу
  // Визначаємо молярну масу природного газу
  const mu = +formulas.getMolarMass(
    rch4,
    rc2h6,
    rc3h8,
    rc4h10,
    rc5h12,
    rn2,
    rco2
  );
  results["physical-properties"].mu = mu.toFixed(2);

  // Знаходимо густину природного газу за нормальних умов
  const roNorm = +formulas.getNormalDensity(mu);
  results["physical-properties"].RoN = roNorm.toFixed(4);

  // Визначаємо відносну густину газу за повітрям
  const delta = +formulas.getRelativeDensity(roNorm);
  results["physical-properties"].delta = delta.toFixed(4);

  // Визначаємо густину газу за стандартних фізичних умов
  const roSt = +formulas.getStandartDensity(delta);
  results["physical-properties"].RoSt = roSt.toFixed(4);

  // Визначаємо газову сталу природного газу
  const R = +formulas.getGasConst(delta);
  results["physical-properties"].Rgas = R.toFixed(1);

  // Знаходимо псевдокритичний тиск природного газу
  const Pkr = +formulas.getPseudoPressure(
    rch4,
    rc2h6,
    rc3h8,
    rc4h10,
    rc5h12,
    rn2,
    rco2
  );
  results["physical-properties"].Pkr = Pkr.toFixed(3);

  // Знаходимо псевдокритичне значення температури природного газу
  const Tkr = +formulas.getPseudoTemperature(
    rch4,
    rc2h6,
    rc3h8,
    rc4h10,
    rc5h12,
    rn2,
    rco2
  );
  results["physical-properties"].Tkr = Tkr.toFixed(1);

  // Обчислюємо нижчу теплоту згорання газу
  const Qnr = +formulas.getLowerVolumetricHeat(
    rch4,
    rc2h6,
    rc3h8,
    rc4h10,
    rc5h12
  );
  results["physical-properties"].Qnr = Qnr.toFixed(0);

  // Обчислюємо нижчу масову теплоту згорання газу
  const Qnm = +formulas.getLowerMassHeatOfCombustion(Qnr, roNorm);
  results["physical-properties"].Qnm = Qnm.toFixed(0);

  // Визначаємо коефіцієнт динамічної в'язкості газу
  const eta = +formulas.getDynamicViscosity(
    rch4,
    rc2h6,
    rc3h8,
    rc4h10,
    rc5h12,
    rn2,
    rco2
  );
  results["physical-properties"].eta = eta.toFixed(2);

  // Обчислюємо кінематичну в'язкість природного газу
  const nyu = +formulas.getKinematicViscosity(eta, roNorm);
  results["physical-properties"].nyu = nyu.toFixed(2);

  // Розрахунок витрат газу споживачами сільського населеного пункту
  // Річна витрата тепла на господарсько-побутові потреби населення у житлових будинках
  const qtgp = +formulas.getAnnualHeatConsumptionHousehold(n, al1, al2, al3);
  results["consumption-by-consumers"].qtgp = qtgp.toFixed(0);

  // Річна витрата тепла на господарсько-побутові потреби населення у житлових будинках
  const qttv = +formulas.getAnnualHeatConsumptionAnimals(nkor, nkon, nsvin);
  results["consumption-by-consumers"].qttv = qttv.toFixed(0);

  // Загальна кількість тепла на господарсько-побутові потреби для житлового сектора
  const qtgpzag = +formulas.getAnnualHeatConsumptionCombined(qtgp, qttv);
  results["consumption-by-consumers"].qtgpzag = qtgpzag.toFixed(0);

  // Річна витрата газу на господарсько-побутові потреби (тис. м3/рік)
  const qggpzag = +formulas.getAnnualHeatConsumptionGas(qtgpzag, Qnr);
  results["consumption-by-consumers"].qggpzag = qggpzag.toFixed(1);

  // Максимальна годинна витрати газу на господарсько-побутові потреби
  const qggpmax = +formulas.getMaxAnnualHeatConsumptionGas(qggpzag);
  results["consumption-by-consumers"].qggpmax = qggpmax.toFixed(1);

  // Кількість жителів, що проживає у старих будинках: разом
  const ns = +formulas.getBuildingResidents(n, a1);
  results["consumption-by-consumers"].ns = ns.toFixed();

  // Кількість жителів, що проживає у старих будинках: одно-двоповерхові
  const ns1 = +formulas.getBuildingResidents(ns, b1);
  results["consumption-by-consumers"].ns1 = ns1.toFixed();

  // Кількість жителів, що проживає у старих будинках: три-чотириповерхові
  const ns2 = +formulas.getBuildingResidents(ns, b2);
  results["consumption-by-consumers"].ns2 = ns2.toFixed();

  // Кількість жителів, що проживає у старих будинках: багатоповерхові
  const ns3 = +formulas.getBuildingResidents(ns, b3);
  results["consumption-by-consumers"].ns3 = ns3.toFixed();

  // Кількість жителів, що проживає у нових будинках: разом
  const nn = +formulas.getBuildingResidents(n, a2);
  results["consumption-by-consumers"].nn = nn.toFixed();

  // Кількість жителів, що проживає у нових будинках: одно-двоповерхові
  const nn1 = +formulas.getBuildingResidents(nn, b1);
  results["consumption-by-consumers"].nn1 = nn1.toFixed();

  // Кількість жителів, що проживає у нових будинках: три-чотириповерхові
  const nn2 = +formulas.getBuildingResidents(nn, b2);
  results["consumption-by-consumers"].nn2 = nn2.toFixed();

  // Кількість жителів, що проживає у нових будинках: багатоповерхові
  const nn3 = +formulas.getBuildingResidents(nn, b3);
  results["consumption-by-consumers"].nn3 = nn3.toFixed();

  // Укрупнений показник для одно-двоповерхових будинків на опалення, що побудовані до 1985р
  const qs1 = formulas.getInterpolationForHeating(
    b1 === 0,
    t0,
    IncreasedIndicatorsOfMaximumHeatFlux.OLD["1-2"]
  );
  results["consumption-by-consumers"].qs1 = qs1 === 0 ? "0" : qs1.toFixed(1);

  // Укрупнений показник для три-чотириповерхових будинків на опалення, що побудовані до 1985р
  const qs2 = formulas.getInterpolationForHeating(
    b2 === 0,
    t0,
    IncreasedIndicatorsOfMaximumHeatFlux.OLD["3-4"]
  );
  results["consumption-by-consumers"].qs2 = qs2 === 0 ? "0" : qs2.toFixed(1);

  // Укрупнений показник для багатоповерхових будинків на опалення, що побудовані до 1985р
  const qs3 = formulas.getInterpolationForHeating(
    b3 === 0,
    t0,
    IncreasedIndicatorsOfMaximumHeatFlux.OLD["5+"]
  );
  results["consumption-by-consumers"].qs3 = qs3 === 0 ? "0" : qs3.toFixed(1);

  // Укрупнений показник для одно-двоповерхових будинків на опалення, що побудовані після 1985р
  const qn1 = formulas.getInterpolationForHeating(
    b1 === 0,
    t0,
    IncreasedIndicatorsOfMaximumHeatFlux.NEW["1-2"]
  );
  results["consumption-by-consumers"].qn1 = qn1 === 0 ? "0" : qn1.toFixed(1);

  // Укрупнений показник для багатоповерхових будинків на опалення, що побудовані після 1985р
  const qn2 = formulas.getInterpolationForHeating(
    b2 === 0 && b3 === 0,
    t0,
    IncreasedIndicatorsOfMaximumHeatFlux.NEW["5+"]
  );
  results["consumption-by-consumers"].qn2 = qn2 === 0 ? "0" : qn2.toFixed(1);

  // Максимальний тепловий потік на опалення житлових і громадських будівель
  const qomax = formulas.getMaximumHeatFlow(
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
  );
  results["consumption-by-consumers"].qomax = qomax.toFixed();

  // Максимальна годинна витрата теплоти на опалення житлових і громадських будівель
  const qto = formulas.getMaximumHourlyHeatConsumption(qomax);
  results["consumption-by-consumers"].qto = qto.toFixed();

  // Максимальна годинна витрата газу на опалення житлових і громадських будівель
  const qgomax = formulas.getMaximumHourlyGasConsumption(qto, Qnr, be1, be2);
  results["consumption-by-consumers"].qgomax = qgomax.toFixed(1);

  // Середня годинна витрата газу на опалення житлових і громадських будівель
  const qgot = formulas.getAverageHourlyGasConsumption(qgomax, tvn, tom, t0);
  results["consumption-by-consumers"].qgot = qgot.toFixed(1);

  // Річна витрата газу на опалення житлових і громадських будівель
  const qgorich = formulas.getAnnualGasConsumptionForHeating(qgot, n0);
  results["consumption-by-consumers"].qgorich = qgorich.toFixed(1);

  // Максимальний тепловий потік на вентиляцію громадських будівель
  const qvmax = formulas.getMaximumHeatFlowForVentilation(
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
  );
  results["consumption-by-consumers"].qvmax = qvmax.toFixed();

  // Максимальна годинна витрата теплоти на вентиляцію громадських будівель
  const qtvmax = formulas.getMaximumHourlyHeatConsumptionForVentilation(qvmax);
  results["consumption-by-consumers"].qtvmax = qtvmax.toFixed(1);

  // Максимальна годинна витрата газу на вентиляцію громадських будівель
  const qgvmax = formulas.getMaximumHourlyGasConsumptionForVentilation(
    qtvmax,
    Qnr,
    be1,
    be2
  );
  results["consumption-by-consumers"].qgvmax = qgvmax.toFixed(2);

  // Середня годинна витрата газу на вентиляцію громадських будівель
  const qgvt = formulas.getAverageHourlyGasConsumptionForVentilation(
    qgvmax,
    tvn,
    tom,
    tv
  );
  results["consumption-by-consumers"].qgvt = qgvt.toFixed(2);

  // Річна витрата газу на вентиляцію громадських будівель
  const qgvrich = formulas.getAnnualGasConsumptionForVentilation(qgvt, n0);
  results["consumption-by-consumers"].qgvrich = qgvrich.toFixed(2);

  // Сума максимальних годинних витрат газу
  const qggod = formulas.getSumOfTheMaximumHourlyGasConsumption(
    qggpmax,
    qgomax,
    qgvmax
  );
  results["consumption-by-consumers"].qggod = qggod.toFixed(1);

  // Сума річних витрат газу
  const qgrich = formulas.getAmountOfAnnualGasConsumption(
    qggpzag,
    qgorich,
    qgvrich
  );
  results["consumption-by-consumers"].qgrich = qgrich.toFixed();

  // Максимальний об'єм газу який буде рухатись газопроводами низького тиску
  const qshngp = formulas.getMaximumVolumeOfGas(qggpmax, qgomax);
  results["consumption-by-consumers"].qshngp = qshngp.toFixed(1);

  // Максимальна годинна витрата газу на вентиляцію
  const qshnv = formulas.getMaxHourlyGasConsumptionForVentilation(
    qgvmax,
    qgomax
  );
  results["consumption-by-consumers"].qshnv = qshnv.toFixed(1);

  // Максимальна годинна витрата газу на ГРП
  const qshn = formulas.getMaximumHourlyGasConsumptionGRP(qshngp, qshnv);
  results["consumption-by-consumers"].qshn = qshn.toFixed(1);

  return results;
};
