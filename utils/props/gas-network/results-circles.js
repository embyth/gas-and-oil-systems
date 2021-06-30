export const GAS_NETWORK_CIRCLES_RESULT_FIELDS = {
  RESULTS_HEADING: `Розрахунок витрат газу споживачами`,
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
      type: `physical-properties`,
      id: `title-1`,
      parameter: `Результати розрахунку фізичних властивостей природного газу`,
    },
    {
      isFullRow: false,
      type: `physical-properties`,
      id: `mu`,
      parameter: `Молярна маса газу`,
      marking: `μ`,
      dimension: `кг/кмоль`,
    },
  ],
};
