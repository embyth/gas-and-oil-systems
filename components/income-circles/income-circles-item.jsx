import parse from "html-react-parser";

const IncomeCirclesItem = ({
  definition,
  label,
  id,
  placeholder,
  min,
  max,
  step,
  dimension,
  value,
  refItem,
  onInputChange,
}) => (
  <div className="data__item">
    <label htmlFor={id} className="data__label">
      {label}
    </label>
    <div className="data__item-input">
      <dfn className="data__input--definition">{parse(definition)}</dfn>
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
        value={value}
        ref={refItem}
        onChange={onInputChange}
      />
      <span className="data__input--dimension">{parse(dimension)}</span>
    </div>
  </div>
);

export default IncomeCirclesItem;
