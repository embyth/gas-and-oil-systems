import { useContext } from "react";

import ScreenContext from "../../store/screen-context";

import Intro from "../intro/intro";
import IncomeData from "../income-data/income-data";
import IncomeSegments from "../income-segments/income-segments";
import Results from "../results/results";

import { arrayToObjectByKey } from "../../utils/common";

const GasIndoor = ({
  screensInfo,
  introInfo,
  incomeInputFields,
  segmentFields,
  resultFields,
}) => {
  const { currentScreenId } = useContext(ScreenContext);

  const sendIncomeData = async (inputData, onSuccess, onError) => {
    const response = await fetch(`/api/gas-indoor/first`, {
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

  const sendSegmentsData = async (inputData) =>
    fetch(`/api/gas-indoor/second`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });

  const getCurrentScreen = (screenId) => {
    const GasIndoorScreens = arrayToObjectByKey(screensInfo, `id`);

    switch (screenId) {
      case GasIndoorScreens.INTRO.id:
        return (
          <Intro
            info={introInfo}
            nextScreenId={GasIndoorScreens.INCOME_DATA.id}
          />
        );

      case GasIndoorScreens.INCOME_DATA.id:
        return (
          <IncomeData
            incomeInputFields={incomeInputFields}
            nextScreenId={GasIndoorScreens.SEGMENTS.id}
            sendIncomeData={sendIncomeData}
          />
        );

      case GasIndoorScreens.SEGMENTS.id:
        return (
          <IncomeSegments
            segmentFields={segmentFields}
            nextScreenId={GasIndoorScreens.RESULTS.id}
            sendSegmentsData={sendSegmentsData}
          />
        );

      case GasIndoorScreens.RESULTS.id:
        return <Results resultFields={resultFields} />;

      default:
        throw new Error(`Unexpected screen id! Value recieved: ${screenId}`);
    }
  };

  return getCurrentScreen(currentScreenId);
};

export default GasIndoor;
