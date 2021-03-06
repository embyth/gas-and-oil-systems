import { nanoid } from "nanoid";

import { getRandomNumber, getRandomFloatNumber } from "../../utils/common";
import { PressureType } from "./const";

export const adaptIncomeDataToServer = (clientData) => ({
  n: +clientData["inhibitants-amount"],
  t0: +clientData["temperature-for-heating"],
  tv: +clientData["temperature-for-venting"],
  tom: +clientData["temperature-avg-heating"],
  tvn: +clientData["temperature-inside"],
  n0: +clientData["heating-duration"],
  nkor: +clientData["cows-amount"],
  nkon: +clientData["horses-amount"],
  nsvin: +clientData["pigs-amount"],
  al1: +clientData["devices-gpcvg"] / 100,
  al2: +clientData["devices-gpvng"] / 100,
  al3: +clientData["devices-gp"] / 100,
  be1: +clientData["heating-device-gp"] / 100,
  be2: +clientData["heating-device-iok"] / 100,
  a1: +clientData["built-before-1985"] / 100,
  a2: +clientData["built-after-1985"] / 100,
  b1: +clientData["floor-1-2"] / 100,
  b2: +clientData["floor-3-4"] / 100,
  b3: +clientData["floor-high"] / 100,
});

export const adaptCirclesDataToServer = (clientData) => {
  const circlesConfig = {
    segmentsInCircle: Object.entries(clientData.circlesConfig)
      .filter(([key]) => key.includes("segments-amount-circle"))
      .map(([, value]) => +value),
    basisRoutesLengths: Object.entries(clientData.circlesConfig)
      .filter(([key]) => key.includes("length-basis-route"))
      .map(([, value]) => +value),
  };

  const circlesBreakpoints = [0];
  circlesConfig.segmentsInCircle.reduce((prev, item) => {
    circlesBreakpoints.push(prev + item);
    return prev + item;
  }, 0);

  return {
    physicsProps: {
      normalDensity: +clientData.physicsProps.normalDensity,
      kinematicViscosity:
        +clientData.physicsProps.kinematicViscosity * 10 ** -6,
    },
    networkConfig: {
      pipeType: clientData.networkConfig.pipeType,
      pressureType: clientData.networkConfig.pressureType,
      pressureStart:
        clientData.networkConfig.pressureType === "LOW"
          ? +clientData.networkConfig["pressure-start-low"]
          : +clientData.networkConfig["pressure-start-medium"],
      pressureDrop:
        clientData.networkConfig.pressureType === "LOW" &&
        +clientData.networkConfig["pressure-drop"],
      pressureEnd:
        clientData.networkConfig.pressureType === "MEDIUM" &&
        +clientData.networkConfig["pressure-end"],
      kirghofScale: +clientData.networkConfig["kirghof-scale"],
      highloadCoef: +clientData.networkConfig["highload-coef"],
      circlesAmount: +clientData.networkConfig["circles-amount"],
      basisRoutesAmount: +clientData.networkConfig["basis-routes"],
    },
    circlesConfig,
    circlesSegments: [
      ...Array(+clientData.networkConfig["circles-amount"]),
    ].map((circle, circleIndex) => ({
      segments: clientData.circlesSegments
        .slice(
          circlesBreakpoints[circleIndex],
          circlesBreakpoints[circleIndex + 1]
        )
        .map((item) => ({
          segmentProps: item.segmentProps,
          segment: item.segment,
          uniqId: item.uniqId,
          calcConsumption: +item["consumption-calc"],
          neighborCircleNum: +item["neighbor-circle-num"],
          basisRouteNum: +item["basis-route-num"],
          length: +item.length,
        })),
    })),
  };
};

export const getConsumptionsSegmentsConfig = (clientData) => {
  const totalSegments = Object.values(clientData).reduce(
    (prev, item) => prev + +item,
    0
  );

  const routesBreakepoints = [0];
  Object.values(clientData).reduce((prev, current) => {
    routesBreakepoints.push(prev + +current);

    return prev + +current;
  }, 0);

  return [...Array(totalSegments)].map(
    (item, index) => ({
      uniqId: nanoid(),
      placeholders: {
        segment: `${getRandomNumber(1, 20)}-${getRandomNumber(1, 20)}`,
        length: getRandomNumber(90, 300),
        "consumption-transit": getRandomFloatNumber(0, 100, 2),
      },
      basisRoutesProps: {
        isStartOfBasisRoute: routesBreakepoints.includes(index),
        basisRouteNumber:
          routesBreakepoints.findIndex((breakpoint) => breakpoint === index) +
          1,
      },
    }),
    {}
  );
};

export const getCirclesSegmentsConfig = (clientData) => {
  const segments = Object.entries(clientData).reduce(
    (acc, [key, value]) =>
      key.includes("segments-amount-circle")
        ? { ...acc, [key]: +value }
        : { ...acc },
    {}
  );

  const basisRoutes = Object.entries(clientData).reduce(
    (acc, [key, value]) =>
      key.includes("length-basis-route")
        ? { ...acc, [key]: +value }
        : { ...acc },
    {}
  );

  const totalSegments = Object.values(segments).reduce(
    (acc, value) => acc + value,
    0
  );

  const circlesBreakpoints = [0];
  Object.values(segments).reduce((prev, current) => {
    circlesBreakpoints.push(prev + +current);

    return prev + +current;
  }, 0);

  return [...Array(totalSegments)].map(
    (item, index) => ({
      uniqId: nanoid(),
      placeholders: {
        segment: `${getRandomNumber(1, 20)}-${getRandomNumber(1, 20)}`,
        "consumption-calc": getRandomFloatNumber(-50, 100, 2),
        length: getRandomNumber(90, 300),
        "neighbor-circle-num": getRandomNumber(0, Object.keys(segments).length),
        "basis-route-num": getRandomNumber(1, Object.keys(basisRoutes).length),
      },
      segmentProps: {
        isStartOfCircle: circlesBreakpoints.includes(index),
        circleNumber:
          circlesBreakpoints.findIndex((breakpoint) => breakpoint === index) +
          1,
        circlesAmount: Object.keys(segments).length,
        basisRoutesAmount: Object.keys(basisRoutes).length,
      },
    }),
    {}
  );
};

export const fixResultsValues = (results, pressureType) =>
  pressureType === PressureType.LOW
    ? results.map((item) => ({
        ...item,
        segments: item.segments.map((segment) => ({
          ...segment,
          calcConsumption: segment.calcConsumption.toFixed(2),
          hydraulicTilt: segment.hydraulicTilt.toFixed(2),
          deltaPressureDrop: segment.deltaPressureDrop.toFixed(2),
          averageHydraulicInclination:
            segment.averageHydraulicInclination.toFixed(2),
        })),
        sumPressureDrop: item.sumPressureDrop.toFixed(3),
        absoluteSumPressureDrop: item.absoluteSumPressureDrop.toFixed(1),
        deltaKirghof: item.deltaKirghof.toFixed(2),
        uniqId: nanoid(),
      }))
    : results.map((item) => ({
        ...item,
        segments: item.segments.map((segment) => ({
          ...segment,
          calcConsumption: segment.calcConsumption.toFixed(2),
          hydraulicTilt: (segment.hydraulicTilt * 10 ** 5).toFixed(2),
          averageHydraulicInclination: (
            segment.averageHydraulicInclination *
            10 ** 5
          ).toFixed(2),
          pressureOut: (segment.pressureOut * 10 ** 6).toFixed(),
        })),
        deltaKirghof: item.deltaKirghof.toFixed(2),
        uniqId: nanoid(),
      }));
