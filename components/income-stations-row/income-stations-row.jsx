const IncomeStationsRow = ({
  lengths,
  station,
  stationName,
  geoPoints,
  pumpUnits,
  isMainStation,
  pressureMinLimits,
  pressureMaxLimits,
}) => (
  <tr className="data__table-row">
    <td className="data__table-cell data__table-cell--station">
      {stationName}
    </td>
    <td className="data__table-cell data__table-cell--length">
      <input
        type="number"
        className="data__table-input data__table-input--length"
        placeholder={getRandomNumber(100, 150)}
        autoComplete="off"
        min="10"
        max="160"
        step="0.1"
        required
        value={lengths[station] ? lengths[station] : ``}
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
        placeholder={getRandomNumber(-20, 100)}
        autoComplete="off"
        step="0.01"
        required
        value={geoPoints[station] ? geoPoints[station] : ``}
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
        placeholder="3"
        autoComplete="off"
        min="1"
        max="6"
        step="1"
        required
        value={pumpUnits[station] ? pumpUnits[station] : ``}
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
        placeholder={isMainStation ? `` : `0.4`}
        autoComplete="off"
        min="0.1"
        max="2"
        step="0.001"
        disabled={isMainStation}
        required={!isMainStation}
        value={
          pressureMinLimits[station - 1] ? pressureMinLimits[station - 1] : ``
        }
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
        placeholder="6.1"
        autoComplete="off"
        min="1"
        max="10"
        step="0.001"
        required
        value={pressureMaxLimits[station] ? pressureMaxLimits[station] : ``}
      />
      <dfn className="data__input--definition">
        P<sub>max(доп)</sub>
      </dfn>
      <span className="data__input--dimension">МПа</span>
    </td>
  </tr>
);

export default IncomeStationsRow;
