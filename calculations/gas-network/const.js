export const AnnualNormsOfHeatConsumptionFor = {
  GP_CGP: 2800,
  GP_VNG: 8000,
  GP: 4600,
  COWS: 8820,
  HORSES: 2120,
  PIGS: 4620,
};

export const PressureType = {
  LOW: `LOW`,
  MEDIUM: `MEDIUM`,
};

export const GAS_CONSUMPTION_FOR_HEATING_COEF = 1800;
export const NORM_OF_TOTAL_LIVING_SPACE_PER_PERSON = 18;
export const GAS_FURNACES_EFFICIENCY = 0.6;
export const BOILER_EFFICIENCY = 0.8;
export const NORMATIVE_TERM_FOR_VENTILATION = 16;
export const GAS_CONSUMPTION_FOR_HEATING_PUBLIC_BUILDINGS_COEF = 0.25;

export const IncreasedIndicatorsOfMaximumHeatFlux = {
  OLD: {
    "1-2": [
      {
        temp: -5,
        heatFlux: 148,
      },
      {
        temp: -10,
        heatFlux: 154,
      },
      {
        temp: -15,
        heatFlux: 160,
      },
      {
        temp: -20,
        heatFlux: 205,
      },
      {
        temp: -25,
        heatFlux: 213,
      },
      {
        temp: -30,
        heatFlux: 230,
      },
      {
        temp: -35,
        heatFlux: 234,
      },
    ],
    "3-4": [
      {
        temp: -5,
        heatFlux: 95,
      },
      {
        temp: -10,
        heatFlux: 102,
      },
      {
        temp: -15,
        heatFlux: 109,
      },
      {
        temp: -20,
        heatFlux: 117,
      },
      {
        temp: -25,
        heatFlux: 126,
      },
      {
        temp: -30,
        heatFlux: 134,
      },
      {
        temp: -35,
        heatFlux: 144,
      },
    ],
    "5+": [
      {
        temp: -5,
        heatFlux: 65,
      },
      {
        temp: -10,
        heatFlux: 70,
      },
      {
        temp: -15,
        heatFlux: 77,
      },
      {
        temp: -20,
        heatFlux: 79,
      },
      {
        temp: -25,
        heatFlux: 86,
      },
      {
        temp: -30,
        heatFlux: 88,
      },
      {
        temp: -35,
        heatFlux: 98,
      },
    ],
  },
  NEW: {
    "1-2": [
      {
        temp: -5,
        heatFlux: 145,
      },
      {
        temp: -10,
        heatFlux: 152,
      },
      {
        temp: -15,
        heatFlux: 159,
      },
      {
        temp: -20,
        heatFlux: 166,
      },
      {
        temp: -25,
        heatFlux: 173,
      },
      {
        temp: -30,
        heatFlux: 177,
      },
      {
        temp: -35,
        heatFlux: 180,
      },
    ],
    "5+": [
      {
        temp: -5,
        heatFlux: 74,
      },
      {
        temp: -10,
        heatFlux: 80,
      },
      {
        temp: -15,
        heatFlux: 86,
      },
      {
        temp: -20,
        heatFlux: 91,
      },
      {
        temp: -25,
        heatFlux: 97,
      },
      {
        temp: -30,
        heatFlux: 101,
      },
      {
        temp: -35,
        heatFlux: 103,
      },
    ],
  },
};

export const PipeType = {
  STEEL: `steel`,
  POLY: `poly`,
};

export const ROUGHNESS = {
  STEEL: 0.01,
  POLY: 0.002,
};

export const DIAMETERS = {
  STEEL: {
    "38x3": 3.2,
    "42.3x3.2": 3.59,
    "45x3": 3.9,
    "48x3.5": 4.1,
    "57x3": 5.1,
    "76x3": 7,
    "89x3": 8.3,
    "108x3": 10.2,
    "133x4": 12.5,
    "159x4.5": 15,
    "219x5": 20.9,
    "273x5": 26.3,
    "325x5": 31.5,
    "426x6": 41.4,
  },
  POLY: {
    "40x3.7": 3.26,
    "50x2.9": 4.42,
    "63x3.6": 5.58,
    "75x4.3": 6.64,
    "90x5.2": 7.96,
    "110x6.3": 9.74,
    "125x7.1": 11.08,
    "140x8": 12.4,
    "160x9.1": 14.18,
    "180x10.3": 15.94,
    "200x11.4": 17.72,
    "225x12.8": 19.94,
    "250x14.2": 22.16,
    "280x15.9": 24.82,
    "315x17.9": 27.92,
    "355x20.1": 31.48,
    "400x22.7": 35.46,
    "450x25.5": 39.9,
    "500x28.4": 44.32,
    "560x31.7": 49.66,
    "630x35.7": 55.86,
  },
};
