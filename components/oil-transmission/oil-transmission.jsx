import { useContext } from "react";

import ScreenContext from "../../store/screen-context";

import Intro from "../intro/intro";
import IncomeData from "../income-data/income-data";
import IncomeStations from "../income-stations/income-stations";
import Results from "../results/results";

import { arrayToObjectByKey } from "../../utils/common";

const OilTransmission = ({ incomeInputFields, introInfo, screensInfo }) => {
  const { currentScreenId } = useContext(ScreenContext);

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
          />
        );

      case OilTransmissionScreens.STATIONS.id:
        return (
          <IncomeStations nextScreenId={OilTransmissionScreens.RESULTS.id} />
        );

      case OilTransmissionScreens.RESULTS.id:
        return <Results />;

      default:
        throw new Error(`Unexpected screen id! Value recieved: ${screenId}`);
    }
  };

  return getCurrentScreen(currentScreenId);
};

export default OilTransmission;
