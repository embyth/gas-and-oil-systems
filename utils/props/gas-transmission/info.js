export const GAS_TRANSMISSION_SCREENS = [
  {
    id: "INTRO",
    label: "Вступ",
    isDisabled: false,
  },
  {
    id: "INCOME_DATA",
    label: "Вихідні дані",
    labelCropped: "Дані",
    isDisabled: false,
  },
  {
    id: "RESULTS",
    label: "Результати",
    isDisabled: true,
  },
];

export const GAS_TRANSMISSION_INTRO_DATA = {
  heading: `Аналітичний розрахунок режиму роботи газотранспортної системи`,
  text: `При проектуванні і експлуатації газопроводів нерідко постає задача у визначенні пропускної здатності газопроводу або його ділянки, розрахунок тиску і температури в будь-якій точці газопроводу. Дана задача пов’язана із гідравлічними та тепловими розрахунками газопроводів, які проводяться разом, оскільки гідравлічні втрати і фізичні властивості газу залежать від його температури, а тепловий режим газопроводу змінюється із зміною гідравлічного режиму.`,
  detailsHref: `/gas-transmission-details`,
};
