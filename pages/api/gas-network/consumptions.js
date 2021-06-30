import { nanoid } from "nanoid";

import { getRandomNumber, getRandomFloatNumber } from "../../../utils/common";

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({
      message: `Метод не підтримується сервером!`,
    });
    return;
  }

  const { body: clientData } = req;

  try {
    const totalSegments = Object.values(clientData).reduce(
      (prev, item) => prev + +item,
      0
    );

    const routesBreakepoints = [];
    Object.values(clientData).reduce((prev, current) => {
      routesBreakepoints.push(prev + +current);

      return prev + +current;
    }, 0);

    const segmentsConfig = [...Array(totalSegments)].map(
      (item, index) => ({
        uniqId: nanoid(),
        placeholders: {
          segment: `${getRandomNumber(1, 20)}-${getRandomNumber(1, 20)}`,
          length: getRandomNumber(90, 300),
          "consumption-transit": getRandomFloatNumber(0, 100, 2),
        },
        basisRoutesProps: {
          isStartOfBasisRoute:
            index === 0 || routesBreakepoints.includes(index),
          basisRouteNumber:
            index === 0
              ? 1
              : routesBreakepoints.findIndex(
                  (breakpoint) => breakpoint === index
                ) + 2,
        },
      }),
      {}
    );

    res.status(201).json(segmentsConfig);
  } catch (error) {
    res.status(501).json({
      message:
        error || `Помилка в розрахунку, перевірте правильність введених даних!`,
    });
  }
}

export default handler;
