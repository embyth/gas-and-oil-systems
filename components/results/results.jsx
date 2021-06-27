import { useEffect, useContext } from "react";

import ScreenContext from "../../store/screen-context";

import ResultsTable from "./results-table";

const Results = ({ resultFields, nextScreenId }) => {
  const { unblockScreen } = useContext(ScreenContext);

  useEffect(() => {
    if (nextScreenId) {
      unblockScreen(nextScreenId);
    }
  }, [nextScreenId, unblockScreen]);

  return (
    <section id="results" className="results">
      <div className="section__container">
        <h2 className="section-heading">{resultFields.RESULTS_HEADING}</h2>

        <div className="data__container data__container--results">
          <ResultsTable resultFields={resultFields} />
        </div>
      </div>
    </section>
  );
};

export default Results;
