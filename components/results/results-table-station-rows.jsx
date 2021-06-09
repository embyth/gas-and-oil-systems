import { Fragment } from "react";

const ResultsTableStationRows = ({ results, stationData }) => {
  const getStationNames = (stationIndex) => {
    if (stationIndex === 0) {
      return [`ГНПС-1`, `НПС-2`];
    }

    if (stationIndex === results.stations.length - 1) {
      return [`НПС-${stationIndex + 1}`, `КП`];
    }

    return [`НПС-${stationIndex + 1}`, `НПС-${stationIndex + 2}`];
  };

  return results.stations.map((station, index) => {
    const [stationFrom, stationTo] = getStationNames(index);

    return (
      <Fragment key={`${stationFrom}-${stationTo}`}>
        <tr className="data__table-row data__table-row--station">
          <td colSpan="4">{`${stationFrom} - ${stationTo}`}</td>
        </tr>

        {stationData.map(
          ({
            id: valueId,
            parameter: stationParameter,
            marking: stationMarking,
            demention: stationDemention,
          }) => (
            <tr
              key={`${valueId}-${station[valueId]}-${stationFrom}-${stationTo}`}
              className="data__table-row"
            >
              <td className="data__table-cell data__table-cell--parameter">
                {stationParameter}
              </td>
              <td className="data__table-cell data__table-cell--marking">
                {stationMarking}
              </td>
              <td className="data__table-cell data__table-cell--value">
                {station[valueId]}
              </td>
              <td className="data__table-cell data__table-cell--dimension">
                {stationDemention}
              </td>
            </tr>
          )
        )}
      </Fragment>
    );
  });
};

export default ResultsTableStationRows;
