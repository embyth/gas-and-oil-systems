import { useContext } from "react";

import ScreenContext from "../../store/screen-context";

import Intro from "../intro/intro";
import IncomeData from "../income-data/income-data";
import IncomeConsumptions from "../income-consumptions/income-consumptions";
import IncomeCircles from "../income-circles/income-circles";
import Results from "../results/results";

import { arrayToObjectByKey } from "../../utils/common";

const GasNetwork = ({
  screensInfo,
  introInfo,
  incomeInputFields,
  physicsResults,
  consumptionsInputFields,
  circlesInputFields,
  circlesResults,
}) => {
  const { currentScreenId } = useContext(ScreenContext);

  const sendIncomeData = async (inputData, onSuccess, onError) => {
    const response = await fetch(`/api/gas-network/physical-properties`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });

    const data = await response.json();

    if (!response.ok) {
      onError(data);
      return;
    }

    onSuccess(data);
  };

  const sendSegmentsData = async (inputData, onSuccess, onError) => {
    const response = await fetch(`/api/gas-network/segments-config`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });

    const data = await response.json();

    if (!response.ok) {
      onError(data);
      return;
    }

    onSuccess(data);
  };

  const sendCirclesData = async (inputData, onSuccess, onError) => {
    const response = await fetch(`/api/gas-network/circles`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });

    const data = await response.json();

    if (!response.ok) {
      onError(data);
      return;
    }

    onSuccess(data);
  };

  const getCurrentScreen = (screenId) => {
    const GasNetworkScreens = arrayToObjectByKey(screensInfo, `id`);

    switch (screenId) {
      case GasNetworkScreens.INTRO.id:
        return (
          <Intro
            info={introInfo}
            nextScreenId={GasNetworkScreens.INCOME_DATA.id}
          />
        );

      case GasNetworkScreens.INCOME_DATA.id:
        return (
          <IncomeData
            incomeInputFields={incomeInputFields}
            nextScreenId={GasNetworkScreens.RESULTS_PHYSICS.id}
            sendIncomeData={sendIncomeData}
          />
        );

      case GasNetworkScreens.RESULTS_PHYSICS.id:
        return (
          <Results
            resultFields={physicsResults}
            nextScreenId={GasNetworkScreens.INCOME_CONSUMPTION.id}
          />
        );

      case GasNetworkScreens.INCOME_CONSUMPTION.id:
        return (
          <IncomeConsumptions
            consumptionsInputFields={consumptionsInputFields}
            nextScreenId={GasNetworkScreens.INCOME_NETWORK.id}
            sendSegmentsData={sendSegmentsData}
          />
        );

      case GasNetworkScreens.INCOME_NETWORK.id:
        return (
          <IncomeCircles
            circlesInputFields={circlesInputFields}
            nextScreenId={GasNetworkScreens.RESULTS_NETWORK.id}
            sendSegmentsData={sendSegmentsData}
            sendCirclesData={sendCirclesData}
          />
        );

      case GasNetworkScreens.RESULTS_NETWORK.id:
        return <Results resultFields={circlesResults} />;

      default:
        throw new Error(`Unexpected screen id! Value recieved: ${screenId}`);
    }
  };

  return getCurrentScreen(currentScreenId);
};

export default GasNetwork;
