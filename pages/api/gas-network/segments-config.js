import {
  getConsumptionsSegmentsConfig,
  getCirclesSegmentsConfig,
} from "../../../calculations/gas-network/utils";

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({
      message: `Метод не підтримується сервером!`,
    });
    return;
  }

  const { body: clientData } = req;

  try {
    const { type } = clientData;

    delete clientData.type;

    const config =
      type === `consumptions`
        ? getConsumptionsSegmentsConfig(clientData)
        : getCirclesSegmentsConfig(clientData);

    res.status(201).json(config);
  } catch (error) {
    res.status(501).json({
      message:
        error || `Помилка в розрахунку, перевірте правильність введених даних!`,
    });
  }
}

export default handler;
