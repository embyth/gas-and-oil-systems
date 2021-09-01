import { useContext, useState, useEffect, useRef } from "react";

import ScreenContext from "../../store/screen-context";
import CalculationDataContext from "../../store/calculation-data-context";
import CalculationTypeContext from "../../store/calculation-type-context";

import useFormValidation from "../../hooks/useFormValidation";
import useInvalidShake from "../../hooks/useInvalidShake";
import useLocalStorage from "../../hooks/useLocalStorage";
import useNotification from "../../hooks/useNotification";

import IncomeBranchesItem from "./income-branches-item";

import { SHAKE_ANIMATION_TIMEOUT, LocalStorage } from "../../utils/const";

import { PressureType, CalcType } from "../../calculations/gas-branches/const";

const IncomeBranches = ({
  incomeInputFields,
  nextScreenId,
  sendIncomeData,
}) => {
  const { currentCalculation } = useContext(CalculationTypeContext);
  const { changeScreen } = useContext(ScreenContext);
  const { setIncomeData } = useContext(CalculationDataContext);

  const { isUserDataValid, checkInputValidity } = useFormValidation();
  const { toggleShake } = useInvalidShake(SHAKE_ANIMATION_TIMEOUT);
  const { spawnErrorNotification } = useNotification();

  const initialValues = incomeInputFields.reduce(
    (prev, field) => ({
      ...prev,
      [field.id]: "",
    }),
    {}
  );
  const [cachedValues, setCacheValues] = useLocalStorage(
    LocalStorage[currentCalculation].INCOME,
    initialValues
  );

  const [inputValues, setInputValues] = useState(cachedValues);
  const [pressureType, setPressureType] = useState(
    (cachedValues && cachedValues.pressureType) || PressureType.LOW
  );
  const [calcType, setCalcType] = useState(
    (cachedValues && cachedValues.calcType) || CalcType.SEGMENT
  );

  const [isRequestSending, setIsRequestSending] = useState(false);
  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false);

  const sectionRef = useRef();
  const inputElements = useRef([]);

  useEffect(() => {
    inputElements.current = inputElements.current.slice(
      0,
      incomeInputFields.filter(
        (item) =>
          (item.pressureType === pressureType ||
            item.pressureType === `BOTH`) &&
          (item.calcType === calcType || item.calcType === `BOTH`)
      ).length
    );
  }, [calcType, pressureType]); // eslint-disable-line react-hooks/exhaustive-deps

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
    setCacheValues({ ...cachedValues, ...updatedValues });
  };

  const pressureTypeChangeHandler = (evt) => {
    const radioValue = evt.target.value;

    setPressureType(radioValue);

    setInputValues({ ...inputValues, pressureType: radioValue });
    setCacheValues({
      ...cachedValues,
      pressureType: radioValue,
    });
  };

  const calcTypeChangeHandler = (evt) => {
    const radioValue = evt.target.value;

    setCalcType(radioValue);

    setInputValues({ ...inputValues, calcType: radioValue });
    setCacheValues({
      ...cachedValues,
      calcType: radioValue,
    });
  };

  const sendDataSuccessHandler = (data) => {
    setIncomeData({ branchesSegmentsConfig: data });
  };

  const sendDataErrorHandler = (data) => {
    spawnErrorNotification(data.message || "Невідома помилка!");
  };

  const nextButtonClickHandler = async () => {
    if (!isNextButtonPressed) {
      setIsNextButtonPressed(true);
    }

    if (isUserDataValid(inputElements.current)) {
      setIncomeData({
        branchesData: { ...inputValues, pressureType },
      });
      setIsRequestSending(true);

      await sendIncomeData(
        inputValues,
        sendDataSuccessHandler,
        sendDataErrorHandler
      );

      setIsRequestSending(false);
      changeScreen(nextScreenId);
    } else {
      toggleShake(sectionRef.current);
    }
  };

  return (
    <section id="income-circles" className="income-branches">
      <div className="section__container">
        <h2 className="section-heading">
          Вихідні дані ділянок розгалуженої мережі
        </h2>
        <fieldset className="data__fieldset">
          <div className="data__fieldset-replacer">
            <div
              className="data__container data__container--branches"
              ref={sectionRef}
            >
              {incomeInputFields
                .filter(
                  (item) =>
                    (item.pressureType === pressureType ||
                      item.pressureType === `BOTH`) &&
                    (item.calcType === calcType || item.calcType === `BOTH`)
                )
                .map((item, index) => (
                  <IncomeBranchesItem
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
                <span className="data__legend">Розрахувати</span>
                <div className="data__radio-wrapper">
                  <input
                    type="radio"
                    className="data__input visually-hidden"
                    id="calc-segment"
                    value={CalcType.SEGMENT}
                    checked={calcType === CalcType.SEGMENT}
                    name="calc-type"
                    onChange={calcTypeChangeHandler}
                  />
                  <label htmlFor="calc-segment" className="data__label">
                    окрему ділянку
                  </label>
                </div>
                <div className="data__radio-wrapper">
                  <input
                    type="radio"
                    className="data__input visually-hidden"
                    id="calc-route"
                    value={CalcType.ROUTE}
                    checked={calcType === CalcType.ROUTE}
                    name="calc-type"
                    onChange={calcTypeChangeHandler}
                  />
                  <label htmlFor="calc-route" className="data__label">
                    напрям
                  </label>
                </div>
              </div>
              <div className="data__footer-item">
                <button
                  className="button button--primary data__button data__button--next"
                  type="button"
                  disabled={isRequestSending}
                  onClick={nextButtonClickHandler}
                >
                  Далі
                </button>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </section>
  );
};

export default IncomeBranches;
