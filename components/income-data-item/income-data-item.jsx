const IncomeDataItem = ({
  definition,
  label,
  id,
  placeholder,
  min,
  max,
  step,
  demention,
}) => (
  <div className="data__item">
    <label htmlFor={id} className="data__label">
      {label}
    </label>
    <div className="data__item-input">
      <dfn className="data__input--definition">{definition}</dfn>
      <input
        type="number"
        className={`data__input data__input--${id}`}
        id={id}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        autoComplete="off"
        required
        value=""
      />
      <span className="data__input--dimension">{demention}</span>
    </div>
  </div>
);

export default IncomeDataItem;
