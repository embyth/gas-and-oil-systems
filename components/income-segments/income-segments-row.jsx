const IncomeSegmentsRow = ({
  data,
  segment,
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
    <tr className="data__table-row">
      <td className="data__table-cell data__table-cell--number">
        Ділянка {segment}
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
          max="100"
          step="0.01"
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
          min="0.1"
          max="100"
          step="0.01"
          name="length"
          required
          value={data.length}
          ref={(element) => getRef(element, 2)}
          data-segment={segment - 1}
          onChange={onInputChange}
        />
        <span className="data__input--dimension">м</span>
      </td>
      <td className="data__table-cell data__table-cell--resist-coef">
        <dfn className="data__input--definition">
          a<sub>{segment}</sub>
        </dfn>
        <input
          type="number"
          className="data__table-input data__table-input--resist-coef"
          placeholder={placeholders["resist-coef"]}
          autoComplete="off"
          min="20"
          max="450"
          step="5"
          name="resist-coef"
          required
          value={data["resist-coef"]}
          ref={(element) => getRef(element, 3)}
          data-segment={segment - 1}
          onChange={onInputChange}
        />
        <span className="data__input--dimension">%</span>
      </td>
      <td className="data__table-cell data__table-cell--movement-direction">
        <select
          className="data__table-input data__table-input--select data__table-input--movement-direction"
          name="movement-direction"
          value={data["movement-direction"]}
          ref={(element) => getRef(element, 4)}
          data-segment={segment - 1}
          onChange={onInputChange}
          onBlur={onInputChange}
          required
        >
          <option value="0">Горизонтальний</option>
          <option value="-1">Вгору</option>
          <option value="1">Вниз</option>
        </select>
      </td>
    </tr>
  );
};

export default IncomeSegmentsRow;
