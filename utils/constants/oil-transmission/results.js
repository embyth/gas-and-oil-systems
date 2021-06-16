export const OIL_TRANSMISSION_RESULT_FIELDS = {
  RESULTS_HEADING: `Результати розрахунку пропускної здатності магістрального нафтопроводу`,
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
      type: `main`,
      id: `title-1`,
      parameter: `Визначення розрахункових величин густини, в’язкості та витрати нафти`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `tempCorrection`,
      parameter: `Температурна поправка`,
      marking: `α`,
      dimension: `кг/(м<sup>3</sup>·<sup>о</sup>С)`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `density`,
      parameter: `Густина нафти за температури перекачування`,
      marking: `ρ<sub>t</sub>`,
      dimension: `кг/м<sup>3</sup>`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `viscosityCoef`,
      parameter: `Коефіцієнт крутизни віскограми`,
      marking: `U`,
      dimension: `1/ᵒC`,
    },
    {
      id: `viscosity`,
      type: `main`,
      parameter: `В'язкість нафти за температури перекачування`,
      marking: `ν`,
      dimension: `м<sup>2</sup>/с`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `workingDays`,
      parameter: `Розрахункове число робочих днів трубопроводу`,
      marking: `N`,
      dimension: `діб`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `dailyVolume`,
      parameter: `Добовий об'єм перекачування`,
      marking: `Q<sub>доб</sub>`,
      dimension: `м<sup>3</sup>/добу`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `hourlyVolume`,
      parameter: `Годинна продуктивність нафтопроводу`,
      marking: `Q<sub>год</sub>`,
      dimension: `м<sup>3</sup>/год`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `secondlyVolume`,
      parameter: `Секундна продуктивність нафтопроводу`,
      marking: `Q<sub>сек</sub>`,
      dimension: `м<sup>3</sup>/с`,
    },
    {
      isFullRow: true,
      type: `main`,
      id: `title-2`,
      parameter: `Характеристика основного обладнання нафтоперекачувальної станції`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `singleMainPumpPressure`,
      parameter: `Напір що створює один основний насос при заданій продуктивності`,
      marking: `h`,
      dimension: `м`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `singleSupPumpPressure`,
      parameter: `Напір що створює один підпірний насос при заданій продуктивності`,
      marking: `h<sub>п</sub>`,
      dimension: `м`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `mainStationPumpPressure`,
      parameter: `Напір, що створює головна нафтоперекачувальна станція`,
      marking: `Н<sub>гнпс</sub>`,
      dimension: `м`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `mainStationPressure`,
      parameter: `Тиск, що створює головна нафтоперекачувальна станція`,
      marking: `Р<sub>гнпс</sub>`,
      dimension: `МПа`,
    },
    {
      isFullRow: true,
      type: `main`,
      id: `title-3`,
      parameter: `Проектний гідравлічний розрахунок нафтопроводу`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `diameterCI`,
      parameter: `Внутрішній діаметр трубопроводу`,
      marking: `d`,
      dimension: `м`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `velosity`,
      parameter: `Швидкість рідини в трубопроводі`,
      marking: `W`,
      dimension: `м/с`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `reynolds`,
      parameter: `Число Рейнольдса`,
      marking: `Re`,
      dimension: ``,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `coefHydraulicResist`,
      parameter: `Коефіцієнт гідравлічного опору`,
      marking: `λ`,
      dimension: ``,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `frictionPressureLoss`,
      parameter: `Втрати напору на тертя по довжині трубопроводу`,
      marking: `h<sub>τ</sub>`,
      dimension: `м`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `frictionPressureLoss100`,
      parameter: `Втрати напору на ділянці довжиною 100 км`,
      marking: `h<sub>ф</sub>`,
      dimension: `м`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `frictionPressureLossAll`,
      parameter: `Загальні втрати напору`,
      marking: `Н<sub>заг</sub>`,
      dimension: `м`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `stationPressure`,
      parameter: `Напір, що створює проміжна станція`,
      marking: `Н<sub>ст</sub>`,
      dimension: `м`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `stationsQuantity`,
      parameter: `Розрахункова кількість проміжних перекачувальних станцій`,
      marking: `n<sub>р</sub>`,
      dimension: ``,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `stations`,
      parameter: `Кількість проміжних перекачувальних станцій`,
      marking: `n`,
      dimension: `шт`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `hydraulicTilt`,
      parameter: `Гідравлічний нахил в трубопроводі`,
      marking: `i`,
      dimension: ``,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `loopingLength`,
      parameter: `Необхідна довжина лупінга`,
      marking: `x`,
      dimension: `м`,
    },
    {
      isFullRow: true,
      type: `main`,
      id: `title-4`,
      parameter: `Уточнений гідравлічний розрахунок нафтопроводу`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `volCoefA`,
      parameter: `Коефіцієнт А математичної моделі сумарної напірної характеристики всіх НПС`,
      marking: `А`,
      dimension: `м`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `volCoefB`,
      parameter: `Коефіцієнт B математичної моделі сумарної напірної характеристики всіх НПС`,
      marking: `B`,
      dimension: `c<sup>2</sup>/м<sup>5</sup>`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `coefKappa`,
      parameter: `Параметр æ`,
      marking: `æ`,
      dimension: `c<sup>2</sup>/м`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `factVelosity`,
      parameter: `Швидкість руху нафти`,
      marking: `W`,
      dimension: `м/с`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `factReynolds`,
      parameter: `Число Рейнольдса`,
      marking: `Re`,
      dimension: ``,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `resistCoef`,
      parameter: `Коефіцієнт гідравлічного опору`,
      marking: `λ`,
      dimension: ``,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `factSingleMainPumpPressure`,
      parameter: `Напір, що створює один основний насос`,
      marking: `h`,
      dimension: `м`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `factSingleSupPumpPressure`,
      parameter: `Напір, що створює один підпірний насос`,
      marking: `h<sub>п</sub>`,
      dimension: `м`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `factMainStationPumpPressure`,
      parameter: `Напір, що створює ГНПС`,
      marking: `H<sub>гнпс</sub>`,
      dimension: `м`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `factMainStationPressure`,
      parameter: `Тиск, що створює ГНПС`,
      marking: `P<sub>гнпс</sub>`,
      dimension: `МПа`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `sumThrottlePressure`,
      parameter: `Сумарний напір, що дроселюється на виході всіх станцій`,
      marking: `h'<sub>др</sub>`,
      dimension: `м`,
    },
    {
      isFullRow: false,
      type: `main`,
      id: `factVolume`,
      parameter: `Уточненна фактична пропускна здатності`,
      marking: `Q`,
      dimension: `м<sup>3</sup>/c`,
    },
    {
      isFullRow: true,
      type: `extra`,
      id: `title-5`,
      parameter: `Пропускна здатність магістрального нафтопроводу`,
    },
    {
      isFullRow: false,
      type: `extra`,
      id: `velosityFact`,
      parameter: `Cередня швидкість руху нафти в поперечному перерізі`,
      marking: `W`,
      dimension: `м/c`,
    },
    {
      isFullRow: false,
      type: `extra`,
      id: `reynoldsFact`,
      parameter: `Число Рейнольдса`,
      marking: `Re`,
      dimension: ``,
    },
    {
      isFullRow: false,
      type: `extra`,
      id: `coefEpsilon`,
      parameter: `Еквівалентна шорсткість трубопроводу`,
      marking: `ε`,
      dimension: ``,
    },
    {
      isFullRow: false,
      type: `extra`,
      id: `reynoldsFirst`,
      parameter: `Перше перехідне число Рейнольдса`,
      marking: `Re<sub>I</sub>`,
      dimension: ``,
    },
    {
      isFullRow: false,
      type: `extra`,
      id: `reynoldsSecond`,
      parameter: `Друге перехідне число Рейнольдса`,
      marking: `Re<sub>II</sub>`,
      dimension: ``,
    },
    {
      isFullRow: false,
      type: `extra`,
      id: `resistCoefFact`,
      parameter: `Коефіцієнт гідравлічного опору`,
      marking: `λ`,
      dimension: ``,
    },
    {
      isFullRow: false,
      type: `extra`,
      id: `stationVolume`,
      parameter: `Продуктивність трубопроводу при даному режимі роботи`,
      marking: `Q<sub>тр</sub>`,
      dimension: `м<sup>3</sup>/с`,
    },
    {
      isFullRow: false,
      type: `station`,
      id: `stations-list`,
      data: [
        {
          isFullRow: false,
          type: `station`,
          id: `maxAllowablePressure`,
          parameter: `Максимально допустимий тиск на виході станції`,
          marking: `h<sub>max</sub>`,
          dimension: `м`,
        },
        {
          isFullRow: false,
          type: `station`,
          id: `minAllowablePressure`,
          parameter: `Мінімально допустимий тиск на вході в наступну станцію`,
          marking: `h<sub>min</sub>`,
          dimension: `м`,
        },
        {
          isFullRow: false,
          type: `station`,
          id: `stationMainPumpPressureTogather`,
          parameter: `Напір, що створюють основні насоси`,
          marking: `h<sub>о</sub>`,
          dimension: `м`,
        },
        {
          isFullRow: false,
          type: `station`,
          id: `stationSupPumpPressure`,
          parameter: `Напір, що створює підпірний насос`,
          marking: `h<sub>п</sub>`,
          dimension: `м`,
        },
        {
          isFullRow: false,
          type: `station`,
          id: `sumPressureLoss`,
          parameter: `Cумарні втрати напору на прогоні між станціями`,
          marking: `h<sub>w</sub>`,
          dimension: `м`,
        },
        {
          isFullRow: false,
          type: `station`,
          id: `stationPumpPressure`,
          parameter: `Напір, що створює станція`,
          marking: `Н<sub>ст</sub>`,
          dimension: `м`,
        },
        {
          isFullRow: false,
          type: `station`,
          id: `outletSupport`,
          parameter: `Величина підпору на вході в наступну станцію`,
          marking: `h<sub>п</sub>`,
          dimension: `м`,
        },
        {
          isFullRow: false,
          type: `station`,
          id: `exceedingSupport`,
          parameter: `Перевищення величини підпору на вході в наступну станцію`,
          marking: `Δh`,
          dimension: `м`,
        },
        {
          isFullRow: false,
          type: `station`,
          id: `stationOutletPumpPressureFull`,
          parameter: `Напір на виході станції`,
          marking: `Н`,
          dimension: `м`,
        },
        {
          isFullRow: false,
          type: `station`,
          id: `stationOutletPumpPressure`,
          parameter: `Напір за умови максимально допустимого напору на виході станції`,
          marking: `Н'`,
          dimension: `м`,
        },
      ],
    },
  ],
};
