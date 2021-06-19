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
  GAS_INDOOR: `GAS_INDOOR`,
  GAS_NETWORK: `GAS_NETWORK`,
};

export const AvailableResultRowType = {
  MAIN: `main`,
  EXTRA: `extra`,
  STATION: `station`,
  SEGMENT: `segment`,
};

export const SHAKE_ANIMATION_TIMEOUT = 600;