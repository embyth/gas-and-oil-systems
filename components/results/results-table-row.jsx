import ResultsTableStationRows from "./results-table-station-rows";

import { AvailableResultRowType } from "../../utils/constants/base";

const ResultsTableRow = ({
  id,
  parameter,
  marking,
  demention,
  type,
  results,
  stationData,
  isFullRow,
}) => {
  if (isFullRow) {
    return (
      <tr className="data__table-row data__table-row--full">
        <td colSpan="4">{parameter}</td>
      </tr>
    );
  }

  if (type === AvailableResultRowType.STATION) {
    return (
      <ResultsTableStationRows results={results} stationData={stationData} />
    );
  }

  return results[type][id] ? (
    <tr className="data__table-row">
      <td className="data__table-cell data__table-cell--parameter">
        {parameter}
      </td>
      <td className="data__table-cell data__table-cell--marking">{marking}</td>
      <td className="data__table-cell data__table-cell--value">
        {results[type][id]}
      </td>
      <td className="data__table-cell data__table-cell--dimension">
        {demention}
      </td>
    </tr>
  ) : null;
};

export default ResultsTableRow;
