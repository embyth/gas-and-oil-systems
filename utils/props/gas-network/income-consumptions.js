export const GAS_NETWORK_CONSUMPTIONS_INPUT_FIELDS = {
  main: [
    {
      definition: `n<sub>о</sub>`,
      label: `Кількість основних напрямів руху газу`,
      id: `basis-routes`,
      placeholder: `3`,
      min: `1`,
      max: `10`,
      step: `1`,
      dimension: `шт`,
    },
    {
      definition: `L<sub>заг</sub>`,
      label: `Сумарна довжина всіх ділянок газової мережі`,
      id: `total-length`,
      placeholder: `4065`,
      min: `1`,
      max: `50000`,
      step: `0.1`,
      dimension: `м`,
    },
  ],
  configuration: [
    {
      definition: `n<sub>д</sub>`,
      label: `Кількість ділянок для основного напряму №`,
      id: `basis-route-segments-amount`,
      placeholder: `5`,
      min: `1`,
      max: `100`,
      step: `1`,
      dimension: `шт`,
    },
  ],
  segments: [
    {
      id: `segment`,
    },
    {
      id: `length`,
    },
    {
      id: `consumption-path`,
    },
    {
      id: `consumption-transit`,
    },
    {
      id: `consumption-calc`,
    },
  ],
};
