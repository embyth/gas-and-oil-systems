export const arrayToObjectByKey = (array, key) =>
  array.reduce(
    (obj, item) => ({
      ...obj,
      [item[key]]: item,
    }),
    {}
  );

export const getRandomNumber = (min, max) =>
  +Math.floor(Math.random() * (max - min)) + min;

export const getRandomFloatNumber = (min, max, fix) =>
  +(Math.random() * (max - min) + min).toFixed(fix);

export const getRandomIndex = (number) => Math.floor(Math.random() * number);

export const getRandomValue = (array) => array[getRandomIndex(array.length)];

export const kebabToCamelCase = (string) =>
  string.replace(/-./g, (x) => x[1].toUpperCase());
