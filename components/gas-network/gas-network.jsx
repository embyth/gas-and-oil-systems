import { useContext } from "react";

import ScreenContext from "../../store/screen-context";

import Intro from "../intro/intro";
import IncomeData from "../income-data/income-data";
import Results from "../results/results";

import { arrayToObjectByKey } from "../../utils/common";

const GasNetwork = ({
  currentCalculation,
  screensInfo,
  introInfo,
  incomeInputFields,
  physicsResults,
}) => {
  const { currentScreenId } = useContext(ScreenContext);

  const getCurrentScreen = (screenId) => {
    const GasNetworkScreens = arrayToObjectByKey(screensInfo, `id`);

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
            currentCalculation={currentCalculation}
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

      default:
        throw new Error(`Unexpected screen id! Value recieved: ${screenId}`);
    }
  };

  return getCurrentScreen(currentScreenId);
};

export default GasNetwork;
