import { useContext, useState, useRef, useEffect } from "react";

import { store as notificationStore } from "react-notifications-component";

import ScreenContext from "../../store/screen-context";
import CalculationDataContext from "../../store/calculation-data-context";

import useFormValidation from "../../hooks/useFormValidation";
import useInvalidShake from "../../hooks/useInvalidShake";

import IncomeDataItem from "./income-data-item";

import {
  SHAKE_ANIMATION_TIMEOUT,
  SessionStorage,
} from "../../utils/constants/base";

const IncomeData = ({ incomeInputFields, nextScreenId }) => {
  const { changeScreen } = useContext(ScreenContext);
  const { setIncomeData, setMiddleResults } = useContext(
    CalculationDataContext
  );

  const { isUserDataValid, checkInputValidity } = useFormValidation();
  const { toggleShake } = useInvalidShake(SHAKE_ANIMATION_TIMEOUT);

  const initialValues = incomeInputFields.reduce(
    (acc, item) => ({ ...acc, [item.id]: "" }),
    {}
  );
  const [inputValues, setInputValues] = useState(initialValues);
  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false);
  const [isRequestSending, setIsRequestSending] = useState(false);

  const sectionRef = useRef();
  const inputElements = useRef([]);

  useEffect(() => {
    const cachedValues = JSON.parse(
      sessionStorage.getItem(SessionStorage.INCOME_DATA)
    );

    if (cachedValues) {
      setInputValues(cachedValues);
    }
  }, []);

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
    sessionStorage.setItem(
      SessionStorage.INCOME_DATA,
      JSON.stringify(updatedValues)
    );
  };

  const nextButtonClickHandler = () => {
    if (!isNextButtonPressed) {
      setIsNextButtonPressed(true);
    }

    if (isUserDataValid(inputElements.current)) {
      const incomeData = JSON.parse(
        sessionStorage.getItem(SessionStorage.INCOME_DATA)
      );

      setIncomeData(incomeData);
      setIsRequestSending(true);

      fetch(`/api/oil-transmission/first`, {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incomeData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            notificationStore.addNotification({
              title: "Помилка!",
              message: data.message,
              type: "danger",
              insert: "bottom",
              container: "bottom-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 5000,
                onScreen: true,
              },
            });

            return;
          }

          setMiddleResults(data);
          changeScreen(nextScreenId);
        })
        .finally(() => setIsRequestSending(false));
    } else {
      toggleShake(sectionRef.current);
    }
  };

  return (
    <section id="income-data" className="income-data" ref={sectionRef}>
      <div className="section__container">
        <h2 className="section-heading">Вихідні дані для розрахунку</h2>

        <fieldset className="data__fieldset">
          <div className="data__fieldset-replacer">
            <div className="data__container">
              {incomeInputFields.map((item, index) => (
                <IncomeDataItem
                  key={item.id}
                  definition={item.definition}
                  label={item.label}
                  id={item.id}
                  placeholder={item.placeholder}
                  min={item.min}
                  max={item.max}
                  step={item.step}
                  demention={item.demention}
                  refItem={(element) =>
                    inputElements.current.splice(index, 1, element)
                  }
                  value={inputValues[item.id]}
                  onInputChange={inputChangeHandler}
                />
              ))}
              <div className="data__item">
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

export default IncomeData;
