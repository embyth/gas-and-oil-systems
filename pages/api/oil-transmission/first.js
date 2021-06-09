import { firstCalculation } from "../../../calculations/oil-transmission/algorithm";

import { getRandomNumber } from "../../../utils/common";

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({
      message: `Метод не підтримується сервером!`,
    });
    return;
  }

  const { body: cleintData } = req;

  try {
    const results = firstCalculation(cleintData);

    // Создаем массив из количества НПС и заполняем их уникальными id
    const stations = new Array(results.stations + 1).fill(null).map(() => ({
      uniqId: getRandomNumber(0, 999999999),
    }));

    const updatedResults = { ...results, stations };
    res.status(201).json(updatedResults);
  } catch (error) {
    res.status(501).json({
      message:
        error || `Помилка в розрахунку, перевірте правильність введених даних!`,
    });
  }
}

export default handler;
