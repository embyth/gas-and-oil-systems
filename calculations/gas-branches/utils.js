import { nanoid } from "nanoid";

import { getRandomNumber, getRandomFloatNumber } from "../../utils/common";

export const getBranchesSegmentsConfig = (data) => {
  const { calcType, "routes-amount": segmentsAmount } = data;

  const getSegmentItem = () => ({
    uniqId: nanoid(),
    placeholders: {
      segment: `${getRandomNumber(1, 10)}-${getRandomNumber(1, 20)}`,
      consumption: getRandomFloatNumber(1, 50, 2),
      length: getRandomNumber(50, 300),
      "start-pressure": getRandomNumber(2000, 3000),
    },
  });

  return calcType === `SEGMENT`
    ? [...Array(1)].map(getSegmentItem)
    : [...Array(+segmentsAmount)].map(getSegmentItem);
};

export const adaptBranchesDataToServer = (clientData) => ({
  branchesData: {
    normalDensity: +clientData.branchesData.normalDensity,
    kinematicViscosity: +clientData.branchesData.kinematicViscosity * 10 ** -6,
    segmentsAmount: +clientData.branchesData["routes-amount"],
    highloadCoef: +clientData.branchesData["highload-coef"],
    pressureDrop: +clientData.branchesData["pressure-drop"],
    pressureStart: +clientData.branchesData["pressure-start-low"],
    pressureStartMedium: +clientData.branchesData["pressure-start-medium"],
    pressureEndMedium: +clientData.branchesData["pressure-end-medium"],
    pressureType: clientData.branchesData.pressureType,
    calcType: clientData.branchesData.calcType,
    pipeType: clientData.branchesSegments.pipeType,
  },
  branchesSegments: clientData.branchesSegments.segments.map((segment) => ({
    ...segment,
    name: segment.segment,
    consumption: +segment.consumption,
    length: +segment.length,
    pressureStart: +segment["start-pressure"],
  })),
});
