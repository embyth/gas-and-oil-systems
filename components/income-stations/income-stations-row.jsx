const IncomeStationsRow = ({
  data,
  station,
  isMainStation,
  isEndPoint,
  placeholders,
  onInputChange,
  refItems,
}) => {
  let stationName;
  if (isMainStation) {
    stationName = `ГНПС-1`;
  } else if (isEndPoint) {
    stationName = `КП`;
  } else {
    stationName = `НПС-${station}`;
  }

  let minPressurePlaceholder;
  if (isEndPoint) {
    minPressurePlaceholder = `0.25`;
  } else if (isMainStation) {
    minPressurePlaceholder = ``;
  } else {
    minPressurePlaceholder = `0.4`;
  }

  const getRef = (element, columnIndex) => {
    const stationIndex = station - 1;
    const columnAmount = 5;
    return refItems.current.splice(
      stationIndex * columnAmount + columnIndex,
      1,
      element
    );
  };

  return (
    <tr className="data__table-row">
      <td className="data__table-cell data__table-cell--station">
        {stationName}
      </td>
      <td className="data__table-cell data__table-cell--length">
        <input
          type="number"
          className="data__table-input data__table-input--length"
          placeholder={isEndPoint ? `` : placeholders.length}
          autoComplete="off"
          min="10"
          max="175"
          step="0.1"
          name="length"
          ref={(element) => getRef(element, 0)}
          data-station={station - 1}
          required={!isEndPoint}
          disabled={isEndPoint}
          value={data.length}
          onChange={onInputChange}
        />
        <dfn className="data__input--definition">
          L<sub>{stationName}</sub>
        </dfn>
        <span className="data__input--dimension">км</span>
      </td>
      <td className="data__table-cell data__table-cell--geo-point">
        <input
          type="number"
          className="data__table-input data__table-input--geo-point"
          placeholder={placeholders["geo-point"]}
          autoComplete="off"
          step="0.01"
          name="geo-point"
          ref={(element) => getRef(element, 1)}
          data-station={station - 1}
          required
          value={data["geo-point"]}
          onChange={onInputChange}
        />
        <dfn className="data__input--definition">
          z<sub>{stationName}</sub>
        </dfn>
        <span className="data__input--dimension">м</span>
      </td>
      <td className="data__table-cell data__table-cell--pump-quant">
        <input
          type="number"
          className="data__table-input data__table-input--pump-quant"
          placeholder={isEndPoint ? `` : placeholders["pump-quant"]}
          autoComplete="off"
          min="1"
          max="6"
          step="1"
          name="pump-quant"
          ref={(element) => getRef(element, 2)}
          data-station={station - 1}
          required={!isEndPoint}
          disabled={isEndPoint}
          value={data["pump-quant"]}
          onChange={onInputChange}
        />
        <dfn className="data__input--definition">
          r<sub>{stationName}</sub>
        </dfn>
        <span className="data__input--dimension">шт</span>
      </td>
      <td className="data__table-cell data__table-cell--min-pressure">
        <input
          type="number"
          className="data__table-input data__table-input--min-pressure"
          placeholder={minPressurePlaceholder}
          autoComplete="off"
          min="0.1"
          max="2"
          step="0.001"
          name="min-pressure"
          ref={(element) => getRef(element, 3)}
          data-station={station - 1}
          disabled={isMainStation}
          required={!isMainStation}
          value={data["min-pressure"]}
          onChange={onInputChange}
        />
        <dfn className="data__input--definition">
          P<sub>min(доп)</sub>
        </dfn>
        <span className="data__input--dimension">МПа</span>
      </td>
      <td className="data__table-cell data__table-cell--max-pressure">
        <input
          type="number"
          className="data__table-input data__table-input--max-pressure"
          placeholder={isEndPoint ? `` : `6.1`}
          autoComplete="off"
          min="1"
          max="10"
          step="0.001"
          name="max-pressure"
          ref={(element) => getRef(element, 4)}
          data-station={station - 1}
          required={!isEndPoint}
          disabled={isEndPoint}
          value={data["max-pressure"]}
          onChange={onInputChange}
        />
        <dfn className="data__input--definition">
          P<sub>max(доп)</sub>
        </dfn>
        <span className="data__input--dimension">МПа</span>
      </td>
    </tr>
  );
};

export default IncomeStationsRow;
