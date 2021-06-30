export const GAS_NETWORK_SCREENS = [
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
    id: "RESULTS_PHYSICS",
    label: "Результати фіз. властивостей",
    labelCropped: "Рез. фіз. власт.",
    isDisabled: true,
  },
  {
    id: "INCOME_CONSUMPTION",
    label: "Витрати",
    isDisabled: true,
  },
  {
    id: "INCOME_NETWORK",
    label: "Кільця",
    isDisabled: true,
  },
  {
    id: "RESULTS_NETWORK",
    label: "Результати кілець",
    labelCropped: "Рез. кілець",
    isDisabled: true,
  },
];

export const GAS_NETWORK_INTRO_DATA = {
  heading: `Розрахунок системи газопостачання населеного пункту (кільцева)`,
  text: `Зовнішні мережі низького тиску (вуличні, внутрішньоквартальні, дворові газопроводи) - це складна система газопроводів, яка подає газ численним споживачам, наприклад, житловим будинкам. Витрати газу споживачами приблизно однакові, споживачі розміщені на приблизно однакових відстанях. При виконанні зазначених трьох умов для розрахунку газових мереж низького тиску може бути використана модель газопроводу з рівномірним і безперервним відбором газу по довжині.`,
  detailsHref: `/gas-network-details`,
};
