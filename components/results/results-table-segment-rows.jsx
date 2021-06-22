import { Fragment } from "react";
import parse from "html-react-parser";

const ResultsTableSegmentRows = ({ results, segmentData }) =>
  results.segmentsResult.map((segment) => (
    <Fragment key={segment.uniqId}>
      <tr className="data__table-row data__table-row--segment">
        <td colSpan="4">Ділянка {segment.name}</td>
      </tr>

      {segmentData.map(
        ({
          id: valueId,
          parameter: segmentParameter,
          marking: segmentMarking,
          dimension: segmentdimension,
        }) => (
          <tr
            key={`${valueId}-${segment[valueId]}-${segment.uniqId}`}
            className="data__table-row"
          >
            <td className="data__table-cell data__table-cell--parameter">
              {segmentParameter}
            </td>
            <td className="data__table-cell data__table-cell--marking">
              {parse(segmentMarking)}
            </td>
            <td className="data__table-cell data__table-cell--value">
              {segment[valueId]}
            </td>
            <td className="data__table-cell data__table-cell--dimension">
              {parse(segmentdimension)}
            </td>
          </tr>
        )
      )}
    </Fragment>
  ));

export default ResultsTableSegmentRows;
