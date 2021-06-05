export const OIL_TRANSMISSION_INPUT_FIELDS = [
  {
    definition: `ρ₂₀`,
    label: `Густина нафти за температури 20 °C`,
    id: `density20`,
    placeholder: `836.1`,
    min: `100`,
    max: `1000`,
    step: `0.01`,
    demention: `кг/м³`,
  },
  {
    definition: `ν₀`,
    label: `В'язкість нафти`,
    id: `viscosity`,
    placeholder: `38.4`,
    min: `1`,
    max: `100`,
    step: `0.01`,
    demention: `сСт`,
  },
  {
    definition: `ν₂₀`,
    label: `В'язкість нафти за температури 20 °С`,
    id: `viscosity20`,
    placeholder: `19.35`,
    min: `1`,
    max: `100`,
    step: `0.01`,
    demention: `сСт`,
  },
  {
    definition: `L`,
    label: `Довжина трубопроводу`,
    id: `length`,
    placeholder: `530`,
    min: `50`,
    max: `2000`,
    step: `0.1`,
    demention: `км`,
  },
  {
    definition: `d`,
    label: `Діаметр нафтопроводу`,
    id: `diameter`,
    placeholder: `720`,
    min: `219`,
    max: `1220`,
    step: `1`,
    demention: `мм`,
  },
  {
    definition: `δ`,
    label: `Товщина стінки трубопроводу`,
    id: `wall`,
    placeholder: `8`,
    min: `2`,
    max: `20`,
    step: `0.1`,
    demention: `мм`,
  },
  {
    definition: `M`,
    label: `Річний обсяг перекачування`,
    id: `capacity`,
    placeholder: `14.1`,
    min: `1`,
    max: `30`,
    step: `0.01`,
    demention: `млн. т/рік`,
  },
  {
    definition: `tₘᵢₙ`,
    label: `Температура грунту на осі прокладання трубопроводу`,
    id: `oil-temp`,
    placeholder: `1.8`,
    min: `0`,
    max: `20`,
    step: `0.01`,
    demention: `°С`,
  },
  {
    definition: `x`,
    label: `Гориста, болотиста місцевість проходження траси`,
    id: `pipeline-cond`,
    placeholder: `22`,
    min: `0`,
    max: `100`,
    step: `0.1`,
    demention: `%`,
  },
  {
    definition: `r`,
    label: `Кількість працюючих основних насосів`,
    id: `pump-amount`,
    placeholder: `3`,
    min: `1`,
    max: `6`,
    step: `1`,
    demention: `шт`,
  },
  {
    definition: `а`,
    label: `Коефіцієнт а математичної моделі для основного насосу`,
    id: `a-coef`,
    placeholder: `286.8`,
    min: `50`,
    max: `500`,
    step: `0.1`,
    demention: `м`,
  },
  {
    definition: `b`,
    label: `Коефіцієнт b математичної моделі для основного насосу`,
    id: `b-coef`,
    placeholder: `119.2`,
    min: `10`,
    max: `400`,
    step: `0.01`,
    demention: `c²/м⁵`,
  },
  {
    definition: `аₙ`,
    label: `Коефіцієнт а математичної моделі для підпірного насосу`,
    id: `a-coef-sup`,
    placeholder: `113.8`,
    min: `50`,
    max: `500`,
    step: `0.1`,
    demention: `м`,
  },
  {
    definition: `bₙ`,
    label: `Коефіцієнт b математичної моделі для підпірного насосу`,
    id: `b-coef-sup`,
    placeholder: `67.4`,
    min: `10`,
    max: `400`,
    step: `0.01`,
    demention: `c²/м⁵`,
  },
  {
    definition: `zₙ`,
    label: `Геодезична позначка початку нафтопроводу`,
    id: `start-geopoint`,
    placeholder: `24`,
    min: null,
    max: null,
    step: `0.1`,
    demention: `м`,
  },
  {
    definition: `zₖ`,
    label: `Геодезична позначка кінця нафтопроводу`,
    id: `end-geopoint`,
    placeholder: `79`,
    min: null,
    max: null,
    step: `0.1`,
    demention: `м`,
  },
];