import { useContext, useState, useRef } from "react";

import ScreenContext from "../../store/screen-context";
import CalculationDataContext from "../../store/calculation-data-context";
import CalculationTypeContext from "../../store/calculation-type-context";

import useFormValidation from "../../hooks/useFormValidation";
import useInvalidShake from "../../hooks/useInvalidShake";
import useNotification from "../../hooks/useNotification";
import useLocalStorage from "../../hooks/useLocalStorage";

import IncomeSegmentsRow from "./income-segments-row";

import { SHAKE_ANIMATION_TIMEOUT, LocalStorage } from "../../utils/const";

import { PipeType } from "../../calculations/gas-indoor/const";

const IncomeSegments = ({ segmentFields, nextScreenId, sendSegmentsData }) => {
  const { currentCalculation } = useContext(CalculationTypeContext);
  const { changeScreen } = useContext(ScreenContext);
  const { getResults, setResults } = useContext(CalculationDataContext);

  const { isUserDataValid, checkInputValidity } = useFormValidation();
  const { toggleShake } = useInvalidShake(SHAKE_ANIMATION_TIMEOUT);
  const { spawnErrorNotification } = useNotification();

  const incomeDataFromServer = getResults();

  const initialValues = incomeDataFromServer.segments.map((segment) =>
    segmentFields.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: "",
        keyId: segment.uniqId,
      }),
      {}
    )
  );
  const [cachedValues, setCacheValues] = useLocalStorage(
    LocalStorage[currentCalculation].SEGMENTS,
    initialValues
  );

  const [inputValues, setInputValues] = useState(cachedValues);
  const [pipeType, setPipeType] = useState(PipeType.STEEL);
  const [isCalcButtonPressed, setIsCalcButtonPressed] = useState(false);
  const [isRequestSending, setIsRequestSending] = useState(false);

  const sectionRef = useRef();
  const inputElements = useRef([]);

  const inputChangeHandler = (evt) => {
    const {
      name,
      value,
      dataset: { segment },
    } = evt.target;

    const updatedValue = { ...inputValues[segment], [name]: value };

    const updatedValues = [
      ...inputValues.slice(0, +segment),
      updatedValue,
      ...inputValues.slice(+segment + 1),
    ];

    if (isCalcButtonPressed) {
      checkInputValidity(evt.target);
    }

    setInputValues(updatedValues);
    setCacheValues(updatedValues);
  };

  const pipeTypeChangeHandler = (evt) => {
    setPipeType(evt.target.value);
  };

  const calcButtonClickHandler = async () => {
    if (!isCalcButtonPressed) {
      setIsCalcButtonPressed(true);
    }

    if (isUserDataValid(inputElements.current)) {
      setIsRequestSending(true);

      const userValues = {
        ...incomeDataFromServer,
        segments: inputValues,
        pipeType,
      };

      const response = await sendSegmentsData(userValues);
      const data = await response.json();

      if (!response.ok) {
        spawnErrorNotification(data.message);
        return;
      }

      setResults(data);
      setIsRequestSending(false);
      changeScreen(nextScreenId);
    } else {
      toggleShake(sectionRef.current);
    }
  };

  return (
    <section id="income-segments" className="income-segments" ref={sectionRef}>
      <div className="section__container">
        <h2 className="section-heading">Вихідні дані ділянок мережі</h2>

        <fieldset className="data__fieldset">
          <div className="data__fieldset-replacer">
            <div className="data__container data__container--segments">
              <table className="data__table data__table--segments">
                <thead className="data__table-head">
                  <tr>
                    <td className="data__table-cell data__table-cell--number">
                      Номер
                    </td>
                    <td className="data__table-cell data__table-cell--segment">
                      Ділянка
                    </td>
                    <td className="data__table-cell data__table-cell--consumption">
                      Розрахункова витрата газу
                    </td>
                    <td className="data__table-cell data__table-cell--length">
                      Довжина
                    </td>
                    <td className="data__table-cell data__table-cell--resist-coef">
                      Коеф. місцевого опору
                    </td>
                    <td className="data__table-cell data__table-cell--movement-direction">
                      Напрям руху газу
                    </td>
                  </tr>
                </thead>

                <tbody className="data__table-body">
                  {inputValues.map((item, index) => (
                    <IncomeSegmentsRow
                      key={item.keyId}
                      data={item}
                      segment={index + 1}
                      placeholders={
                        incomeDataFromServer.segments[index].placeholders
                      }
                      refItems={inputElements}
                      onInputChange={inputChangeHandler}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="data__footer">
              <div className="data__footer-item">
                <span className="data__legend">Тип газопроводів:</span>
                <div className="data__radio-wrapper">
                  <input
                    type="radio"
                    className="data__input data__input--pipe-steel visually-hidden"
                    id="pipe-steel"
                    value={PipeType.STEEL}
                    checked={pipeType === PipeType.STEEL}
                    name="pipe-type"
                    onChange={pipeTypeChangeHandler}
                  />
                  <label htmlFor="pipe-steel" className="data__label">
                    Сталеві
                  </label>
                </div>
                <div className="data__radio-wrapper">
                  <input
                    type="radio"
                    className="data__input data__input--pipe-poly visually-hidden"
                    id="pipe-poly"
                    value={PipeType.POLY}
                    checked={pipeType === PipeType.POLY}
                    name="pipe-type"
                    onChange={pipeTypeChangeHandler}
                  />
                  <label htmlFor="pipe-poly" className="data__label">
                    Поліетиленові
                  </label>
                </div>
              </div>
              <div className="data__footer-item">
                <button
                  className="button button--primary data__button data__button--calc"
                  type="button"
                  disabled={isRequestSending}
                  onClick={calcButtonClickHandler}
                >
                  Розрахувати
                </button>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </section>
  );
};

export default IncomeSegments;
