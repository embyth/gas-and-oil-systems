import { useContext, useState, useRef, useEffect } from "react";

import CalculationDataContext from "../../store/calculation-data-context";
import CalculationTypeContext from "../../store/calculation-type-context";

import useFormValidation from "../../hooks/useFormValidation";
import useInvalidShake from "../../hooks/useInvalidShake";
import useLocalStorage from "../../hooks/useLocalStorage";

import IncomeCirclesItem from "./income-circles-item";
import IncomeCirclesConfiguration from "./income-circles-configuration";
import IncomeCirclesSegments from "./income-circles-segments";

import { SHAKE_ANIMATION_TIMEOUT, LocalStorage } from "../../utils/const";

import { PressureType } from "../../calculations/gas-network/const";

const IncomeCircles = ({
  circlesInputFields,
  nextScreenId,
  sendSegmentsData,
  sendCirclesData,
}) => {
  const { currentCalculation } = useContext(CalculationTypeContext);
  const { setIncomeData } = useContext(CalculationDataContext);

  const { isUserDataValid, checkInputValidity } = useFormValidation();
  const { toggleShake } = useInvalidShake(SHAKE_ANIMATION_TIMEOUT);

  const initialValues = circlesInputFields.main.reduce(
    (prev, field) => ({
      ...prev,
      [field.id]: "",
    }),
    {}
  );
  const [cachedValues, setCacheValues] = useLocalStorage(
    LocalStorage[currentCalculation].CIRCLES,
    initialValues
  );

  const [inputValues, setInputValues] = useState(cachedValues);
  const [pressureType, setPressureType] = useState(
    (cachedValues && cachedValues.pressureType) || PressureType.LOW
  );

  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false);
  const [isConfigurationShow, setIsConfigurationShow] = useState(
    (cachedValues && cachedValues.isConfigurationOpen) || false
  );
  const [isSegmentsShow, setIsSegmentsShow] = useState(
    (cachedValues && cachedValues.isSegmentsOpen) || false
  );

  const sectionRef = useRef();
  const inputElements = useRef([]);

  useEffect(() => {
    setIncomeData({ networkConfig: inputValues });
  }, [inputValues]); // eslint-disable-line react-hooks/exhaustive-deps

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

    setPressureType(radioValue);

    configurationChangeHandler(false);
    segmentsChangeHandler(false);

    setCacheValues({
      ...cachedValues,
      pressureType: radioValue,
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
    <section id="income-circles" className="income-circles">
      <div className="section__container">
        <h2 className="section-heading">
          Вихідні дані ділянок кільцевої мережі
        </h2>
        <fieldset className="data__fieldset">
          <div className="data__fieldset-replacer">
            <div
              className="data__container data__container--circles"
              ref={sectionRef}
            >
              {circlesInputFields.main
                .filter(
                  (item) => item.type === pressureType || item.type === `BOTH`
                )
                .map((item, index) => (
                  <IncomeCirclesItem
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
                <span className="data__legend">Тиск газопроводів</span>
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
              <IncomeCirclesConfiguration
                basisRoutesAmount={+inputValues["basis-routes"]}
                circlesAmount={+inputValues["circles-amount"]}
                configurationFields={circlesInputFields.configuration}
                setIsNextSectionShow={segmentsChangeHandler}
                sendSegmentsData={sendSegmentsData}
              />
            )}

            {isConfigurationShow && isSegmentsShow && (
              <IncomeCirclesSegments
                segmentFields={circlesInputFields.segments}
                nextScreenId={nextScreenId}
                sendCirclesData={sendCirclesData}
              />
            )}
          </div>
        </fieldset>
      </div>
    </section>
  );
};

export default IncomeCircles;
