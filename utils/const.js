export const ErrorMessage = {
  VALUE_MISSING: `Введіть дані`,
  RANGE_OVERFLOW: `Значення не може бути більше `,
  RANGE_UNDERFLOW: `Значення не може бути менше `,
};

export const AvailableCalculation = {
  OIL_TRANSMISSION: "OIL_TRANSMISSION",
  GAS_TRANSMISSION: "GAS_TRANSMISSION",
  GAS_INDOOR: "GAS_INDOOR",
  GAS_NETWORK: "GAS_NETWORK",
  GAS_BRANCHES: "GAS_BRANCHES",
  GAS_PHYSICS: "GAS_PHYSICS",
};

export const LocalStorage = {
  OIL_TRANSMISSION: {
    INCOME: `${AvailableCalculation.OIL_TRANSMISSION}-INCOME`,
    STATIONS: `${AvailableCalculation.OIL_TRANSMISSION}-STATIONS`,
    RESULTS: `${AvailableCalculation.OIL_TRANSMISSION}-RESULTS`,
  },
  GAS_TRANSMISSION: {
    INCOME: `${AvailableCalculation.GAS_TRANSMISSION}-INCOME`,
    MODAL: `${AvailableCalculation.GAS_TRANSMISSION}-MODAL`,
    RESULTS: `${AvailableCalculation.GAS_TRANSMISSION}-RESULTS`,
  },
  GAS_INDOOR: {
    INCOME: `${AvailableCalculation.GAS_INDOOR}-INCOME`,
    SEGMENTS: `${AvailableCalculation.GAS_INDOOR}-SEGMENTS`,
    RESULTS: `${AvailableCalculation.GAS_INDOOR}-RESULTS`,
  },
  GAS_NETWORK: {
    INCOME: `${AvailableCalculation.GAS_NETWORK}-INCOME`,
    CONSUMPTIONS: `${AvailableCalculation.GAS_NETWORK}-CONSUMPTIONS`,
    CONSUMPTIONS_CONFIG: `${AvailableCalculation.GAS_NETWORK}-CONSUMPTIONS--CONFIG`,
    CONSUMPTIONS_SEGMENTS: `${AvailableCalculation.GAS_NETWORK}-CONSUMPTIONS--SEGMENTS`,
    CIRCLES: `${AvailableCalculation.GAS_NETWORK}-CIRCLES`,
    CIRCLES_CONFIG: `${AvailableCalculation.GAS_NETWORK}-CIRCLES--CONFIG`,
    CIRCLES_SEGMENTS: `${AvailableCalculation.GAS_NETWORK}-CIRCLES--SEGMENTS`,
    RESULTS: `${AvailableCalculation.GAS_NETWORK}-RESULTS`,
  },
  GAS_BRANCHES: {
    INCOME: `${AvailableCalculation.GAS_BRANCHES}-INCOME`,
    SEGMENTS: `${AvailableCalculation.GAS_BRANCHES}-SEGMENTS`,
    RESULTS: `${AvailableCalculation.GAS_BRANCHES}-RESULTS`,
  },
  GAS_PHYSICS: {
    INCOME: `${AvailableCalculation.GAS_PHYSICS}-INCOME`,
    RESULTS: `${AvailableCalculation.GAS_PHYSICS}-RESULTS`,
  },
};

export const AvailableResultRowType = {
  MAIN: `main`,
  EXTRA: `extra`,
  STATION: `station`,
  SEGMENT: `segment`,
  CIRCLE: `circle`,
  BRACNHES: `branches`,
};

export const MediaBreakpoint = {
  MOBILE: 320,
  TABLET: 768,
  DESKTOP: 1280,
};

export const SHAKE_ANIMATION_TIMEOUT = 600;
