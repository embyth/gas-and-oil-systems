import { DIAMETERS, ROUGHNESS, PipeType } from "./const";
import * as formulas from "./formulas";
import { adaptClientDataToServer } from "./utils";

export const calculate = (clientData) => {
  const data = adaptClientDataToServer(clientData);

  let { startingPressure } = data;

  const {
    allowablePressure,
    density,
    viscosity,
    segmentsAmount,
    overloadFactor,
    averageTemperature,
    calcAccurance,
    atmosphericPressure,
    maxVelosity,
    averageConsumption,
    pipeType,
    lengths,
    resistCoefs,
    consumptions,
    segmentsNames,
    moveDirections,
  } = data;

  // Набір стандартних діаметрів
  const diameters =
    pipeType === PipeType.STEEL ? DIAMETERS.STEEL : DIAMETERS.POLY;
  const roughness =
    pipeType === PipeType.STEEL ? ROUGHNESS.STEEL : ROUGHNESS.POLY;

  const estimatedLengthsArray = [];
  let sumEstimatedLength = 0;

  // Заносимо в масиви дані з секції вихдіні ділянки
  for (let i = 0; i < segmentsAmount; i += 1) {
    const estimatedLength = parseFloat(
      formulas.estimatedLength(lengths[i], resistCoefs[i])
    );
    estimatedLengthsArray.push(estimatedLength);
    sumEstimatedLength += estimatedLength;
  }

  // Знаходимо тиск на вході
  const inletPressure = formulas.inletPressure(
    startingPressure,
    allowablePressure
  );
  // Знаходимо середній тиск
  const averagePressure = formulas.averagePressure(
    atmosphericPressure,
    startingPressure,
    inletPressure
  );
  // Знаходимо середній гідравлічний нахил
  const averageHydraulicInc = formulas.averageHydraulicInc(
    overloadFactor,
    allowablePressure,
    sumEstimatedLength
  );
  let estimatedHydraulicInc = 0;
  let velocity = 0;

  // Уточнюємо швидкість газу в системі та знаходимо діаметр характерної ділянки
  for (
    velocity = maxVelosity;
    calcAccurance < Math.abs(estimatedHydraulicInc - averageHydraulicInc);
    velocity -= 0.001
  ) {
    const innerDiameter = formulas.innerDiameter(
      averageConsumption,
      averageTemperature,
      averagePressure,
      velocity
    );
    estimatedHydraulicInc = formulas.estimatedHydraulicInc(
      roughness,
      innerDiameter,
      viscosity,
      averageConsumption,
      density
    );
  }

  // Задаємося пустими масивами для результатів
  const estimatedDiameters = [];
  const reynoldsNumbers = [];
  const pressureLosses = [];
  const pressureChanges = [];
  const sumPressureChanges = [];
  const endingPressures = [];
  let sumPressureLoss = 0;

  for (let j = 0; j < segmentsAmount; j += 1) {
    // Знаходимо діаметр для конкретної ділянки
    let currentDiameter = formulas.innerDiameter(
      consumptions[j],
      averageTemperature,
      averagePressure,
      velocity
    );

    // Порівнюємо та заокруглюємо діаметр до найближчого більшого стандартного значення
    Object.entries(diameters).some(([diameterKey, diameterValue]) => {
      if (currentDiameter - diameterValue > 0) {
        return false;
      }

      currentDiameter = diameterValue;
      estimatedDiameters.push(diameterKey);
      return true;
    });

    // Знаходимо число Рейнольдса
    const currentReynolds = formulas.reynoldsNumber(
      consumptions[j],
      currentDiameter,
      viscosity
    );
    // Знаходимо втрати тиску від тертя залежно від режиму руху газу
    let currentPressureLoss = 0;
    if (currentReynolds >= 4000) {
      currentPressureLoss = formulas.pressureLossRe4000(
        roughness,
        currentDiameter,
        viscosity,
        consumptions[j],
        density,
        estimatedLengthsArray[j]
      );
    } else if (currentReynolds >= 2000 && currentReynolds < 4000) {
      currentPressureLoss = formulas.pressureLossRe3000(
        consumptions[j],
        density,
        estimatedLengthsArray[j],
        currentDiameter,
        viscosity
      );
    } else {
      currentPressureLoss = formulas.pressureLossRe2000(
        consumptions[j],
        viscosity,
        density,
        currentDiameter,
        estimatedLengthsArray[j]
      );
    }
    // Знаходимо зміну надлишкового тиску газу
    const currentPressureChange = formulas.pressureChange(
      lengths[j],
      density,
      moveDirections[j]
    );
    // Знаходимо загальну зміну тиску газу
    const currentSumPressureChange = formulas.totalPressureChange(
      currentPressureLoss,
      currentPressureChange
    );
    // Сумуємо втрати тиску
    sumPressureLoss += currentSumPressureChange;
    // Знаходимо загальний кінцевий тиск на ділянці
    const currentEndingPressure = formulas.endingPressure(
      startingPressure,
      currentSumPressureChange
    );
    // Оновлюємо початковий тиск
    startingPressure = currentEndingPressure;

    // Заносимо результати в масиви
    reynoldsNumbers.push(currentReynolds.toFixed());
    pressureLosses.push(currentPressureLoss.toFixed());
    pressureChanges.push(currentPressureChange.toFixed());
    sumPressureChanges.push(currentSumPressureChange.toFixed());
    endingPressures.push(currentEndingPressure.toFixed());
  }

  // Заносимо в модель потрібні результати
  return {
    segmentsAmount,
    segmentsNames,
    lengths,
    consumptions,
    estimatedDiameters,
    pressureLosses,
    pressureChanges,
    sumPressureChanges,
    endingPressures,
    velocity,
    sumPressureLoss,
  };
};
