export const arrayToObjectByKey = (array, key) =>
  array.reduce(
    (obj, item) => ({
      ...obj,
      [item[key]]: item,
    }),
    {}
  );

export const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;
