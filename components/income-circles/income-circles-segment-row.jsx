const IncomeCirclesSegmentRow = ({
  data,
  segment,
  segmentProps,
  placeholders,
  onInputChange,
  refItems,
}) => {
  const getRef = (element, columnIndex) => {
    const segmentIndex = segment - 1;
    const columnAmount = 5;
    return refItems.current.splice(
      segmentIndex * columnAmount + columnIndex,
      1,
      element
    );
  };

  return (
    <>
      {segmentProps.isStartOfCircle && (
        <tr className="data__table-row">
          <td className="data__table-cell data__table-cell--full">{`Кільце № ${segmentProps.circleNumber}`}</td>
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
        <td className="data__table-cell data__table-cell--consumption-calc">
          <dfn className="data__input--definition">
            Q<sub>р{segment}</sub>
          </dfn>
          <input
            type="number"
            className="data__table-input data__table-input--consumption-calc"
            placeholder={placeholders["consumption-calc"]}
            autoComplete="off"
            min="-300"
            max="300"
            step="0.001"
            name="consumption-calc"
            required
            value={data["consumption-calc"]}
            ref={(element) => getRef(element, 1)}
            data-segment={segment - 1}
            onChange={onInputChange}
          />
          <span className="data__input--dimension">
            м<sup>3</sup>/год
          </span>
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
            ref={(element) => getRef(element, 2)}
            data-segment={segment - 1}
            onChange={onInputChange}
          />
          <span className="data__input--dimension">м</span>
        </td>
        <td className="data__table-cell data__table-cell--neighbor-circle-num">
          <dfn className="data__input--definition">
            n<sub>ск{segment}</sub>
          </dfn>
          <input
            type="number"
            className="data__table-input data__table-input--neighbor-circle-num"
            placeholder={placeholders["neighbor-circle-num"]}
            autoComplete="off"
            min="0"
            max={segmentProps.circleAmount}
            step="0"
            name="neighbor-circle-num"
            required
            value={data["neighbor-circle-num"]}
            ref={(element) => getRef(element, 3)}
            data-segment={segment - 1}
            onChange={onInputChange}
          />
          <span className="data__input--dimension" />
        </td>
        <td className="data__table-cell data__table-cell--basis-route-num">
          <dfn className="data__input--definition">
            n<sub>он{segment}</sub>
          </dfn>
          <input
            type="number"
            className="data__table-input data__table-input--basis-route-num"
            placeholder={placeholders["basis-route-num"]}
            autoComplete="off"
            min="1"
            max={segmentProps.basisRoutesAmount}
            step="0"
            name="basis-route-num"
            required
            value={data["basis-route-num"]}
            ref={(element) => getRef(element, 4)}
            data-segment={segment - 1}
            onChange={onInputChange}
          />
          <span className="data__input--dimension" />
        </td>
      </tr>
    </>
  );
};

export default IncomeCirclesSegmentRow;
