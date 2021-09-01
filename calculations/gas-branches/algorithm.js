import * as formulas from "./formulas";
import {
  PipeType,
  PressureType,
  CalcType,
  ROUGHNESS,
  DIAMETERS,
} from "./const";
import { adaptBranchesDataToServer } from "./utils";

export const calculateBranches = (clientData) => {
  // Адаптуємо дані для розрахунку
  const { branchesData, branchesSegments } =
    adaptBranchesDataToServer(clientData);

  // Отримуємо вихідні дані
  const {
    normalDensity,
    kinematicViscosity,
    segmentsAmount,
    highloadCoef,
    pressureDrop,
    pressureStart,
    pressureStartMedium,
    pressureEndMedium,
    pressureType,
    calcType,
    pipeType,
  } = branchesData;

  // Заносимо діаметри в залежності від типу трубопроводів
  const diameters =
    PipeType.STEEL === pipeType ? DIAMETERS.STEEL : DIAMETERS.POLY;

  // Заносимо шорсткість труб в залежності від типу трубопроводів
  const pipeRoughness =
    PipeType.STEEL === pipeType ? ROUGHNESS.STEEL : ROUGHNESS.POLY;

  // Об'єкт для результатів
  const results = { segments: [] };

  // Функція розрахунку середнього гідравлічного нахилу для основного напряму або ділянки
  const calculateAvarageHydraulicInc = (segments, startMediumPressure = 0) => {
    const routesLength = segments.reduce(
      (acc, segment) => acc + segment.length,
      0
    );

    // Oбчислюємо середній гідравлічний нахил
    const averageHydraulicInclination =
      pressureType === PressureType.LOW
        ? +formulas.getAverageHydraulicInclination(
            highloadCoef,
            pressureDrop,
            routesLength
          )
        : +formulas.getAverageHydraulicInclinationMedium(
            highloadCoef,
            startMediumPressure,
            pressureEndMedium,
            routesLength
          );

    return averageHydraulicInclination;
  };

  // Функція підбору діаметра для мережі низького тиску
  const selectLowPressureDiameter = (
    consumption,
    segmentAverageHydraulicInc
  ) => {
    const diametersValues = Object.values(diameters);

    let hydraulicTilt;

    // Перебираємо діаметри
    let diameterIndex = 0;
    let isDiameterSearching = true;
    do {
      // Розраховуємо гідравлічний нахил
      hydraulicTilt = +formulas.getHydraulicTilt(
        pipeRoughness,
        diametersValues[diameterIndex],
        consumption,
        kinematicViscosity,
        normalDensity
      );

      if (hydraulicTilt <= segmentAverageHydraulicInc) {
        isDiameterSearching = false;
      } else {
        diameterIndex += 1;

        if (diameterIndex > diametersValues.length - 1) {
          throw new Error(
            `Помилка в розрахунку, жодний діаметр не підійшов! Перевірте правильність введених даних!`
          );
        }
      }
    } while (isDiameterSearching);

    const diameter = diametersValues[diameterIndex];
    const diameterName = Object.entries(diameters)
      .find(([, value]) => value === diameter)
      .shift();

    return { hydraulicTilt, diameter, diameterName };
  };

  // Функція розрахунку окремої ділянки для розгалуженої мережі низького тиску
  const calculateLowPressureSegment = () => {
    // Об'єкт для результатів однієї ділянки
    const segmentResults = { ...branchesSegments[0] };

    // Для напрямку руху газу обчислюємо середній гідравлічний нахил
    const avarageHydraulicInc = calculateAvarageHydraulicInc(branchesSegments);
    segmentResults.avarageHydraulicInc = +avarageHydraulicInc.toFixed(2);

    // Знаходимо потрібний діаметр та гідравлічний нахил
    const { hydraulicTilt, diameter, diameterName } = selectLowPressureDiameter(
      branchesSegments[0].consumption,
      avarageHydraulicInc
    );
    segmentResults.hydraulicTilt = +hydraulicTilt.toFixed(2);
    segmentResults.diameter = diameter;
    segmentResults.diameterName = diameterName;

    // Oбчислюємо перепад тиску
    const deltaPressureDrop = +formulas.getDeltaPressureDrop(
      hydraulicTilt,
      branchesSegments[0].length
    );
    segmentResults.deltaPressureDrop = +deltaPressureDrop.toFixed(0);

    // Oбчислюємо тиск на кінці ділянки
    const endPressure = +formulas.getEndPressureLow(
      branchesSegments[0].pressureStart,
      deltaPressureDrop
    );
    segmentResults.endPressure = +endPressure.toFixed(0);

    // Заносимо результати
    results.segments.push(segmentResults);
  };

  // Функція розрахунку напряму для розгалуженої мережі низького тиску
  const calculateLowPressureRoute = () => {
    // Початковий тиск газової мережі
    let routeStartPressure = pressureStart;

    // Для кожної ділянки напряму руху газу в розгалуженій мережі
    for (let segment = 0; segmentsAmount > segment; segment += 1) {
      // Об'єкт для результатів однієї ділянки
      const segmentResults = { ...branchesSegments[segment] };

      // Для напрямку руху газу обчислюємо середній гідравлічний нахил
      const avarageHydraulicInc =
        calculateAvarageHydraulicInc(branchesSegments);
      segmentResults.avarageHydraulicInc = +avarageHydraulicInc.toFixed(2);

      // Знаходимо потрібний діаметр та гідравлічний нахил
      const { hydraulicTilt, diameter, diameterName } =
        selectLowPressureDiameter(
          branchesSegments[segment].consumption,
          avarageHydraulicInc
        );
      segmentResults.hydraulicTilt = +hydraulicTilt.toFixed(2);
      segmentResults.diameter = diameter;
      segmentResults.diameterName = diameterName;

      // Oбчислюємо перепад тиску
      const deltaPressureDrop = +formulas.getDeltaPressureDrop(
        hydraulicTilt,
        branchesSegments[segment].length
      );
      segmentResults.deltaPressureDrop = +deltaPressureDrop.toFixed(0);

      // Oбчислюємо тиск на кінці ділянки
      const endPressure = +formulas.getEndPressureLow(
        routeStartPressure,
        deltaPressureDrop
      );
      segmentResults.endPressure = +endPressure.toFixed(0);

      // Регулюємо початковий тиск для наступної ділянки
      segmentResults.pressureStart = +routeStartPressure.toFixed(0);
      routeStartPressure -= deltaPressureDrop;

      // Заносимо результати
      results.segments.push(segmentResults);
    }
  };

  // Функція підбіру діаметра для мережі середнього тиску
  const selectMediumPressureDiameter = (
    consumption,
    segmentAverageHydraulicInc
  ) => {
    const diametersValues = Object.values(diameters);

    let energyParameter;

    // Перебираємо діаметри
    let diameterIndex = 0;
    let isDiameterSearching = true;
    do {
      // Обчислюємо фактичне значення енергетичного параметру на характерній ділянці
      energyParameter = +formulas.getActualEnergyParameter(
        pipeRoughness,
        diametersValues[diameterIndex],
        consumption,
        kinematicViscosity,
        normalDensity
      );

      if (energyParameter <= segmentAverageHydraulicInc) {
        isDiameterSearching = false;
      } else {
        diameterIndex += 1;

        if (diameterIndex > diametersValues.length - 1) {
          throw new Error(
            `Помилка в розрахунку, жодний діаметр не підійшов! Перевірте правильність введених даних!`
          );
        }
      }
    } while (isDiameterSearching);

    const diameter = diametersValues[diameterIndex];
    const diameterName = Object.entries(diameters)
      .find(([, value]) => value === diameter)
      .shift();

    return { energyParameter, diameter, diameterName };
  };

  // Функція розрахунку окремої ділянки для розгалуженої мережі середнього тиску
  const calculateMediumPressureSegment = () => {
    // Об'єкт для результатів однієї ділянки
    const segmentResults = { ...branchesSegments[0] };

    // Для напрямку руху газу обчислюємо середній гідравлічний нахил
    const avarageHydraulicInc = calculateAvarageHydraulicInc(
      branchesSegments,
      branchesSegments[0].pressureStart
    );
    segmentResults.avarageHydraulicInc = avarageHydraulicInc;

    // Знаходимо потрібний діаметр та гідравлічний нахил
    const { energyParameter, diameter, diameterName } =
      selectMediumPressureDiameter(
        branchesSegments[0].consumption,
        avarageHydraulicInc
      );
    segmentResults.energyParameter = +(energyParameter * 10 ** 5).toFixed(3);
    segmentResults.diameter = diameter;
    segmentResults.diameterName = diameterName;

    // Oбчислюємо тиск на кінці ділянки
    const endPressure = +formulas.getEndPressureMedium(
      branchesSegments[0].pressureStart,
      energyParameter,
      branchesSegments[0].length
    );
    segmentResults.endPressure = +endPressure.toFixed(3);

    // Заносимо результати
    results.segments.push(segmentResults);
  };

  // Функція розрахунку напряму для розгалуженої мережі середнього тиску
  const calculateMediumPressureRoute = () => {
    // Початковий тиск газової мережі
    let routeStartPressure = pressureStartMedium;

    // Для кожної ділянки напряму руху газу в розгалуженій мережі
    for (let segment = 0; segmentsAmount > segment; segment += 1) {
      // Об'єкт для результатів однієї ділянки
      const segmentResults = { ...branchesSegments[segment] };

      // Для напрямку руху газу обчислюємо середній гідравлічний нахил
      const avarageHydraulicInc = calculateAvarageHydraulicInc(
        branchesSegments,
        pressureStartMedium
      );
      segmentResults.avarageHydraulicInc = avarageHydraulicInc;

      // Знаходимо потрібний діаметр та гідравлічний нахил
      const { energyParameter, diameter, diameterName } =
        selectMediumPressureDiameter(
          branchesSegments[segment].consumption,
          avarageHydraulicInc
        );
      segmentResults.energyParameter = +(energyParameter * 10 ** 5).toFixed(3);
      segmentResults.diameter = diameter;
      segmentResults.diameterName = diameterName;

      // Oбчислюємо тиск на кінці ділянки
      const endPressure = +formulas.getEndPressureMedium(
        routeStartPressure,
        energyParameter,
        branchesSegments[segment].length
      );
      segmentResults.endPressure = +endPressure.toFixed(3);

      // Регулюємо початковий тиск для наступної ділянки
      segmentResults.pressureStart = +routeStartPressure.toFixed(3);
      routeStartPressure = endPressure;

      // Заносимо результати
      results.segments.push(segmentResults);
    }
  };

  // Початок розрахунку
  // Розраховуємо розгалуження в залежності від тиску мережі та типу розрахунку
  switch (pressureType) {
    case PressureType.LOW:
      switch (calcType) {
        case CalcType.SEGMENT:
          calculateLowPressureSegment();
          break;

        case CalcType.ROUTE:
          calculateLowPressureRoute();
          break;

        default:
          throw new Error(
            `Помилка в розрахунку, переданий тип розрахунку не підтримується!`
          );
      }
      break;

    case PressureType.MEDIUM:
      switch (calcType) {
        case CalcType.SEGMENT:
          calculateMediumPressureSegment();
          break;

        case CalcType.ROUTE:
          calculateMediumPressureRoute();
          break;

        default:
          throw new Error(
            `Помилка в розрахунку, переданий тип розрахунку не підтримується!`
          );
      }
      break;

    default:
      throw new Error(`Переданий тип тиску газової мережі не підтримується!`);
  }

  return { ...results, pressureType };
};
