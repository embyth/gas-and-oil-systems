import { RESIST_COEFS } from "../../../calculations/gas-indoor/const";

import {
  getRandomNumber,
  getRandomFloatNumber,
  getRandomValue,
  kebabToCamelCase,
} from "../../../utils/common";

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({
      message: `Метод не підтримується сервером!`,
    });
    return;
  }

  const { body: clientData } = req;

  try {
    // Адаптируем ключ в камел кейс и значение конвертируем в число
    const results = Object.entries(clientData).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [kebabToCamelCase(key)]: +value,
      }),
      {}
    );

    // Создаем массив из количества ділянок и заполняем их уникальными id и плейсхолдерами
    const segments = [...new Array(results.segmentsAmount)].map(() => ({
      uniqId: getRandomNumber(0, 999999999),
      placeholders: {
        segment: `${getRandomNumber(1, 15)}-${getRandomNumber(1, 15)}`,
        consumption: getRandomFloatNumber(1, 15, 2),
        length: getRandomFloatNumber(1, 12, 1),
        "resist-coef": getRandomValue(RESIST_COEFS),
      },
    }));

    const updatedResults = { ...results, segments };
    res.status(201).json(updatedResults);
  } catch (error) {
    res.status(501).json({
      message:
        error || `Помилка в розрахунку, перевірте правильність введених даних!`,
    });
  }
}

export default handler;
