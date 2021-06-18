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

// Розрахунок наявної потужності газотурбінного приводу ГПА компресорної станції
// Температура повітря на вході в ГТУ
export const getAirTemperature = (airTemperature) => airTemperature + 273 + 5;
// Наявна потужність газоперекачувального агрегату
export const getAvailablePower = (Nen, Kn, Kob, Ky, Kt, Tz, Tzn, Pa) =>
  (Nen * Kn * Kob * Ky * (1 - (Kt * (Tz - Tzn)) / Tz) * Pa) / 0.1013;

// Математичні моделі нагнітача
// Коефіцієнт математичної можелі с
export const getMathCoefC = (x1, x2, x3, Q1, Q2) =>
  (x1 - 2 * x2 + x3) / (2 * (Q2 - Q1) ** 2);

// Коефіцієнт математичної можелі b
export const getMathCoefB = (x1, x2, Q1, Q2, coefC) =>
  (x1 - x2) / (Q1 - Q2) - coefC * (Q1 + Q2);

// Коефіцієнт математичної можелі a
export const getMathCoefA = (x1, Q1, coefB, coefC) =>
  x1 - coefB * Q1 - coefC * Q1 ** 2;

// Середня продуктивність
export const getQ2 = (Q1, Q3) => 0.5 * (Q1 + Q3);

// Математична модель
export const getMathModel = (a, b, c, Qzv) => a + b * Qzv + c * Qzv ** 2;

// Режим роботи нагнітача з використанням математичних моделей
// Коефіцієнт стисливості газу
export const getCompressibilityRatio = (P, delta, T) =>
  1 - (5.5 * 10 ** 6 * P * delta ** 1.3) / T ** 3.3;

// Густина газу за умов входу в нагнітачі
export const getInletDensity = (P, z, R, T) => (P * 10 ** 6) / (z * R * T);

// Комерційна продуктивність через один нагнітач
export const getCommercialConsumption = (Q, N) => Q / N;

// Об’ємна витрата газу за умов входу в один нагнітач
export const getVolumetricConsumption = (roSt, Q0, roVx) =>
  (((roSt * Q0) / roVx) * 10 ** 6) / 1440;

// Зведена витрата газу
export const getErectedConsumption = (Qvx, nNom, n) => (Qvx * nNom) / n;

// Зведена відносна обертова частота нагнітача
export const getReducedRelativeSpeed = (n, nNom, zZv, Rzv, Tzv, zVx, R, Tvx) =>
  (n / nNom) * Math.sqrt((zZv * Rzv * Tzv) / (zVx * R * Tvx));

// Фактичний ступінь підвищення тиску нагнітача
export const getActualPressureIncrease = (
  epsNom,
  etaPol,
  reducedRelativeSpeed
) => {
  const beta = (1.31 - 1) / (1.31 * etaPol);
  return ((epsNom ** beta - 1) * reducedRelativeSpeed ** 2 + 1) ** (1 / beta);
};

// Абсолютний тиск газу на виході
export const getOutletPressure = (eps, Pvx) => eps * Pvx;

// Температура газу на виході нагнітачів
export const getOutletTemperature = (Tvx, eps, etaPol) =>
  Tvx * eps ** ((1.31 - 1) / (1.31 * etaPol));

// Внутрішня (індикаторна) потужність нагнітача
export const getInternalPower = (reducedRelativeSpeed, roVx, n, nNom) =>
  reducedRelativeSpeed * roVx * (n / nNom) ** 3;

// Потужність, спожита нагнітачем (ефективна потужність)
export const getEffectivePower = (Ni, Kn, etaMech) => Ni / (Kn * etaMech);

// Абсолютний тиск газу на початку лінійної ділянки газопроводу
export const getActualOutletPressure = (Pvux, dPvux, dPox) =>
  Pvux - dPvux - dPox;

