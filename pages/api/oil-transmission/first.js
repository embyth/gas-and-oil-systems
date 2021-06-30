import { nanoid } from "nanoid";

import { firstCalculation } from "../../../calculations/oil-transmission/algorithm";

import { getRandomNumber } from "../../../utils/common";

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({
      message: `Метод не підтримується сервером!`,
    });
    return;
  }

  const { body: clientData } = req;

  try {
    const results = firstCalculation(clientData);

    // Создаем массив из количества НПС и заполняем их уникальными id
    const stations = new Array(results.stations + 1).fill(null).map(() => ({
      uniqId: nanoid(),
      placeholders: {
        length: getRandomNumber(70, 175),
        "geo-point": getRandomNumber(-50, 150),
        "pump-quant": getRandomNumber(1, 5),
      },
    }));

    const updatedResults = {
      firstCalcResults: {
        ...results,
        stationsAmount: stations.length - 1,
      },
      stationsProps: stations,
    };
    res.status(201).json(updatedResults);
  } catch (error) {
    res.status(501).json({
      message:
        error || `Помилка в розрахунку, перевірте правильність введених даних!`,
    });
  }
}

export default handler;
