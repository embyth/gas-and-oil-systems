import parse from "html-react-parser";

import ResultsTableStationRows from "./results-table-station-rows";
import ResultsTableSegmentRows from "./results-table-segment-rows";

import { AvailableResultRowType } from "../../utils/const";

const ResultsTableRow = ({
  id,
  parameter,
  marking,
  dimension,
  type,
  results,
  stationData,
  segmentData,
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
  if (type === AvailableResultRowType.SEGMENT) {
    return (
      <ResultsTableSegmentRows results={results} segmentData={segmentData} />
    );
  }

  return results[type][id] ? (
    <tr className="data__table-row">
      <td className="data__table-cell data__table-cell--parameter">
        {parameter}
      </td>
      <td className="data__table-cell data__table-cell--marking">
        {parse(marking)}
      </td>
      <td className="data__table-cell data__table-cell--value">
        {results[type][id]}
      </td>
      <td className="data__table-cell data__table-cell--dimension">
        {parse(dimension)}
      </td>
    </tr>
  ) : null;
};

export default ResultsTableRow;
