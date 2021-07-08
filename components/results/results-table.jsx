import { useContext } from "react";

import CalculationDataContext from "../../store/calculation-data-context";

import ResultsTableRow from "./results-table-row";

const ResultsTable = ({ resultFields }) => {
  const { getResults } = useContext(CalculationDataContext);
  const results = getResults();

  const { RESULTS_HEAD, RESULTS } = resultFields;

  return (
    <table className="data__table data__table--results">
      <thead className="data__table-head">
        <tr className="data__table-row">
          {RESULTS_HEAD.map(({ id, label }) => (
            <td key={id} className={`data__table-cell data__table-cell--${id}`}>
              {label}
            </td>
          ))}
        </tr>
      </thead>
      <tbody className="data__table-body">
        {RESULTS.map(
          ({ parameter, dimension, marking, isFullRow, id, type, data }) => (
            <ResultsTableRow
              key={id}
              id={id}
              parameter={parameter}
              marking={marking}
              dimension={dimension}
              isFullRow={isFullRow}
              type={type}
              typeData={data}
              results={results}
            />
          )
        )}
      </tbody>
    </table>
  );
};

export default ResultsTable;
