import { useContext } from "react";

import ScreenContext from "../../store/screen-context";

import Intro from "../intro/intro";
import IncomeData from "../income-data/income-data";
import Results from "../results/results";

import { arrayToObjectByKey } from "../../utils/common";

const GasTransmission = ({
  screensInfo,
  introInfo,
  incomeInputFields,
  incomeModalFields,
  resultFields,
}) => {
  const { currentScreenId } = useContext(ScreenContext);

  const sendIncomeData = async (inputData, onSuccess, onError) => {
    const response = await fetch(`/api/gas-transmission/calculate`, {
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
    const GasTransmissionScreens = arrayToObjectByKey(screensInfo, `id`);

    switch (screenId) {
      case GasTransmissionScreens.INTRO.id:
        return (
          <Intro
            info={introInfo}
            nextScreenId={GasTransmissionScreens.INCOME_DATA.id}
          />
        );

      case GasTransmissionScreens.INCOME_DATA.id:
        return (
          <IncomeData
            incomeInputFields={incomeInputFields}
            incomeModalFields={incomeModalFields}
            nextScreenId={GasTransmissionScreens.RESULTS.id}
            sendIncomeData={sendIncomeData}
          />
        );

      case GasTransmissionScreens.RESULTS.id:
        return <Results resultFields={resultFields} />;

      default:
        throw new Error(`Unexpected screen id! Value recieved: ${screenId}`);
    }
  };

  return getCurrentScreen(currentScreenId);
};

export default GasTransmission;
