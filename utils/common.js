export const arrayToObjectByKey = (array, key) =>
  array.reduce(
    (obj, item) => ({
      ...obj,
      [item[key]]: item,
    }),
    {}
  );
