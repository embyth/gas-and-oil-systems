export const OIL_TRANSMISSION_INPUT_FIELDS = [
  {
    definition: `ρ<sub>20</sub>`,
    label: `Густина нафти за температури 20 °C`,
    id: `density20`,
    placeholder: `836.1`,
    min: `100`,
    max: `1000`,
    step: `0.01`,
    dimension: `кг/м<sup>3</sup>`,
  },
  {
    definition: `ν<sub>0</sub>`,
    label: `В'язкість нафти`,
    id: `viscosity`,
    placeholder: `38.4`,
    min: `1`,
    max: `100`,
    step: `0.01`,
    dimension: `сСт`,
  },
  {
    definition: `ν<sub>20</sub>`,
    label: `В'язкість нафти за температури 20 °С`,
    id: `viscosity20`,
    placeholder: `19.35`,
    min: `1`,
    max: `100`,
    step: `0.01`,
    dimension: `сСт`,
  },
  {
    definition: `L`,
    label: `Довжина трубопроводу`,
    id: `length`,
    placeholder: `530`,
    min: `50`,
    max: `2000`,
    step: `0.1`,
    dimension: `км`,
  },
  {
    definition: `d`,
    label: `Діаметр нафтопроводу`,
    id: `diameter`,
    placeholder: `720`,
    min: `219`,
    max: `1220`,
    step: `1`,
    dimension: `мм`,
  },
  {
    definition: `δ`,
    label: `Товщина стінки трубопроводу`,
    id: `wall`,
    placeholder: `8`,
    min: `2`,
    max: `20`,
    step: `0.1`,
    dimension: `мм`,
  },
  {
    definition: `M`,
    label: `Річний обсяг перекачування`,
    id: `capacity`,
    placeholder: `14.1`,
    min: `1`,
    max: `30`,
    step: `0.01`,
    dimension: `млн. т/рік`,
  },
  {
    definition: `t<sub>min</sub>`,
    label: `Температура грунту на осі прокладання трубопроводу`,
    id: `oil-temp`,
    placeholder: `1.8`,
    min: `0`,
    max: `20`,
    step: `0.01`,
    dimension: `°С`,
  },
  {
    definition: `x`,
    label: `Гориста, болотиста місцевість проходження траси`,
    id: `pipeline-cond`,
    placeholder: `22`,
    min: `0`,
    max: `100`,
    step: `0.1`,
    dimension: `%`,
  },
  {
    definition: `r`,
    label: `Кількість працюючих основних насосів`,
    id: `pump-amount`,
    placeholder: `3`,
    min: `1`,
    max: `6`,
    step: `1`,
    dimension: `шт`,
  },
  {
    definition: `а`,
    label: `Коефіцієнт а математичної моделі для основного насосу`,
    id: `a-coef`,
    placeholder: `286.8`,
    min: `50`,
    max: `500`,
    step: `0.1`,
    dimension: `м`,
  },
  {
    definition: `b`,
    label: `Коефіцієнт b математичної моделі для основного насосу`,
    id: `b-coef`,
    placeholder: `119.2`,
    min: `10`,
    max: `400`,
    step: `0.01`,
    dimension: `с<sup>2</sup>/м<sup>5</sup>`,
  },
  {
    definition: `а<sub>п</sub>`,
    label: `Коефіцієнт а математичної моделі для підпірного насосу`,
    id: `a-coef-sup`,
    placeholder: `113.8`,
    min: `50`,
    max: `500`,
    step: `0.1`,
    dimension: `м`,
  },
  {
    definition: `b<sub>п</sub>`,
    label: `Коефіцієнт b математичної моделі для підпірного насосу`,
    id: `b-coef-sup`,
    placeholder: `67.4`,
    min: `10`,
    max: `400`,
    step: `0.01`,
    dimension: `с<sup>2</sup>/м<sup>5</sup>`,
  },
  {
    definition: `z<sub>п</sub>`,
    label: `Геодезична позначка початку нафтопроводу`,
    id: `start-geopoint`,
    placeholder: `24`,
    min: null,
    max: null,
    step: `0.1`,
    dimension: `м`,
  },
  {
    definition: `z<sub>к</sub>`,
    label: `Геодезична позначка кінця нафтопроводу`,
    id: `end-geopoint`,
    placeholder: `79`,
    min: null,
    max: null,
    step: `0.1`,
    dimension: `м`,
  },
];
