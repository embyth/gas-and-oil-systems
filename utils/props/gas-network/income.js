export const GAS_NETWORK_INPUT_FIELDS = [
  {
    definition: `CH<sub>4</sub>`,
    label: `Метан`,
    id: `methane`,
    placeholder: `88.26`,
    min: `0`,
    max: `100`,
    step: `0.01`,
    dimension: `%`,
  },
  {
    definition: `C<sub>2</sub>H<sub>6</sub>`,
    label: `Етан`,
    id: `ethane`,
    placeholder: `3.5`,
    min: `0`,
    max: `100`,
    step: `0.01`,
    dimension: `%`,
  },
  {
    definition: `C<sub>3</sub>H<sub>8</sub>`,
    label: `Пропан`,
    id: `propane`,
    placeholder: `1.96`,
    min: `0`,
    max: `100`,
    step: `0.01`,
    dimension: `%`,
  },
  {
    definition: `C<sub>4</sub>H<sub>10</sub>`,
    label: `Н-бутан`,
    id: `butane`,
    placeholder: `0.9`,
    min: `0`,
    max: `100`,
    step: `0.01`,
    dimension: `%`,
  },
  {
    definition: `C<sub>5</sub>H<sub>12</sub>`,
    label: `Н-пентан`,
    id: `pentane`,
    placeholder: `1.38`,
    min: `0`,
    max: `100`,
    step: `0.01`,
    dimension: `%`,
  },
  {
    definition: `N<sub>2</sub>`,
    label: `Азот`,
    id: `nitrogen`,
    placeholder: `4`,
    min: `0`,
    max: `100`,
    step: `0.01`,
    dimension: `%`,
  },
  {
    definition: `CO<sub>2</sub>`,
    label: `Вуглекислий газ`,
    id: `carbon-dioxide`,
    placeholder: `0`,
    min: `0`,
    max: `100`,
    step: `0.01`,
    dimension: `%`,
  },
  {
    definition: `N`,
    label: `Кількість жителів`,
    id: `inhibitants-amount`,
    placeholder: `740`,
    min: `1`,
    max: `4000`,
    step: `1`,
    dimension: `чол`,
  },
  {
    definition: `t<sub>o</sub>`,
    label: `Розрахункова температура повітря для проектування опалення`,
    id: `temperature-for-heating`,
    placeholder: `-21`,
    min: `-35`,
    max: `-5`,
    step: `1`,
    dimension: `°С`,
  },
  {
    definition: `t<sub>в</sub>`,
    label: `Розрахункова температура для проектування вентиляції`,
    id: `temperature-for-venting`,
    placeholder: `-9`,
    min: `-50`,
    max: `50`,
    step: `0.1`,
    dimension: `°С`,
  },
  {
    definition: `t<sub>от</sub>`,
    label: `Середня за опалювальний період температура зовнішнього повітря`,
    id: `temperature-avg-heating`,
    placeholder: `0.5`,
    min: `-40`,
    max: `10`,
    step: `0.1`,
    dimension: `°С`,
  },
  {
    definition: `t<sub>вн</sub>`,
    label: `Розрахункова температура повітря усередині житлових приміщень`,
    id: `temperature-inside`,
    placeholder: `18`,
    min: `10`,
    max: `30`,
    step: `0.1`,
    dimension: `°С`,
  },
  {
    definition: `n<sub>o</sub>`,
    label: `Тривалість опалювального періоду`,
    id: `heating-duration`,
    placeholder: `190`,
    min: `30`,
    max: `300`,
    step: `1`,
    dimension: `діб`,
  },
  {
    definition: `n<sub>кор</sub><sup>тв</sup>`,
    label: `Кількість корів`,
    id: `cows-amount`,
    placeholder: `190`,
    min: `0`,
    max: `1000`,
    step: `1`,
    dimension: `шт`,
  },
  {
    definition: `n<sub>кон</sub><sup>тв</sup>`,
    label: `Кількість корів`,
    id: `horses-amount`,
    placeholder: `45`,
    min: `0`,
    max: `1000`,
    step: `1`,
    dimension: `шт`,
  },
  {
    definition: `n<sub>св</sub><sup>тв</sup>`,
    label: `Кількість свиней`,
    id: `pigs-amount`,
    placeholder: `249`,
    min: `0`,
    max: `1000`,
    step: `1`,
    dimension: `шт`,
  },
  {
    definition: `a<sub>гпцвг</sub>`,
    label: `Асортимент ГП+ЦВГ у житловому секторі`,
    id: `devices-gpcvg`,
    placeholder: `0`,
    min: `0`,
    max: `100`,
    step: `0.1`,
    dimension: `%`,
  },
  {
    definition: `a<sub>гпвнг</sub>`,
    label: `Асортимент ГП+ВНГ у житловому секторі`,
    id: `devices-gpvng`,
    placeholder: `41`,
    min: `0`,
    max: `100`,
    step: `0.1`,
    dimension: `%`,
  },
  {
    definition: `a<sub>гп</sub>`,
    label: `Асортимент ГП у житловому секторі`,
    id: `devices-gp`,
    placeholder: `59`,
    min: `0`,
    max: `100`,
    step: `0.1`,
    dimension: `%`,
  },
  {
    definition: `о<sub>гп</sub>`,
    label: `Асортимент газових печей для опалення житлового сектору`,
    id: `heating-device-gp`,
    placeholder: `53`,
    min: `0`,
    max: `100`,
    step: `0.1`,
    dimension: `%`,
  },
  {
    definition: `о<sub>іок</sub>`,
    label: `Асортимент індивідуальних опалювальних котлів для опалення житлового сектору`,
    id: `heating-device-iok`,
    placeholder: `47`,
    min: `0`,
    max: `100`,
    step: `0.1`,
    dimension: `%`,
  },
  {
    definition: `б<sub>до</sub>`,
    label: `Відсоток будівель споруджених до 1985 р.`,
    id: `built-before-1985`,
    placeholder: `67`,
    min: `0`,
    max: `100`,
    step: `0.1`,
    dimension: `%`,
  },
  {
    definition: `б<sub>псл</sub>`,
    label: `Відсоток будівель споруджених після 1985 р.`,
    id: `built-after-1985`,
    placeholder: `33`,
    min: `0`,
    max: `100`,
    step: `0.1`,
    dimension: `%`,
  },
  {
    definition: `п<sub>1-2</sub>`,
    label: `Відсоток одно-двоповерхових будівель`,
    id: `floor-1-2`,
    placeholder: `81`,
    min: `0`,
    max: `100`,
    step: `0.1`,
    dimension: `%`,
  },
  {
    definition: `п<sub>3-4</sub>`,
    label: `Відсоток трьох-чотирьохповерхових будівель`,
    id: `floor-3-4`,
    placeholder: `19`,
    min: `0`,
    max: `100`,
    step: `0.1`,
    dimension: `%`,
  },
  {
    definition: `п<sub>баг</sub>`,
    label: `Відсоток багатоповерхових будівель`,
    id: `floor-high`,
    placeholder: `0`,
    min: `0`,
    max: `100`,
    step: `0.1`,
    dimension: `%`,
  },
];
