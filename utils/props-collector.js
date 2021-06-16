import {
  OIL_TRANSMISSION_SCREENS,
  OIL_TRANSMISSION_INTRO_DATA,
} from "./constants/oil-transmission/info";
import { OIL_TRANSMISSION_INPUT_FIELDS } from "./constants/oil-transmission/income";
import { OIL_TRANSMISSION_STATION_FIELDS } from "./constants/oil-transmission/stations";
import { OIL_TRANSMISSION_RESULT_FIELDS } from "./constants/oil-transmission/results";

import {
  GAS_TRANSMISSION_SCREENS,
  GAS_TRANSMISSION_INTRO_DATA,
} from "./constants/gas-transmission/info";
import { GAS_TRANSMISSION_INPUT_FIELDS } from "./constants/gas-transmission/income";
import { GAS_TRANSMISSION_MODAL_FIELDS } from "./constants/gas-transmission/modal";
import { GAS_TRANSMISSION_RESULT_FIELDS } from "./constants/gas-transmission/results";

import {
  GAS_INDOOR_INTRO_DATA,
  GAS_INDOOR_SCREENS,
} from "./constants/gas-indoor/info";

import {
  GAS_NETWORK_INTRO_DATA,
  GAS_NETWORK_SCREENS,
} from "./constants/gas-network/info";

import { AvailableCalculation } from "./constants/base";

export const getIndexProps = () => ({
  currentCalculation: null,
  screensInfo: [],
});

export const getOilTransmissionProps = () => ({
  currentCalculation: AvailableCalculation.OIL_TRANSMISSION,
  screensInfo: OIL_TRANSMISSION_SCREENS,
  introInfo: OIL_TRANSMISSION_INTRO_DATA,
  incomeInputFields: OIL_TRANSMISSION_INPUT_FIELDS,
  stationFields: OIL_TRANSMISSION_STATION_FIELDS,
  resultFields: OIL_TRANSMISSION_RESULT_FIELDS,
});

export const getGasTransmissionProps = () => ({
  currentCalculation: AvailableCalculation.GAS_TRANSMISSION,
  screensInfo: GAS_TRANSMISSION_SCREENS,
  introInfo: GAS_TRANSMISSION_INTRO_DATA,
  incomeInputFields: GAS_TRANSMISSION_INPUT_FIELDS,
  incomeModalFields: GAS_TRANSMISSION_MODAL_FIELDS,
  resultFields: GAS_TRANSMISSION_RESULT_FIELDS,
});

export const getGasIndoorProps = () => ({
  currentCalculation: AvailableCalculation.GAS_INDOOR,
  screensInfo: GAS_INDOOR_SCREENS,
  introInfo: GAS_INDOOR_INTRO_DATA,
});

export const getGasNetworkProps = () => ({
  currentCalculation: AvailableCalculation.GAS_NETWORK,
  screensInfo: GAS_NETWORK_SCREENS,
  introInfo: GAS_NETWORK_INTRO_DATA,
});
