import { Fragment } from "react";
import parse from "html-react-parser";

import ResultsTableSegmentRows from "./results-table-segment-rows";

const ResultsTableCircleRows = ({ results, circleFields }) => {
  const circlesFieldsByPressure =
    results.pressureType === `LOW`
      ? circleFields.lowPressure
      : circleFields.mediumPressure;

  return results.circles.map((circle, index) => (
    <Fragment key={circle.uniqId}>
      <tr className="data__table-row data__table-row--circle">
        <td colSpan="4">Кільце №{index + 1}</td>
      </tr>

      {circlesFieldsByPressure.map(
        ({ type, id, parameter, marking, dimension, data }) =>
          type === `circle` ? (
            <tr
              key={`${id}-${circle[id]}-${circle.uniqId}`}
              className="data__table-row"
            >
              <td className="data__table-cell data__table-cell--parameter">
                {parameter}
              </td>
              <td className="data__table-cell data__table-cell--marking">
                {parse(marking)}
              </td>
              <td className="data__table-cell data__table-cell--value">
                {circle[id]}
              </td>
              <td className="data__table-cell data__table-cell--dimension">
                {parse(dimension)}
              </td>
            </tr>
          ) : (
            <ResultsTableSegmentRows
              key={`${id}-${circle.uniqId}`}
              segments={circle.segments}
              segmentFields={data}
            />
          )
      )}
    </Fragment>
  ));
};

export default ResultsTableCircleRows;
