import { calculate } from "../../../calculations/gas-indoor/algorithm";

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
    const results = calculate(clientData);

    const segments = [...Array(results.segmentsAmount)].map(
      (segment, index) => ({
        uniqId: getRandomNumber(0, 99999999),
        name: results.segmentsNames[index],
        length: results.lengths[index],
        consumption: results.consumptions[index],
        diameter: results.estimatedDiameters[index],
        pressureLoss: results.pressureLosses[index],
        pressureDrop: results.pressureChanges[index],
        totalPressureDrop: results.sumPressureChanges[index],
        endingPressure: results.endingPressures[index],
      })
    );

    res.status(201).json({
      main: {
        velocity: results.velocity.toFixed(3),
        sumPressureLoss: results.sumPressureLoss.toFixed(),
      },
      segmentsResult: segments,
    });
  } catch (error) {
    res.status(501).json({
      message:
        error || `Помилка в розрахунку, перевірте правильність введених даних!`,
    });
  }
}

export default handler;