// Витрати газу на власні потреби компресорної станції
// Витрата паливного газу на одну газотурбінну установку
export const getFuelConsumption = (qFuelNom, Ne, NeN, Tz, Tzn, Pa, Qnr) =>
  (qFuelNom *
    ((0.75 * Ne) / NeN + (0.25 * Math.sqrt(Tz / Tzn) * Pa) / 0.1013) *
    34500) /
  Qnr;

// Сумарна витрата паливного газу по КЦ
export const getFullFuelConsumption = (N, qFuel) => 0.024 * N * qFuel;

// Витрата газу на технологічні потреби та технічні втрати КС та лінійної ділянки
export const getTechConsumption = (Htp, NeN, Nkc, Pvux, Pp) =>
  (24 * 10 ** -6 * Htp * NeN * Nkc * Pvux) / Pp;

// Витрати газу на власні потреби КС
export const getSelfConsumption = (QFuel, Qtech) => QFuel + Qtech;

// Об’ємна продуктивність лінійної ділянки газопроводу
export const getActualConsumption = (Qks, Qself) => Qks - Qself;

// Фактичний абсолютний тиск на початку лінійної ділянки
export const getStartingPressure = (Pvux, dPvux, dPox) => Pvux - dPvux - dPox;

// Теплогідравлічний розрахунок ділянки газопроводу
// Внутрішній діаметр в метрах
export const getInnerDiameter = (Dz, bSt) =>
  +((Dz - 2 * bSt) * 10 ** -3).toFixed(3);

// Тиск в кінці перегону між КС для рівнинного газопроводу
export const getEndingPressure = (Ppf, Q, la, delta, zcp, Tcp, L, E, d) =>
  Math.sqrt(
    Ppf ** 2 -
      (Q ** 2 * la * delta * zcp * Tcp * L) / ((105.087 * E) ** 2 * d ** 5)
  );

// Середнє значення тиску газу на ділянці газопроводу
export const getAveragePressure = (Pp, Pk) =>
  (2 / 3) * (Pp + Pk ** 2 / (Pp + Pk));

// Середнє значення теплоємності газу на ділянці газопроводу
export const getAverageHeatCapicity = (Tcp, Pcp) =>
  1.695 + 1.838 * 10 ** -3 * Tcp + (1.93 * 10 ** 6 * (Pcp - 0.1)) / Tcp ** 3;

// Середнє значення коефіцієнта Джоуля-Томсона
export const getDjoelCoef = (Cp, Tcp) =>
  (1 / Cp) * ((0.98 * 10 ** 6) / Tcp ** 2 - 1.5);

// Параметр Шухова
export const getShukhovFactor = (K, Dz, Cp, Q, delta) =>
  (0.225 * K * Dz) / 1000 / (Cp * Q * delta);

// Зведена температура грунту
export const getErectedTempreture = (Tgr, Dj, Pp, Pk, al, L, Pcp) =>
  Tgr - (Dj * (Pp ** 2 - Pk ** 2)) / (2 * al * L * Pcp);

// Середнє значення температури газу на ділянці газопроводу
export const getAverageTemperature = (Tp, Tzv, al, L) =>
  Tzv + ((Tp - Tzv) / (al * L)) * (1 - Math.exp(-al * L));

// Число Рейнольдса в газопроводі
export const getReynoldsFactor = (Q, delta, d) =>
  (17.75 * (Q * delta)) / (d * 12.5 * 10 ** -6);

// Коефіцієнт гідравлічного опору в газопроводі
export const getHydraulicResistCoef = (Re, d) =>
  0.067 * (158 / Re + (2 * 3 * 10 ** -5) / d) ** 0.2;

// Температура газу у кінці ділянки газопроводу
export const getEndingTemperature = (Tzv, Tp, al, L) =>
  Tzv + (Tp - Tzv) * Math.exp(-al * L);

// Абсолютний тиск газу на вході відцентрових нагнітачів
export const getActualEndingPressure = (Pvx, dPvx) => Pvx + dPvx;
