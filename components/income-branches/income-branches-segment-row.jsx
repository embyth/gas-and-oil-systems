import { PressureType, CalcType } from "../../calculations/gas-branches/const";

const IncomeBranchesSegmentRow = ({
  data,
  segment,
  placeholders,
  refItems,
  pressureType,
  calcType,
  onInputChange,
}) => {
  const getRef = (element, columnIndex) => {
    const segmentIndex = segment - 1;
    const columnAmount = 4;
    return refItems.current.splice(
      segmentIndex * columnAmount + columnIndex,
      1,
      element
    );
  };

  return (
    <>
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
        <td className="data__table-cell data__table-cell--consumption">
          <dfn className="data__input--definition">
            Q<sub>{segment}</sub>
          </dfn>
          <input
            type="number"
            className="data__table-input data__table-input--consumption"
            placeholder={placeholders.consumption}
            autoComplete="off"
            min="0"
            max="3000"
            step="0.001"
            name="consumption"
            required
            value={data.consumption}
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
            max="5000"
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
        {calcType === CalcType.SEGMENT && (
          <td className="data__table-cell data__table-cell--start-pressure">
            <dfn className="data__input--definition">
              P<sub>п{segment}</sub>
            </dfn>
            <input
              type="number"
              className="data__table-input data__table-input--start-pressure"
              placeholder={placeholders["start-pressure"]}
              autoComplete="off"
              min="0"
              max="4000"
              step="0.001"
              name="start-pressure"
              required
              value={data["start-pressure"]}
              ref={(element) => getRef(element, 3)}
              data-segment={segment - 1}
              onChange={onInputChange}
            />
            <span className="data__input--dimension">
              {pressureType === PressureType.LOW ? `Па` : `МПа`}
            </span>
          </td>
        )}
      </tr>
    </>
  );
};

export default IncomeBranchesSegmentRow;
