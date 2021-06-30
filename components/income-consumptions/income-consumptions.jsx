import { useContext, useEffect, useState, useRef } from "react";

import CalculationDataContext from "../../store/calculation-data-context";

import useFormValidation from "../../hooks/useFormValidation";
import useInvalidShake from "../../hooks/useInvalidShake";

import IncomeConsumptionsItem from "./income-consumptions-item";
import IncomeConsumptionsConfiguration from "./income-consumptions-configuration";
import IncomeConsumptionsSegments from "./income-consumptions-segments";

import { SHAKE_ANIMATION_TIMEOUT, LocalStorage } from "../../utils/const";

import { PressureType } from "../../calculations/gas-network/const";

const IncomeConsumptions = ({
  consumptionsInputFields,
  nextScreenId,
  currentCalculation,
  sendConsumptionsData,
}) => {
  const { getResults, setIncomeData } = useContext(CalculationDataContext);

  const { isUserDataValid, checkInputValidity } = useFormValidation();
  const { toggleShake } = useInvalidShake(SHAKE_ANIMATION_TIMEOUT);

  const initialValues = consumptionsInputFields.main.reduce(
    (prev, field) => ({
      ...prev,
      [field.id]: "",
    }),
    {}
  );
  const [inputValues, setInputValues] = useState(initialValues);
  const [basisRoutesAmount, setBasisRoutesAmount] = useState(0);

  const [pressureType, setPressureType] = useState(PressureType.LOW);

  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false);
  const [isConfigurationShow, setIsConfigurationShow] = useState(false);
  const [isSegmentsShow, setIsSegmentsShow] = useState(false);

  const sectionRef = useRef();
  const inputElements = useRef([]);

  const consumptionByConsumers = getResults()["consumption-by-consumers"];
  const specificTravelGasConsumption = useRef(+consumptionByConsumers.qshngp);

  useEffect(() => {
    const cachedValues = JSON.parse(
      localStorage.getItem(LocalStorage[currentCalculation].CONSUMPTIONS)
    );

    if (
      cachedValues &&
      cachedValues.main &&
      Object.keys(cachedValues.main).length > 0
    ) {
      setInputValues(cachedValues.main);
      setBasisRoutesAmount(+cachedValues.main["basis-routes"]);

      setPressureType(cachedValues.main.pressureType || PressureType.LOW);
    }

    if (cachedValues && cachedValues.layoutSetup) {
      setIsConfigurationShow(cachedValues.layoutSetup.isConfigurationOpen);
      setIsSegmentsShow(cachedValues.layoutSetup.isSegmentsOpen);
    }
  }, [consumptionsInputFields, currentCalculation]);

  const inputChangeHandler = (evt) => {
    const { id, value } = evt.target;

    const updatedValues = {
      ...inputValues,
      [id]: value,
    };

    if (isNextButtonPressed) {
      checkInputValidity(evt.target);
    }

    setInputValues(updatedValues);

    const cachedValues = JSON.parse(
      localStorage.getItem(LocalStorage[currentCalculation].CONSUMPTIONS)
    );

    localStorage.setItem(
      LocalStorage[currentCalculation].CONSUMPTIONS,
      JSON.stringify({ ...cachedValues, main: { ...updatedValues } })
    );
  };

  const pressureTypeChangeHandler = (evt) => {
    setPressureType(evt.target.value);
    specificTravelGasConsumption.current =
      evt.target.value === PressureType.LOW
        ? +consumptionByConsumers.qshngp
        : +consumptionByConsumers.qggod;

    const cachedValues = JSON.parse(
      localStorage.getItem(LocalStorage[currentCalculation].CONSUMPTIONS)
    );

    localStorage.setItem(
      LocalStorage[currentCalculation].CONSUMPTIONS,
      JSON.stringify({
        ...cachedValues,
        main: { ...cachedValues.main, pressureType: evt.target.value },
      })
    );
  };

  const configurationChangeHandler = (state) => {
    setIsConfigurationShow(state);

    const layoutSetup = {
      isConfigurationOpen: state,
      isSegmentsOpen: isSegmentsShow,
    };

    const cachedValues = JSON.parse(
      localStorage.getItem(LocalStorage[currentCalculation].CONSUMPTIONS)
    );

    localStorage.setItem(
      LocalStorage[currentCalculation].CONSUMPTIONS,
      JSON.stringify({ ...cachedValues, layoutSetup })
    );
  };

  const segmentsChangeHandler = (state) => {
    setIsSegmentsShow(state);

    const layoutSetup = {
      isConfigurationOpen: isConfigurationShow,
      isSegmentsOpen: state,
    };

    const cachedValues = JSON.parse(
      localStorage.getItem(LocalStorage[currentCalculation].CONSUMPTIONS)
    );

    localStorage.setItem(
      LocalStorage[currentCalculation].CONSUMPTIONS,
      JSON.stringify({ ...cachedValues, layoutSetup })
    );
  };

  const nextButtonClickHandler = () => {
    if (!isNextButtonPressed) {
      setIsNextButtonPressed(true);
    }

    if (isUserDataValid(inputElements.current)) {
      setIncomeData(inputValues);
      setBasisRoutesAmount(+inputValues["basis-routes"]);
      configurationChangeHandler(true);
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
                    checked={pressureType === PressureType.LOW}
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
                    checked={pressureType === PressureType.MEDIUM}
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
                currentCalculation={currentCalculation}
                basisRoutesAmount={basisRoutesAmount}
                configurationFields={consumptionsInputFields.configuration}
                setIsNextSectionShow={segmentsChangeHandler}
                sendConsumptionsData={sendConsumptionsData}
              />
            )}

            {isConfigurationShow && isSegmentsShow && (
              <IncomeConsumptionsSegments
                currentCalculation={currentCalculation}
                segmentFields={consumptionsInputFields.segments}
                specificTravelGasConsumption={
                  specificTravelGasConsumption.current
                }
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
