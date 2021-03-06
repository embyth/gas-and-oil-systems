import {
  OIL_TRANSMISSION_SCREENS,
  OIL_TRANSMISSION_INTRO_DATA,
} from "./oil-transmission/info";
import { OIL_TRANSMISSION_INPUT_FIELDS } from "./oil-transmission/income";
import { OIL_TRANSMISSION_STATION_FIELDS } from "./oil-transmission/stations";
import { OIL_TRANSMISSION_RESULT_FIELDS } from "./oil-transmission/results";

import {
  GAS_TRANSMISSION_SCREENS,
  GAS_TRANSMISSION_INTRO_DATA,
} from "./gas-transmission/info";
import { GAS_TRANSMISSION_INPUT_FIELDS } from "./gas-transmission/income";
import { GAS_TRANSMISSION_MODAL_FIELDS } from "./gas-transmission/modal";
import { GAS_TRANSMISSION_RESULT_FIELDS } from "./gas-transmission/results";

import { GAS_INDOOR_INTRO_DATA, GAS_INDOOR_SCREENS } from "./gas-indoor/info";
import { GAS_INDOOR_INPUT_FIELDS } from "./gas-indoor/income";
import { GAS_INDOOR_SEGMENT_FIELDS } from "./gas-indoor/segments";
import { GAS_INDOOR_RESULT_FIELDS } from "./gas-indoor/results";

import {
  GAS_NETWORK_INTRO_DATA,
  GAS_NETWORK_SCREENS,
} from "./gas-network/info";
import { GAS_NETWORK_INPUT_FIELDS } from "./gas-network/income";
import { GAS_NETWORK_PHYSICS_RESULT_FIELDS } from "./gas-network/results-physics";
import { GAS_NETWORK_CONSUMPTIONS_INPUT_FIELDS } from "./gas-network/income-consumptions";
import { GAS_NETWORK_CIRCLES_INPUT_FIELDS } from "./gas-network/income-circles";
import { GAS_NETWORK_CIRCLES_RESULT_FIELDS } from "./gas-network/results-circles";

import {
  GAS_BRANCHES_INTRO_DATA,
  GAS_BRANCHES_SCREENS,
} from "./gas-branches/info";
import { GAS_BRANCHES_INPUT_FIELDS } from "./gas-branches/income";
import { GAS_BRANCHES_SEGMENTS_INPUT_FIELDS } from "./gas-branches/income-segments";
import { GAS_BRANCHES_RESULT_FIELDS } from "./gas-branches/results";

import {
  GAS_PHYSICS_INTRO_DATA,
  GAS_PHYSICS_SCREENS,
} from "./gas-physics/info";
import { GAS_PHYSICS_INPUT_FIELDS } from "./gas-physics/income";
import { GAS_PHYSICS_RESULT_FIELDS } from "./gas-physics/results";

import { AvailableCalculation } from "../const";

export const getIndexProps = () => ({
  currentCalculation: null,
  screensInfo: [],
});

export const getDetailsProps = () => ({
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
  incomeInputFields: GAS_INDOOR_INPUT_FIELDS,
  segmentFields: GAS_INDOOR_SEGMENT_FIELDS,
  resultFields: GAS_INDOOR_RESULT_FIELDS,
});

export const getGasNetworkProps = () => ({
  currentCalculation: AvailableCalculation.GAS_NETWORK,
  screensInfo: GAS_NETWORK_SCREENS,
  introInfo: GAS_NETWORK_INTRO_DATA,
  incomeInputFields: GAS_NETWORK_INPUT_FIELDS,
  physicsResults: GAS_NETWORK_PHYSICS_RESULT_FIELDS,
  consumptionsInputFields: GAS_NETWORK_CONSUMPTIONS_INPUT_FIELDS,
  circlesInputFields: GAS_NETWORK_CIRCLES_INPUT_FIELDS,
  circlesResults: GAS_NETWORK_CIRCLES_RESULT_FIELDS,
});

export const getGasBranchesProps = () => ({
  currentCalculation: AvailableCalculation.GAS_BRANCHES,
  screensInfo: GAS_BRANCHES_SCREENS,
  introInfo: GAS_BRANCHES_INTRO_DATA,
  incomeInputFields: GAS_BRANCHES_INPUT_FIELDS,
  incomeSegmentsInputFields: GAS_BRANCHES_SEGMENTS_INPUT_FIELDS,
  branchesResults: GAS_BRANCHES_RESULT_FIELDS,
});

export const getGasPhysicsProps = () => ({
  currentCalculation: AvailableCalculation.GAS_PHYSICS,
  screensInfo: GAS_PHYSICS_SCREENS,
  introInfo: GAS_PHYSICS_INTRO_DATA,
  incomeInputFields: GAS_PHYSICS_INPUT_FIELDS,
  resultFields: GAS_PHYSICS_RESULT_FIELDS,
});
