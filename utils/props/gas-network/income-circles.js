export const GAS_NETWORK_CIRCLES_INPUT_FIELDS = {
  main: [
    {
      definition: `P<sub>п</sub>`,
      label: `Тиск газу на початку газової мережі`,
      id: `pressure-start-low`,
      placeholder: `3000`,
      min: `2000`,
      max: `6000`,
      step: `1`,
      dimension: `Па`,
      type: `LOW`,
    },
    {
      definition: `ΔP<sub>доп</sub>`,
      label: `Допустимі втрати тиску в мережі`,
      id: `pressure-drop`,
      placeholder: `1200`,
      min: `500`,
      max: `3000`,
      step: `1`,
      dimension: `Па`,
      type: `LOW`,
    },
    {
      definition: `P<sub>п</sub>`,
      label: `Тиск газу на початку газової мережі`,
      id: `pressure-start-medium`,
      placeholder: `0.3`,
      min: `0.2`,
      max: `0.6`,
      step: `0.001`,
      dimension: `МПа`,
      type: `MEDIUM`,
    },
    {
      definition: `P<sub>к</sub>`,
      label: `Тиск газу на вході до споживачів`,
      id: `pressure-end`,
      placeholder: `0.2`,
      min: `0.1`,
      max: `0.3`,
      step: `0.001`,
      dimension: `МПа`,
      type: `MEDIUM`,
    },
    {
      definition: `ε<sub>k</sub>`,
      label: `Похибка Кірхгофа для кілець`,
      id: `kirghof-scale`,
      placeholder: `1`,
      min: `1`,
      max: `100`,
      step: `1`,
      dimension: `%`,
      type: `BOTH`,
    },
    {
      definition: `k<sub>п</sub>`,
      label: `Коефіцієнт перевантаження мережі`,
      id: `highload-coef`,
      placeholder: `1`,
      min: `1`,
      max: `1.5`,
      step: `0.01`,
      dimension: ``,
      type: `BOTH`,
    },
    {
      definition: `n<sub>к</sub>`,
      label: `Кількість кілець`,
      id: `circles-amount`,
      placeholder: `4`,
      min: `1`,
      max: `10`,
      step: `1`,
      dimension: `шт`,
      type: `BOTH`,
    },
    {
      definition: `n<sub>он</sub>`,
      label: `Кількість основних напрямів`,
      id: `basis-routes`,
      placeholder: `3`,
      min: `1`,
      max: `10`,
      step: `1`,
      dimension: `шт`,
      type: `BOTH`,
    },
  ],
  configuration: [
    {
      definition: `n<sub>дк</sub>`,
      label: `Кількість ділянок в кільці №`,
      id: `segments-amount-circle`,
      placeholder: `5`,
      min: `1`,
      max: `100`,
      step: `1`,
      dimension: `шт`,
    },
    {
      definition: `l<sub>он</sub>`,
      label: `Довжина основного напряму №`,
      id: `length-basis-route`,
      placeholder: `705`,
      min: `1`,
      max: `2000`,
      step: `1`,
      dimension: `м`,
    },
  ],
  segments: [
    {
      id: `segment`,
    },
    {
      id: `consumption-calc`,
    },
    {
      id: `length`,
    },
    {
      id: `neighbor-circle-num`,
    },
    {
      id: `basis-route-num`,
    },
  ],
};
