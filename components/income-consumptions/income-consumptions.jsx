import { useContext, useState, useRef } from "react";

import CalculationDataContext from "../../store/calculation-data-context";
import CalculationTypeContext from "../../store/calculation-type-context";

import useFormValidation from "../../hooks/useFormValidation";
import useInvalidShake from "../../hooks/useInvalidShake";
import useLocalStorage from "../../hooks/useLocalStorage";

import IncomeConsumptionsItem from "./income-consumptions-item";
import IncomeConsumptionsConfiguration from "./income-consumptions-configuration";
import IncomeConsumptionsSegments from "./income-consumptions-segments";

import { SHAKE_ANIMATION_TIMEOUT, LocalStorage } from "../../utils/const";

import { PressureType } from "../../calculations/gas-network/const";

const IncomeConsumptions = ({
  consumptionsInputFields,
  nextScreenId,
  sendConsumptionsData,
}) => {
  const { currentCalculation } = useContext(CalculationTypeContext);
  const { getResults, setIncomeData } = useContext(CalculationDataContext);
  const consumptionByConsumers = getResults()["consumption-by-consumers"];

  const { isUserDataValid, checkInputValidity } = useFormValidation();
  const { toggleShake } = useInvalidShake(SHAKE_ANIMATION_TIMEOUT);

  const initialValues = consumptionsInputFields.main.reduce(
    (prev, field) => ({
      ...prev,
      [field.id]: "",
    }),
    {}
  );
  const [cachedValues, setCacheValues] = useLocalStorage(
    LocalStorage[currentCalculation].CONSUMPTIONS,
    initialValues
  );

  const [inputValues, setInputValues] = useState(cachedValues);
  const [pressureType, setPressureType] = useState({
    type:
      (cachedValues &&
        cachedValues.pressureType &&
        cachedValues.pressureType.type) ||
      PressureType.LOW,
    value:
      (cachedValues &&
        cachedValues.pressureType &&
        cachedValues.pressureType.value) ||
      +consumptionByConsumers.qshngp,
  });

  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false);
  const [isConfigurationShow, setIsConfigurationShow] = useState(
    (cachedValues && cachedValues.isConfigurationOpen) || false
  );
  const [isSegmentsShow, setIsSegmentsShow] = useState(
    (cachedValues && cachedValues.isSegmentsOpen) || false
  );

  const sectionRef = useRef();
  const inputElements = useRef([]);

  const configurationChangeHandler = (state) => {
    setIsConfigurationShow(state);

    const layoutSetup = {
      isConfigurationOpen: state,
      isSegmentsOpen: isSegmentsShow,
    };

    setCacheValues({ ...cachedValues, ...layoutSetup });
  };

  const segmentsChangeHandler = (state) => {
    setIsSegmentsShow(state);

    const layoutSetup = {
      isConfigurationOpen: isConfigurationShow,
      isSegmentsOpen: state,
    };

    setCacheValues({ ...cachedValues, ...layoutSetup });
  };

  const inputChangeHandler = (evt) => {
    const { id, value } = evt.target;

    const updatedValues = {
      ...inputValues,
      [id]: value,
    };

    if (isNextButtonPressed) {
      checkInputValidity(evt.target);
    }

    configurationChangeHandler(false);
    segmentsChangeHandler(false);

    setInputValues(updatedValues);
    setCacheValues({ ...cachedValues, ...updatedValues });
  };

  const pressureTypeChangeHandler = (evt) => {
    const radioValue = evt.target.value;
    const specificTravelGasConsumption =
      radioValue === PressureType.LOW
        ? +consumptionByConsumers.qshngp
        : +consumptionByConsumers.qggod;

    setPressureType({
      type: radioValue,
      value: specificTravelGasConsumption,
    });

    configurationChangeHandler(false);
    segmentsChangeHandler(false);

    setCacheValues({
      ...cachedValues,
      pressureType: {
        type: radioValue,
        value: specificTravelGasConsumption,
      },
    });
  };

  const nextButtonClickHandler = () => {
    if (!isNextButtonPressed) {
      setIsNextButtonPressed(true);
    }

    if (isUserDataValid(inputElements.current)) {
      setIncomeData(inputValues);
      configurationChangeHandler(true);
      segmentsChangeHandler(false);
    } else {
      configurationChangeHandler(false);
      segmentsChangeHandler(false);
      toggleShake(sectionRef.current);
    }
  };

  return (
    <section id="income-consumptions" className="income-consumptions">
      <div className="section__container">
        <h2 className="section-heading">Вихідні дані ділянок мережі</h2>
        <fieldset className="data__fieldset">
          <div className="data__fieldset-replacer">
            <div
              className="data__container data__container--consumptions"
              ref={sectionRef}
            >
              {consumptionsInputFields.main.map((item, index) => (
                <IncomeConsumptionsItem
                  key={item.id}
                  definition={item.definition}
                  label={item.label}
                  id={item.id}
                  placeholder={item.placeholder}
                  min={item.min}
                  max={item.max}
                  step={item.step}
                  dimension={item.dimension}
                  value={inputValues[item.id]}
                  refItem={(element) =>
                    inputElements.current.splice(index, 1, element)
                  }
                  onInputChange={inputChangeHandler}
                />
              ))}
            </div>
            <div className="data__footer">
              <div className="data__footer-item">
                <span className="data__legend">Тип газопроводів</span>
                <div className="data__radio-wrapper">
                  <input
                    type="radio"
                    className="data__input visually-hidden"
                    id="pressure-low"
                    value={PressureType.LOW}
                    checked={pressureType.type === PressureType.LOW}
                    name="pressure-type"
                    onChange={pressureTypeChangeHandler}
                  />
                  <label htmlFor="pressure-low" className="data__label">
                    Низький
                  </label>
                </div>
                <div className="data__radio-wrapper">
                  <input
                    type="radio"
                    className="data__input visually-hidden"
                    id="pressure-medium"
                    value={PressureType.MEDIUM}
                    checked={pressureType.type === PressureType.MEDIUM}
                    name="pressure-type"
                    onChange={pressureTypeChangeHandler}
                  />
                  <label htmlFor="pressure-medium" className="data__label">
                    Середній
                  </label>
                </div>
              </div>
              <div className="data__footer-item">
                <button
                  className="button button--primary data__button data__button--next"
                  type="button"
                  onClick={nextButtonClickHandler}
                >
                  Далі
                </button>
              </div>
            </div>

            {isConfigurationShow && (
              <IncomeConsumptionsConfiguration
                basisRoutesAmount={+inputValues["basis-routes"]}
                configurationFields={consumptionsInputFields.configuration}
                setIsNextSectionShow={segmentsChangeHandler}
                sendConsumptionsData={sendConsumptionsData}
              />
            )}

            {isConfigurationShow && isSegmentsShow && (
              <IncomeConsumptionsSegments
                totalLength={+inputValues["total-length"]}
                segmentFields={consumptionsInputFields.segments}
                specificTravelGasConsumption={pressureType.value}
                nextScreenId={nextScreenId}
              />
            )}
          </div>
        </fieldset>
      </div>
    </section>
  );
};

export default IncomeConsumptions;
