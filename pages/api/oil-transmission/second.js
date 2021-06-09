import { secondCalculation } from "../../../calculations/oil-transmission/algorithm";

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({
      message: `Метод не підтримується сервером!`,
    });
    return;
  }

  const { body: cleintData } = req;

  try {
    const results = secondCalculation(cleintData);

    res.status(201).json(results);
  } catch (error) {
    res.status(501).json({
      message:
        error || `Помилка в розрахунку, перевірте правильність введених даних!`,
    });
  }
}

export default handler;
