import { useContext } from "react";

import ScreenContext from "../../store/screen-context";

import Intro from "../intro/intro";
import IncomeBranches from "../income-branches/income-branches";
import IncomeBranchesSegments from "../income-branches/income-branches-segments";
import Results from "../results/results";

import { arrayToObjectByKey } from "../../utils/common";

const GasBranches = ({
  screensInfo,
  introInfo,
  incomeInputFields,
  incomeSegmentsInputFields,
  branchesResults,
}) => {
  const { currentScreenId } = useContext(ScreenContext);

  const sendIncomeData = async (inputData, onSuccess, onError) => {
    const response = await fetch(`/api/gas-branches/segments`, {
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

  const sendBranchesData = async (inputData, onSuccess, onError) => {
    const response = await fetch(`/api/gas-branches/calculate`, {
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
    const GasBranchesScreens = arrayToObjectByKey(screensInfo, `id`);

    switch (screenId) {
      case GasBranchesScreens.INTRO.id:
        return (
          <Intro
            info={introInfo}
            nextScreenId={GasBranchesScreens.INCOME_DATA.id}
          />
        );

      case GasBranchesScreens.INCOME_DATA.id:
        return (
          <IncomeBranches
            incomeInputFields={incomeInputFields}
            nextScreenId={GasBranchesScreens.INCOME_SEGMENTS.id}
            sendIncomeData={sendIncomeData}
          />
        );

      case GasBranchesScreens.INCOME_SEGMENTS.id:
        return (
          <IncomeBranchesSegments
            segmentsInputFields={incomeSegmentsInputFields}
            nextScreenId={GasBranchesScreens.RESULTS_BRANCHES.id}
            sendBranchesData={sendBranchesData}
          />
        );

      case GasBranchesScreens.RESULTS_BRANCHES.id:
        return <Results resultFields={branchesResults} />;

      default:
        throw new Error(`Unexpected screen id! Value recieved: ${screenId}`);
    }
  };

  return getCurrentScreen(currentScreenId);
};

export default GasBranches;
