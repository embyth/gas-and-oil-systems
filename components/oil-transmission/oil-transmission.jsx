import { useContext } from "react";

import ScreenContext from "../../store/screen-context";

import Intro from "../intro/intro";
import IncomeData from "../income-data/income-data";
import IncomeStations from "../income-stations/income-stations";
import Results from "../results/results";

import { arrayToObjectByKey } from "../../utils/common";

const OilTransmission = ({
  currentCalculation,
  screensInfo,
  introInfo,
  incomeInputFields,
  stationFields,
  resultFields,
}) => {
  const { currentScreenId } = useContext(ScreenContext);

  const sendIncomeData = async (inputData, onSuccess, onError) => {
    const response = await fetch(`/api/oil-transmission/first`, {
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

  const sendStationsData = async (data) =>
    fetch(`/api/oil-transmission/second`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

  const getCurrentScreen = (screenId) => {
    const OilTransmissionScreens = arrayToObjectByKey(screensInfo, `id`);

    switch (screenId) {
      case OilTransmissionScreens.INTRO.id:
        return (
          <Intro
            info={introInfo}
            nextScreenId={OilTransmissionScreens.INCOME_DATA.id}
          />
        );

      case OilTransmissionScreens.INCOME_DATA.id:
        return (
          <IncomeData
            incomeInputFields={incomeInputFields}
            nextScreenId={OilTransmissionScreens.STATIONS.id}
            currentCalculation={currentCalculation}
            sendIncomeData={sendIncomeData}
          />
        );

      case OilTransmissionScreens.STATIONS.id:
        return (
          <IncomeStations
            nextScreenId={OilTransmissionScreens.RESULTS.id}
            stationFields={stationFields}
            currentCalculation={currentCalculation}
            sendStationsData={sendStationsData}
          />
        );

      case OilTransmissionScreens.RESULTS.id:
        return <Results resultFields={resultFields} />;

      default:
        throw new Error(`Unexpected screen id! Value recieved: ${screenId}`);
    }
  };

  return getCurrentScreen(currentScreenId);
};

export default OilTransmission;
