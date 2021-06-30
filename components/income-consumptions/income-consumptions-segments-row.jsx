const IncomeConsumptionsSegmentsRow = ({
  data,
  segment,
  basisRoutesProps,
  placeholders,
  onInputChange,
  refItems,
}) => {
  const getRef = (element, columnIndex) => {
    const segmentIndex = segment - 1;
    const columnAmount = 3;
    return refItems.current.splice(
      segmentIndex * columnAmount + columnIndex,
      1,
      element
    );
  };

  return (
    <>
      {basisRoutesProps.isStartOfBasisRoute && (
        <tr className="data__table-row">
          <td className="data__table-cell data__table-cell--full">{`Основний напрям № ${basisRoutesProps.basisRouteNumber}`}</td>
        </tr>
      )}
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--number">
          {`Ділянка ${segment}`}
        </td>
        <td className="data__table-cell data__table-cell--segment">
          <input
            type="text"
            className="data__table-input data__table-input--segment"
            placeholder={placeholders.segment}
            autoComplete="off"
            name="segment"
            required
            value={data.segment}
            ref={(element) => getRef(element, 0)}
            data-segment={segment - 1}
            onChange={onInputChange}
          />
        </td>
        <td className="data__table-cell data__table-cell--length">
          <dfn className="data__input--definition">
            l<sub>{segment}</sub>
          </dfn>
          <input
            type="number"
            className="data__table-input data__table-input--length"
            placeholder={placeholders.length}
            autoComplete="off"
            min="0"
            max="400"
            step="0.1"
            name="length"
            required
            value={data.length}
            ref={(element) => getRef(element, 1)}
            data-segment={segment - 1}
            onChange={onInputChange}
          />
          <span className="data__input--dimension">м</span>
        </td>
        <td className="data__table-cell data__table-cell--consumption-path">
          <dfn className="data__input--definition">
            Q<sub>ш{segment}</sub>
          </dfn>
          <span className="data__table-mock">{data["consumption-path"]}</span>
          <span className="data__input--dimension">
            м<sup>3</sup>/год
          </span>
        </td>
        <td className="data__table-cell data__table-cell--consumption-transit">
          <dfn className="data__input--definition">
            Q<sub>т{segment}</sub>
          </dfn>
          <input
            type="number"
            className="data__table-input data__table-input--consumption-transit"
            placeholder={placeholders["consumption-transit"]}
            autoComplete="off"
            min="0"
            max="500"
            step="0.01"
            name="consumption-transit"
            required
            value={data["consumption-transit"]}
            ref={(element) => getRef(element, 2)}
            data-segment={segment - 1}
            onChange={onInputChange}
          />
          <span className="data__input--dimension">
            м<sup>3</sup>/год
          </span>
        </td>
        <td className="data__table-cell data__table-cell--consumption-calc">
          <dfn className="data__input--definition">
            Q<sub>р{segment}</sub>
          </dfn>
          <span>{data["consumption-calc"]}</span>
          <span className="data__input--dimension">
            м<sup>3</sup>/год
          </span>
        </td>
      </tr>
    </>
  );
};

export default IncomeConsumptionsSegmentsRow;
