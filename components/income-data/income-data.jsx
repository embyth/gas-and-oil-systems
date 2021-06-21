import { useContext, useState, useRef, useEffect } from "react";

import ScreenContext from "../../store/screen-context";
import CalculationDataContext from "../../store/calculation-data-context";

import useFormValidation from "../../hooks/useFormValidation";
import useInvalidShake from "../../hooks/useInvalidShake";
import useKeyboardEvent from "../../hooks/useKeyboardEvent";
import useNotification from "../../hooks/useNotification";

import IncomeDataItem from "./income-data-item";
import IncomeDataItemSelect from "./income-data-item-select";
import IncomeDataModal from "./income-data-modal";

import {
  SHAKE_ANIMATION_TIMEOUT,
  AvailableCalculation,
  LocalStorage,
} from "../../utils/const";

const IncomeData = ({
  incomeInputFields,
  incomeModalFields,
  nextScreenId,
  currentCalculation,
  sendIncomeData,
}) => {
  const { changeScreen } = useContext(ScreenContext);
  const { setIncomeData, setResults } = useContext(CalculationDataContext);

  const { isUserDataValid, checkInputValidity } = useFormValidation();
  const { toggleShake } = useInvalidShake(SHAKE_ANIMATION_TIMEOUT);
  const { spawnErrorNotification } = useNotification();

  const initialValues = incomeInputFields.reduce(
    (acc, item) =>
      item.type === `select`
        ? {
            ...acc,
            ...item.data.reduce(
              (prev, select) => ({ ...prev, [select.id]: "" }),
              {}
            ),
          }
        : { ...acc, [item.id]: "" },
    {}
  );
  const [inputValues, setInputValues] = useState(initialValues);
  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false);
  const [isRequestSending, setIsRequestSending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalValid, setIsModalValid] = useState(false);
  const [validateModalOnOpen, setValidateModalOnOpen] = useState(false);

  const sectionRef = useRef();
  const inputElements = useRef([]);

  useEffect(() => {
    const cachedValues = JSON.parse(
      localStorage.getItem(LocalStorage[currentCalculation].INCOME)
    );

    if (cachedValues) {
      setInputValues(cachedValues);
    }
  }, [currentCalculation]);

  const modalCloseHandler = () => {
    setValidateModalOnOpen(false);
    setIsModalOpen(false);
  };

  const modalOpenHandler = () => {
    setIsModalOpen(true);
  };

  useKeyboardEvent(`Escape`, modalCloseHandler, isModalOpen);

  const updateInputValues = (id, value, additional = {}) => {
    const updatedValues = {
      ...inputValues,
      [id]: value,
      ...additional,
    };

    setInputValues(updatedValues);
    localStorage.setItem(
      LocalStorage[currentCalculation].INCOME,
      JSON.stringify(updatedValues)
    );
  };

  const inputChangeHandler = (evt) => {
    const { id, value } = evt.target;

    if (isNextButtonPressed) {
      checkInputValidity(evt.target);
    }

    updateInputValues(id, value);
  };

  const sendDataSuccessHandler = (data) => {
    setResults(data);
  };

  const sendDataErrorHandler = (data) => {
    spawnErrorNotification(data.message || "Невідома помилка!");
  };

  const submitButtonClickHandler = async () => {
    if (!isNextButtonPressed) {
      setIsNextButtonPressed(true);
    }

    if (
      currentCalculation === AvailableCalculation.GAS_TRANSMISSION &&
      inputValues.gpu === `custom` &&
      inputValues.supercharger === `custom` &&
      !isModalValid
    ) {
      setValidateModalOnOpen(true);
      setIsModalOpen(true);
      return;
    }

    if (isUserDataValid(inputElements.current)) {
      setIncomeData(inputValues);
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
    <section id="income-data" className="income-data" ref={sectionRef}>
      {isModalOpen && (
        <IncomeDataModal
          incomeModalFields={incomeModalFields}
          updateInputValues={updateInputValues}
          currentCalculation={currentCalculation}
          updateModalValidationStatus={setIsModalValid}
          validateOnOpen={validateModalOnOpen}
          updateValidateOnOpen={setValidateModalOnOpen}
          onModalClose={modalCloseHandler}
        />
      )}
      <div className="section__container">
        <h2 className="section-heading">Вихідні дані для розрахунку</h2>

        <fieldset className="data__fieldset">
          <div className="data__fieldset-replacer">
            <div className="data__container">
              {incomeInputFields.map((item, index) =>
                item.type === `select` ? (
                  <IncomeDataItemSelect
                    key={item.id}
                    label={item.label}
                    data={item.data}
                    currentCalculation={currentCalculation}
                    gpuRef={(element) =>
                      inputElements.current.splice(index, 1, element)
                    }
                    superchargerRef={(element) =>
                      inputElements.current.splice(index + 1, 1, element)
                    }
                    updateInputValues={updateInputValues}
                    onModalOpen={modalOpenHandler}
                  />
                ) : (
                  <IncomeDataItem
                    key={item.id}
                    definition={item.definition}
                    label={item.label}
                    id={item.id}
                    placeholder={item.placeholder}
                    min={item.min}
                    max={item.max}
                    step={item.step}
                    dimension={item.dimension}
                    refItem={(element) =>
                      inputElements.current.splice(index, 1, element)
                    }
                    values={inputValues}
                    onInputChange={inputChangeHandler}
                  />
                )
              )}
              <div className="data__item">
                <button
                  className="button button--primary data__button data__button--next"
                  type="button"
                  disabled={isRequestSending}
                  onClick={submitButtonClickHandler}
                >
                  {nextScreenId === `RESULTS` ? `Розрахувати` : `Далі`}
                </button>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </section>
  );
};

export default IncomeData;
