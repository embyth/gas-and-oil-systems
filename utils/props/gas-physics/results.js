export const GAS_PHYSICS_RESULT_FIELDS = {
  RESULTS_HEADING: `Результати розрахунку фізичних властивостей природного газу`,
  RESULTS_HEAD: [
    {
      label: `Параметр`,
      id: `parameter`,
    },
    {
      label: `Позначення`,
      id: `marking`,
    },
    {
      label: `Значення`,
      id: `value`,
    },
    {
      label: `Розмірність`,
      id: `dimension`,
    },
  ],
  RESULTS: [
    {
      isFullRow: true,
      type: `physicalProperties`,
      id: `title-1`,
      parameter: `Результати розрахунку фізичних властивостей природного газу`,
    },
    {
      isFullRow: false,
      type: `physicalProperties`,
      id: `molarMass`,
      parameter: `Молярна маса газу`,
      marking: `μ`,
      dimension: `кг/кмоль`,
    },
    {
      isFullRow: false,
      type: `physicalProperties`,
      id: `normalDensity`,
      parameter: `Густина природного газу за нормальних умов`,
      marking: `ρ<sub>н</sub>`,
      dimension: `кг/м<sup>3</sup>`,
    },
    {
      isFullRow: false,
      type: `physicalProperties`,
      id: `relativeDensity`,
      parameter: `Відносна густина газу за повітрям`,
      marking: `Δ`,
      dimension: ``,
    },
    {
      isFullRow: false,
      id: `standartDensity`,
      type: `physicalProperties`,
      parameter: `Густина природного газу за стандартних фізичних умов`,
      marking: `ρ<sub>ст</sub>`,
      dimension: `кг/м<sup>3</sup>`,
    },
    {
      isFullRow: false,
      type: `physicalProperties`,
      id: `gasConst`,
      parameter: `Газова стала природного газу`,
      marking: `R`,
      dimension: `Дж/кг·К`,
    },
    {
      isFullRow: false,
      type: `physicalProperties`,
      id: `pseudoPressure`,
      parameter: `Псевдокритичний тиск природного газу`,
      marking: `P<sub>кр</sub>`,
      dimension: `МПа`,
    },
    {
      isFullRow: false,
      type: `physicalProperties`,
      id: `pseudoTemperature`,
      parameter: `Псевдокритична температура природного газу`,
      marking: `T<sub>кр`,
      dimension: `K`,
    },
    {
      isFullRow: false,
      type: `physicalProperties`,
      id: `lowerVolumetricHeat`,
      parameter: `Нижча об’ємна теплота згорання`,
      marking: `Q<sub>нр</sub>`,
      dimension: `кДж/м<sup>3</sup>`,
    },
    {
      isFullRow: false,
      type: `physicalProperties`,
      id: `lowerMassHeatOfCombustion`,
      parameter: `Нижча масова теплота згорання газу`,
      marking: `Q<sub>нр</sub>'`,
      dimension: `кДж/кг`,
    },
    {
      isFullRow: false,
      type: `physicalProperties`,
      id: `dynamicViscosity`,
      parameter: `Динамічна в'язкість природного газу`,
      marking: `η·10<sup>-6</sup>`,
      dimension: `Па·с`,
    },
    {
      isFullRow: false,
      type: `physicalProperties`,
      id: `kinematicViscosity`,
      parameter: `Кінематична в'язкість природного газу`,
      marking: `υ·10<sup>-6</sup>`,
      dimension: `м<sup>2</sup>/с`,
    },
  ],
};
