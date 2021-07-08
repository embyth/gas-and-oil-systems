import * as formulas from "./formulas";
import { PipeType, PressureType, ROUGHNESS, DIAMETERS } from "./const";
import { adaptCirclesDataToServer, fixResultsValues } from "./utils";

export const calculateCircles = (clientData) => {
  // Адаптуємо дані для розрахунку
  const { physicsProps, networkConfig, circlesConfig, circlesSegments } =
    adaptCirclesDataToServer(clientData);

  // Отримуємо вихідні дані
  const { normalDensity, kinematicViscosity } = physicsProps;

  const {
    pipeType,
    pressureType,
    pressureStart,
    pressureDrop,
    pressureEnd,
    kirghofScale,
    highloadCoef,
    circlesAmount,
    basisRoutesAmount,
  } = networkConfig;

  const { segmentsInCircle, basisRoutesLengths } = circlesConfig;

  // Заносимо діаметри в залежності від типу трубопроводів
  const diameters =
    PipeType.STEEL === pipeType ? DIAMETERS.STEEL : DIAMETERS.POLY;

  // Заносимо шорсткість труб в залежності від типу трубопроводів
  const pipeRoughness =
    PipeType.STEEL === pipeType ? ROUGHNESS.STEEL : ROUGHNESS.POLY;

  // Об'єкт для результатів
  const results = { circles: [] };

  // Функція розрахунку середнього гідравлічного нахилу для кожного основного напряму
  const calculateAvarageHydraulicInc = () => {
    // Для кожного основного напрямку руху газу
    const averageHydraulicInclinations = [];
    for (let basisRoute = 0; basisRoutesAmount > basisRoute; basisRoute += 1) {
      // Oбчислюємо середній гідравлічний нахил
      const averageHydraulicInclination =
        pressureType === PressureType.LOW
          ? +formulas.getAverageHydraulicInclination(
              highloadCoef,
              pressureDrop,
              basisRoutesLengths[basisRoute]
            )
          : +formulas.getAverageHydraulicInclinationMedium(
              highloadCoef,
              pressureStart,
              pressureEnd,
              basisRoutesLengths[basisRoute]
            );
      averageHydraulicInclinations.push(averageHydraulicInclination);

      results.averageHydraulicInclinations = averageHydraulicInclinations;
    }
  };

  // Функція підбіру діаметра для мережі низького тиску
  const selectLowPressureDiameter = (
    consumption,
    segmentAverageHydraulicInc
  ) => {
    const diametersValues = Object.values(diameters);

    // Перебираємо діаметри
    let diameterIndex = 0;
    let isDiameterSearching = true;
    do {
      // Знаходимо число Рейнольдса
      const reynolds = +formulas.getReynoldsNumber(
        consumption,
        diametersValues[diameterIndex],
        kinematicViscosity
      );

      // Залежно від режиму руху газу, який характеризується величиною числа Рейнольда, вибираємо відповідну формулу для розрахунку гідравлічного нахилу
      const hydraulicTilt = +formulas.getHydraulicTilt(
        reynolds,
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

    return diametersValues[diameterIndex];
  };

  // Функція розрахунку головного циклу для мережі низького тиску
  const calculateLowPressureMainCycle = (circlesData) => {
    const { averageHydraulicInclinations } = results;

    const circles = [];

    // Для кожного кільця газової мережі
    for (let circle = 0; circlesAmount > circle; circle += 1) {
      // Об'єкт для результатів одного кільця
      const circleResults = { segments: [] };

      // Початкові дані для ув'язки кільця
      let sumPressureDrop = 0;
      let absoluteSumPressureDrop = 0;

      // Для кожної ділянки кільця
      for (let segment = 0; segmentsInCircle[circle] > segment; segment += 1) {
        // Вихідні дані ділянки
        const segmentParams = circlesData[circle].segments[segment];

        // Об'єкт для результатів однієї ділянки
        const segmentResults = {};

        // Знаходимо потрібний діаметр
        segmentResults.diameter = segmentParams.diameter
          ? segmentParams.diameter
          : selectLowPressureDiameter(
              segmentParams.calcConsumption,
              averageHydraulicInclinations[segmentParams.basisRouteNum - 1]
            );

        // Знаходимо число Рейнольдса
        const reynolds = +formulas.getReynoldsNumber(
          segmentParams.calcConsumption,
          segmentResults.diameter,
          kinematicViscosity
        );
        segmentResults.reynolds = reynolds;

        // Знаходимо гідравлічний нахил
        const hydraulicTilt = +formulas.getHydraulicTilt(
          reynolds,
          pipeRoughness,
          segmentResults.diameter,
          segmentParams.calcConsumption,
          kinematicViscosity,
          normalDensity
        );
        const deltaHydraulicTilt =
          segmentParams.calcConsumption > 0 ? hydraulicTilt : -hydraulicTilt;
        segmentResults.hydraulicTilt = deltaHydraulicTilt;

        // Oбчислюємо перепад тиску
        const deltaPressureDrop = +formulas.getDeltaPressureDrop(
          deltaHydraulicTilt,
          segmentParams.length
        );
        segmentResults.deltaPressureDrop = deltaPressureDrop;

        // Знаходимо суму втрат тиску з врахуванням знаків
        sumPressureDrop += deltaPressureDrop;

        // Знаходимо суму втрат тиску за абсолютною величиною
        absoluteSumPressureDrop += Math.abs(deltaPressureDrop);

        // Заносимо необхідні результати
        segmentResults.averageHydraulicInclination =
          averageHydraulicInclinations[segmentParams.basisRouteNum - 1];
        [segmentResults.diameterName] = Object.entries(diameters).find(
          ([, value]) => value === segmentResults.diameter
        );
        segmentResults.name = segmentParams.segment;

        circleResults.segments.push({
          ...circlesData[circle].segments[segment],
          ...segmentResults,
        });
      }

      circleResults.sumPressureDrop = sumPressureDrop;
      circleResults.absoluteSumPressureDrop = +absoluteSumPressureDrop;

      // Ступінь виконання похибки Кірхгофа
      const deltaKirghof = +formulas.getDeltaKirghof(
        sumPressureDrop,
        absoluteSumPressureDrop
      );
      circleResults.deltaKirghof = deltaKirghof;
      circles.push(circleResults);
    }

    return circles;
  };

  // Функція розрахунку гідравлічної ув'язки кілець для мережі низького тиску
  const calculateLowPressureHydraulicLinkage = (circlesData) => {
    const circlesResults = [...circlesData];
    // Для кожного кільця газової мережі
    for (let circle = 0; circlesAmount > circle; circle += 1) {
      // Об'єкт для результатів одного кільця
      const circleResults = { segments: [] };

      // Початкові дані для ув'язки кільця
      let sumPressureDropToConsumption = 0;

      // Для кожної ділянки кільця
      for (let segment = 0; segmentsInCircle[circle] > segment; segment += 1) {
        // Вихідні дані ділянки
        const segmentParams = circlesData[circle].segments[segment];

        // Визначаємо відношення втрат тиску до витрати газу
        const pressureDropToConsumption =
          +formulas.getPressureDropToConsumption(
            circlesData[circle].segments[segment].deltaPressureDrop,
            segmentParams.calcConsumption
          );
        circleResults.segments[segment] = {
          ...circlesResults[circle].segments[segment],
          ...circleResults.segments[segment],
          pressureDropToConsumption,
        };

        // Сума відношення втрат тиску до витрати газу
        sumPressureDropToConsumption += pressureDropToConsumption;
        circleResults.sumPressureDropToConsumption =
          sumPressureDropToConsumption;
      }

      // Визначаємо поправочну витрату газу, що враховує нев‘язку у своєму контурі
      const correctiveGasConsumption = +formulas.getCorrectiveGasConsumption(
        circlesData[circle].sumPressureDrop,
        sumPressureDropToConsumption
      );
      circleResults.correctiveGasConsumption = correctiveGasConsumption;

      circlesResults[circle] = { ...circlesResults[circle], ...circleResults };
    }

    // Для кожного кільця газової мережі
    for (let circle = 0; circlesAmount > circle; circle += 1) {
      // Об'єкт для результатів одного кільця
      const circleResults = {};

      // Початкові дані для ув'язки кільця
      let sumCorrectiveGasConsumptions = 0;

      for (let segment = 0; segmentsInCircle[circle] > segment; segment += 1) {
        // Вихідні дані ділянки
        const segmentParams = circlesData[circle].segments[segment];

        for (
          let innerCircle = 0;
          circlesAmount > innerCircle;
          innerCircle += 1
        ) {
          if (innerCircle + 1 - segmentParams.neighborCircleNum === 0) {
            sumCorrectiveGasConsumptions +=
              circlesResults[circle].segments[segment]
                .pressureDropToConsumption *
              circlesResults[innerCircle].correctiveGasConsumption;
          }
        }
      }

      // Визначаємо поправочну витрату газу, що враховує нев‘язку у сусідніх контурах
      const correctiveGasConsumptionWithNeibghor =
        +formulas.getCorrectiveGasConsumptionWithNeibghor(
          sumCorrectiveGasConsumptions,
          circlesResults[circle].sumPressureDropToConsumption
        );
      circleResults.correctiveGasConsumptionWithNeibghor =
        correctiveGasConsumptionWithNeibghor;

      // Обчислюємо загальні поправочні витрати газу
      const totalCorrectionGasConsumption =
        +formulas.getTotalCorrectionGasConsumption(
          circlesResults[circle].correctiveGasConsumption,
          correctiveGasConsumptionWithNeibghor
        );
      circleResults.totalCorrectionGasConsumption =
        totalCorrectionGasConsumption;

      circlesResults[circle] = { ...circlesResults[circle], ...circleResults };
    }

    // Для кожного кільця газової мережі
    for (let circle = 0; circlesAmount > circle; circle += 1) {
      // Об'єкт для результатів одного кільця
      const circleResults = { segments: [] };

      for (let segment = 0; segmentsInCircle[circle] > segment; segment += 1) {
        // Уточнюємо витрати газу
        const specifiedConsumption = +formulas.getSpecifiedConsumption(
          circlesData[circle].segments[segment].calcConsumption,
          circlesResults[circle].totalCorrectionGasConsumption,
          "addition"
        );
        circleResults.segments[segment] = {
          ...circlesResults[circle].segments[segment],
          ...circleResults.segments[segment],
          calcConsumption: specifiedConsumption,
        };
      }

      circlesResults[circle] = { ...circlesResults[circle], ...circleResults };
    }

    // Для кожного кільця газової мережі
    for (let circle = 0; circlesAmount > circle; circle += 1) {
      // Об'єкт для результатів одного кільця
      const circleResults = { segments: [] };

      for (let segment = 0; segmentsInCircle[circle] > segment; segment += 1) {
        // Вихідні дані ділянки
        const segmentParams = circlesData[circle].segments[segment];

        // Уточнюємо витрати газу з врахуванням сусіднього кільця
        for (
          let innerCircle = 0;
          circlesAmount > innerCircle;
          innerCircle += 1
        ) {
          if (innerCircle + 1 - segmentParams.neighborCircleNum === 0) {
            const specifiedConsumption = +formulas.getSpecifiedConsumption(
              circlesResults[circle].segments[segment].calcConsumption,
              circlesResults[innerCircle].totalCorrectionGasConsumption,
              "subtraction"
            );

            circleResults.segments[segment] = {
              ...circlesResults[circle].segments[segment],
              ...circleResults.segments[segment],
              calcConsumption: specifiedConsumption,
            };
          }
        }

        circleResults.segments[segment] = {
          ...circlesResults[circle].segments[segment],
          ...circleResults.segments[segment],
        };
      }

      circlesResults[circle] = { ...circlesResults[circle], ...circleResults };
    }

    return circlesResults;
  };

  // Функція повторного розрахунку до тих пір поки похибка Кіргхофа не стане меншою від заданої для мережі низького тиску
  const calculateLowPressureRecursion = (circlesData) => {
    const specifiedCircles = calculateLowPressureHydraulicLinkage(circlesData);

    const updatedCircles = calculateLowPressureMainCycle(specifiedCircles);

    if (
      updatedCircles.some(
        (circle) => Math.abs(circle.deltaKirghof) > kirghofScale
      )
    ) {
      return calculateLowPressureRecursion(updatedCircles);
    }

    return updatedCircles;
  };

  // Функція розрахунку кілець для мережі низького тиску
  const calculateLowPressureCircles = (circlesData) => {
    const circles = calculateLowPressureMainCycle(circlesData);

    // Якщо хоча би для одного контуру похибка перевищує задану точність розрахунку, то необхідно виконати гідравлічну ув‘язку
    if (
      circles.some((circle) => Math.abs(circle.deltaKirghof) > kirghofScale)
    ) {
      return calculateLowPressureRecursion(circles);
    }

    return circles;
  };

  // Функція підбіру діаметра для мережі середнього тиску
  const selectMediumPressureDiameter = (
    consumption,
    segmentAverageHydraulicInc
  ) => {
    const diametersValues = Object.values(diameters);

    // Перебираємо діаметри
    let diameterIndex = 0;
    let isDiameterSearching = true;
    do {
      // Обчислюємо фактичне значення енергетичного параметру на характерній ділянці
      const energyParameter = +formulas.getActualEnergyParameter(
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

    return diametersValues[diameterIndex];
  };

  // Функція розрахунку головного циклу для мережі середнього тиску
  const calculateMediumPressureMainCycle = (circlesData) => {
    const { averageHydraulicInclinations } = results;

    const circles = [];

    // Для кожного кільця газової мережі
    for (let circle = 0; circlesAmount > circle; circle += 1) {
      // Об'єкт для результатів одного кільця
      const circleResults = { segments: [] };

      // Початкові дані для ув'язки кільця
      let sumPressureDrop = 0;
      let absoluteSumPressureDrop = 0;

      // Для кожної ділянки кільця
      for (let segment = 0; segmentsInCircle[circle] > segment; segment += 1) {
        // Вихідні дані ділянки
        const segmentParams = circlesData[circle].segments[segment];

        // Об'єкт для результатів однієї ділянки
        const segmentResults = {};

        // Знаходимо потрібний діаметр
        segmentResults.diameter = segmentParams.diameter
          ? segmentParams.diameter
          : selectMediumPressureDiameter(
              segmentParams.calcConsumption,
              averageHydraulicInclinations[segmentParams.basisRouteNum - 1]
            );

        // Знаходимо енергетичного параметру
        const hydraulicTilt = +formulas.getActualEnergyParameter(
          pipeRoughness,
          segmentResults.diameter,
          segmentParams.calcConsumption,
          kinematicViscosity,
          normalDensity
        );

        segmentResults.hydraulicTilt = hydraulicTilt;

        // Oбчислюємо перепад тиску
        const deltaPressureDrop = +formulas.getDeltaPressureDrop(
          hydraulicTilt,
          segmentParams.length
        );

        const dDeltaPressureDrop =
          segmentParams.calcConsumption > 0
            ? deltaPressureDrop
            : -deltaPressureDrop;

        segmentResults.deltaPressureDrop = dDeltaPressureDrop;

        // Oбчислюємо тиск на кінці ділянки
        const pressureOut = +formulas.getOutSegmentPressure(
          pressureStart,
          hydraulicTilt,
          segmentParams.length
        );
        segmentResults.pressureOut = pressureOut;

        // Знаходимо суму втрат тиску з врахуванням знаків
        sumPressureDrop += dDeltaPressureDrop;

        // Знаходимо суму втрат тиску за абсолютною величиною
        absoluteSumPressureDrop += Math.abs(dDeltaPressureDrop);

        // Заносимо необхідні результати
        segmentResults.averageHydraulicInclination =
          averageHydraulicInclinations[segmentParams.basisRouteNum - 1];
        [segmentResults.diameterName] = Object.entries(diameters).find(
          ([, value]) => value === segmentResults.diameter
        );
        segmentResults.name = segmentParams.segment;

        circleResults.segments.push({
          ...circlesData[circle].segments[segment],
          ...segmentResults,
        });
      }

      circleResults.sumPressureDrop = sumPressureDrop;
      circleResults.absoluteSumPressureDrop = absoluteSumPressureDrop;

      // Ступінь виконання похибки Кірхгофа
      const deltaKirghof = +formulas.getDeltaKirghof(
        sumPressureDrop,
        absoluteSumPressureDrop
      );

      circleResults.deltaKirghof = deltaKirghof;
      circles.push(circleResults);
    }

    return circles;
  };

  // Функція розрахунку гідравлічної ув'язки кілець для мережі середнього тиску
  const calculateMediumPressureHydraulicLinkage = (circlesData) => {
    const circlesResults = [...circlesData];
    // Для кожного кільця газової мережі
    for (let circle = 0; circlesAmount > circle; circle += 1) {
      // Об'єкт для результатів одного кільця
      const circleResults = { segments: [] };

      // Початкові дані для ув'язки кільця
      let sumPressureDropToConsumption = 0;

      // Для кожної ділянки кільця
      for (let segment = 0; segmentsInCircle[circle] > segment; segment += 1) {
        // Вихідні дані ділянки
        const segmentParams = circlesData[circle].segments[segment];

        // Визначаємо відношення втрат тиску до витрати газу
        const pressureDropToConsumption =
          +formulas.getPressureDropToConsumption(
            circlesData[circle].segments[segment].deltaPressureDrop,
            segmentParams.calcConsumption
          );

        circleResults.segments[segment] = {
          ...circlesResults[circle].segments[segment],
          ...circleResults.segments[segment],
          pressureDropToConsumption,
        };

        // Сума відношення втрат тиску до витрати газу
        sumPressureDropToConsumption += pressureDropToConsumption;

        circleResults.sumPressureDropToConsumption =
          sumPressureDropToConsumption;
      }

      // Визначаємо поправочну витрату газу, що враховує нев‘язку у своєму контурі
      const correctiveGasConsumption =
        +formulas.getCorrectiveGasConsumptionMedium(
          circlesData[circle].sumPressureDrop,
          sumPressureDropToConsumption
        );
      circleResults.correctiveGasConsumption = correctiveGasConsumption;

      circlesResults[circle] = { ...circlesResults[circle], ...circleResults };
    }

    // Для кожного кільця газової мережі
    for (let circle = 0; circlesAmount > circle; circle += 1) {
      // Об'єкт для результатів одного кільця
      const circleResults = {};

      // Початкові дані для ув'язки кільця
      let sumCorrectiveGasConsumptions = 0;

      for (let segment = 0; segmentsInCircle[circle] > segment; segment += 1) {
        // Вихідні дані ділянки
        const segmentParams = circlesData[circle].segments[segment];

        for (
          let innerCircle = 0;
          circlesAmount > innerCircle;
          innerCircle += 1
        ) {
          if (innerCircle + 1 - segmentParams.neighborCircleNum === 0) {
            sumCorrectiveGasConsumptions +=
              circlesResults[circle].segments[segment]
                .pressureDropToConsumption *
              circlesResults[innerCircle].correctiveGasConsumption;
          }
        }
      }

      // Визначаємо поправочну витрату газу, що враховує нев‘язку у сусідніх контурах
      const correctiveGasConsumptionWithNeibghor =
        +formulas.getCorrectiveGasConsumptionWithNeibghor(
          sumCorrectiveGasConsumptions,
          circlesResults[circle].sumPressureDropToConsumption
        );
      circleResults.correctiveGasConsumptionWithNeibghor =
        correctiveGasConsumptionWithNeibghor;

      // Обчислюємо загальні поправочні витрати газу
      const totalCorrectionGasConsumption =
        +formulas.getTotalCorrectionGasConsumption(
          circlesResults[circle].correctiveGasConsumption,
          correctiveGasConsumptionWithNeibghor
        );
      circleResults.totalCorrectionGasConsumption =
        totalCorrectionGasConsumption;

      circlesResults[circle] = { ...circlesResults[circle], ...circleResults };
    }

    // Для кожного кільця газової мережі
    for (let circle = 0; circlesAmount > circle; circle += 1) {
      // Об'єкт для результатів одного кільця
      const circleResults = { segments: [] };

      for (let segment = 0; segmentsInCircle[circle] > segment; segment += 1) {
        // Уточнюємо витрати газу
        const specifiedConsumption = +formulas.getSpecifiedConsumption(
          circlesData[circle].segments[segment].calcConsumption,
          circlesResults[circle].totalCorrectionGasConsumption,
          "addition"
        );
        circleResults.segments[segment] = {
          ...circlesResults[circle].segments[segment],
          ...circleResults.segments[segment],
          calcConsumption: specifiedConsumption,
        };
      }

      circlesResults[circle] = { ...circlesResults[circle], ...circleResults };
    }

    // Для кожного кільця газової мережі
    for (let circle = 0; circlesAmount > circle; circle += 1) {
      // Об'єкт для результатів одного кільця
      const circleResults = { segments: [] };

      for (let segment = 0; segmentsInCircle[circle] > segment; segment += 1) {
        // Вихідні дані ділянки
        const segmentParams = circlesData[circle].segments[segment];

        // Уточнюємо витрати газу з врахуванням сусіднього кільця
        for (
          let innerCircle = 0;
          circlesAmount > innerCircle;
          innerCircle += 1
        ) {
          if (innerCircle + 1 - segmentParams.neighborCircleNum === 0) {
            const specifiedConsumption = +formulas.getSpecifiedConsumption(
              circlesResults[circle].segments[segment].calcConsumption,
              circlesResults[innerCircle].totalCorrectionGasConsumption,
              "subtraction"
            );

            circleResults.segments[segment] = {
              ...circlesResults[circle].segments[segment],
              ...circleResults.segments[segment],
              calcConsumption: specifiedConsumption,
            };
          }
        }

        circleResults.segments[segment] = {
          ...circlesResults[circle].segments[segment],
          ...circleResults.segments[segment],
        };
      }

      circlesResults[circle] = { ...circlesResults[circle], ...circleResults };
    }

    return circlesResults;
  };

  // Функція повторного розрахунку до тих пір поки похибка Кіргхофа не стане меншою від заданої для мережі середнього тиску
  const calculateMediumPressureRecursion = (circlesData) => {
    const specifiedCircles =
      calculateMediumPressureHydraulicLinkage(circlesData);

    const updatedCircles = calculateMediumPressureMainCycle(specifiedCircles);

    if (
      updatedCircles.some(
        (circle) => Math.abs(circle.deltaKirghof) > kirghofScale
      )
    ) {
      return calculateMediumPressureRecursion(updatedCircles);
    }

    return updatedCircles;
  };

  // Функція розрахунку кілець для мережі середнього тиску
  const calculateMediumPressureCircles = (circlesData) => {
    const circles = calculateMediumPressureMainCycle(circlesData);

    // Якщо хоча би для одного контуру похибка перевищує задану точність розрахунку, то необхідно виконати гідравлічну ув‘язку
    if (
      circles.some((circle) => Math.abs(circle.deltaKirghof) > kirghofScale)
    ) {
      return calculateMediumPressureRecursion(circles);
    }

    return circles;
  };

  // Початок розрахунку
  // Для кожного основного напрямку руху газу обчислюємо середній гідравлічний нахил
  calculateAvarageHydraulicInc();

  // Розраховуємо кільця в залежності від тиску мережі
  results.circles =
    pressureType === PressureType.LOW
      ? calculateLowPressureCircles(circlesSegments)
      : calculateMediumPressureCircles(circlesSegments);

  const fixedResults = {
    ...results,
    circles: fixResultsValues(results.circles, pressureType),
    pressureType,
  };

  return fixedResults;
};
