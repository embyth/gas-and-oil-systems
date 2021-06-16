import parse from "html-react-parser";

const IncomeDataItem = ({
  definition,
  label,
  id,
  placeholder,
  min,
  max,
  step,
  dimension,
  values,
  refItem,
  onInputChange,
  isTriple = false,
}) =>
  isTriple ? (
    <div className="data__item">
      <label htmlFor={`${id}1`} className="data__label">
        {label}
      </label>
      <div className="data__item--triple">
        {placeholder.map((placeholderItem, index) => (
          <div key={`${id}-${placeholderItem}`} className="data__item-input">
            <dfn className="data__input--definition">
              {parse(`${definition}<sub>${index + 1}</sub>`)}
            </dfn>
            <input
              type="number"
              className={`data__input data__input--${id}${index + 1}`}
              id={`${id}${index + 1}`}
              placeholder={placeholderItem}
              min={min}
              max={max}
              step={step}
              autoComplete="off"
              required={index === 0}
              value={values[`${id}${index + 1}`]}
              ref={index === 0 ? refItem : null}
              onChange={onInputChange}
            />
            <span className="data__input--dimension data__input--dimension-long">
              {parse(dimension)}
            </span>
          </div>
        ))}
      </div>
    </div>
  ) : (
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
          value={values[id]}
          ref={refItem}
          onChange={onInputChange}
        />
        <span className="data__input--dimension">{parse(dimension)}</span>
      </div>
    </div>
  );

export default IncomeDataItem;
