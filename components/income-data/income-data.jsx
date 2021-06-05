import { useContext, useState, useRef } from "react";

import ScreenContext from "../../store/screen-context";

import useFormValidation from "../../hooks/useFormValidation";
import useInvalidShake from "../../hooks/useInvalidShake";

import IncomeDataItem from "./income-data-item";

import {
  SHAKE_ANIMATION_TIMEOUT,
  SessionStorage,
} from "../../utils/constants/base";

const IncomeData = ({ incomeInputFields, nextScreenId }) => {
  const { changeScreen } = useContext(ScreenContext);
  const sectionRef = useRef();
  const inputElements = useRef([]);
  const { isUserDataValid, checkInputValidity } = useFormValidation();

  const { toggleShake } = useInvalidShake(SHAKE_ANIMATION_TIMEOUT);

  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false); // Это состояние отслеживает первое нажатие на кнопку далее, для того что не выполнять проверку валидации при первинном вводе данных в инпуты

  const cachedValues = JSON.parse(
    sessionStorage.getItem(SessionStorage.INCOME_DATA)
  );
  const initialValues = incomeInputFields.reduce(
    (acc, item) => ({ ...acc, [item.id]: "" }),
    {}
  );
  const [inputValues, setInputValues] = useState(cachedValues || initialValues);

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
      changeScreen(nextScreenId);
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
