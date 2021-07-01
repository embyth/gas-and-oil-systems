import { useState } from "react";

const IncomeDataItemSelect = ({
  label,
  data,
  cachedValues,
  gpuRef,
  superchargerRef,
  updateInputValues,
  onModalOpen,
}) => {
  const [gpuValue, setGpuValue] = useState(cachedValues.gpu);
  const [superchargerValue, setSuperchargerValue] = useState(
    cachedValues.supercharger
  );
  const compatibilityData = data.reduce(
    (acc, item) => ({
      ...acc,
      [item.id]: item.options.reduce(
        (prev, option) => ({ ...prev, [option.value]: option.compatibility }),
        {}
      ),
    }),
    {}
  );

  const [gpuData, superchargerData] = data;

  const gpuSelectChangeHandler = (evt) => {
    const { name, value } = evt.target;

    const updatedSuperchargerValue = compatibilityData[name][value]
      ? compatibilityData[name][value][0]
      : ``; // first compatible supercharger

    setGpuValue(value);
    setSuperchargerValue(updatedSuperchargerValue);
    updateInputValues(name, value, {
      supercharger: updatedSuperchargerValue,
    });

    if (value === `custom` && updatedSuperchargerValue === `custom`) {
      onModalOpen();
    }
  };

  const superchargerSelectChangeHandler = (evt) => {
    const { name, value } = evt.target;

    const updatedGpuValue = compatibilityData[name][value]
      ? compatibilityData[name][value][0]
      : ``; // first compatible gpu

    setSuperchargerValue(value);
    setGpuValue(updatedGpuValue);
    updateInputValues(name, value, {
      gpu: updatedGpuValue,
    });

    if (value === `custom` && updatedGpuValue === `custom`) {
      onModalOpen();
    }
  };

  return (
    <div className="data__item">
      <label htmlFor="gpu" className="data__label">
        {label}
      </label>
      <div className="data__item-input data__item-input--select">
        <button
          type="button"
          className={`button data__modal-opener ${
            gpuValue === `custom` && superchargerValue === `custom`
              ? ``
              : `data__modal-opener--hidden`
          }`}
          title="Відкрити параметри ГПА"
          disabled={gpuValue !== `custom` && superchargerValue !== `custom`}
          onClick={onModalOpen}
        >
          <svg className="data__modal-opener--svg" width="20" height="20">
            <use xlinkHref="assets/img/sprite.svg#icon-show" />
          </svg>
        </button>

        <div className={`select-wrapper select-wrapper--${gpuData.id}`}>
          <select
            name={gpuData.id}
            id={gpuData.id}
            className={`data__input data__input--select data__input--${gpuData.id}`}
            onChange={gpuSelectChangeHandler}
            onBlur={gpuSelectChangeHandler}
            ref={gpuRef}
            value={gpuValue}
            required
          >
            <option value="" disabled>
              {gpuData.label}
            </option>

            {gpuData.options.map(({ label: optionLabel, value }) => (
              <option key={value} value={value}>
                {optionLabel}
              </option>
            ))}
          </select>
        </div>

        <div
          className={`select-wrapper select-wrapper--${superchargerData.id}`}
        >
          <select
            name={superchargerData.id}
            id={superchargerData.id}
            className={`data__input data__input--select data__input--${superchargerData.id}`}
            onChange={superchargerSelectChangeHandler}
            onBlur={superchargerSelectChangeHandler}
            ref={superchargerRef}
            value={superchargerValue}
            required
          >
            <option value="" disabled>
              {superchargerData.label}
            </option>

            {superchargerData.options.map(
              ({ label: optionLabel, value, compatibility }) => (
                <option
                  key={value}
                  value={value}
                  disabled={!compatibility.includes(gpuValue)}
                >
                  {optionLabel}
                </option>
              )
            )}
          </select>
        </div>
      </div>
    </div>
  );
};

export default IncomeDataItemSelect;
