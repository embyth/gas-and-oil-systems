import { calculatePhysicalProperties } from "../../../calculations/gas-network/physical-properties";

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({
      message: `Метод не підтримується сервером!`,
    });
    return;
  }

  const { body: clientData } = req;

  try {
    const results = calculatePhysicalProperties(clientData);

    res.status(201).json(results);
  } catch (error) {
    res.status(501).json({
      message:
        error || `Помилка в розрахунку, перевірте правильність введених даних!`,
    });
  }
}

export default handler;
