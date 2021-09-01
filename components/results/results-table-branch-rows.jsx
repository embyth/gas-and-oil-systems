import { Fragment } from "react";
import parse from "html-react-parser";

const ResultsTableBranchRows = ({ results, branchFields }) => {
  const branchFieldsByPressure =
    results.pressureType === `LOW`
      ? branchFields.lowPressure
      : branchFields.mediumPressure;

  return results.segments.map((segment) => (
    <Fragment key={segment.uniqId}>
      <tr className="data__table-row data__table-row--segment">
        <td colSpan="4">Ділянка {segment.name}</td>
      </tr>

      {branchFieldsByPressure.map(({ id, parameter, marking, dimension }) => (
        <tr
          key={`${id}-${segment[id]}-${segment.uniqId}`}
          className="data__table-row"
        >
          <td className="data__table-cell data__table-cell--parameter">
            {parameter}
          </td>
          <td className="data__table-cell data__table-cell--marking">
            {parse(marking)}
          </td>
          <td className="data__table-cell data__table-cell--value">
            {segment[id]}
          </td>
          <td className="data__table-cell data__table-cell--dimension">
            {parse(dimension)}
          </td>
        </tr>
      ))}
    </Fragment>
  ));
};

export default ResultsTableBranchRows;
