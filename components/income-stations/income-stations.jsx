import { useContext, useEffect, useState, useRef } from "react";

import { store as notificationStore } from "react-notifications-component";

import ScreenContext from "../../store/screen-context";
import CalculationDataContext from "../../store/calculation-data-context";

import useFormValidation from "../../hooks/useFormValidation";
import useInvalidShake from "../../hooks/useInvalidShake";

import IncomeStationsRow from "./income-stations-row";

import { SHAKE_ANIMATION_TIMEOUT, LocalStorage } from "../../utils/const";

const IncomeStations = ({
  stationFields,
  nextScreenId,
  currentCalculation,
  sendStationsData,
}) => {
  const { changeScreen } = useContext(ScreenContext);
  const { getMiddleResults, getIncomeData, setResults } = useContext(
    CalculationDataContext
  );

  const { isUserDataValid, checkInputValidity } = useFormValidation();
  const { toggleShake } = useInvalidShake(SHAKE_ANIMATION_TIMEOUT);

  const incomeData = getIncomeData();
  const middleResults = getMiddleResults();
  const { stations } = middleResults;

  const initialValues = stations.map((station) =>
    stationFields.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: "",
        keyId: station.uniqId,
      }),
      {}
    )
  );
  const [inputValues, setInputValues] = useState(initialValues);
  const [isCalcButtonPressed, setIsCalcButtonPressed] = useState(false);
  const [isRequestSending, setIsRequestSending] = useState(false);

  const sectionRef = useRef();
  const inputElements = useRef([]);

  useEffect(() => {
    const cachedValues = JSON.parse(
      localStorage.getItem(LocalStorage[currentCalculation].STATIONS)
    );

    if (cachedValues) {
      setInputValues(cachedValues);
    }
  }, [stationFields, stations, currentCalculation]);

  const inputChangeHandler = (evt) => {
    const {
      name,
      value,
      dataset: { station },
    } = evt.target;

    const updatedValue = { ...inputValues[station], [name]: value };

    const updatedValues = [
      ...inputValues.slice(0, +station),
      updatedValue,
      ...inputValues.slice(+station + 1),
    ];

    if (isCalcButtonPressed) {
      checkInputValidity(evt.target);
    }

    setInputValues(updatedValues);

    localStorage.setItem(
      LocalStorage[currentCalculation].STATIONS,
      JSON.stringify(updatedValues)
    );
  };

  const calcButtonClickHandler = async () => {
    if (!isCalcButtonPressed) {
      setIsCalcButtonPressed(true);
    }

    if (isUserDataValid(inputElements.current)) {
      setIsRequestSending(true);

      const userValues = {
        userData: inputValues,
        middleResults,
        incomeData,
      };

      const response = await sendStationsData(userValues);
      const data = await response.json();

      if (!response.ok) {
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

      setResults(data);
      changeScreen(nextScreenId);
      setIsRequestSending(false);
    } else {
      toggleShake(sectionRef.current);
    }
  };

  return (
    <section id="income-stations" className="income-stations" ref={sectionRef}>
      <div className="section__container">
        <h2 className="section-heading">
          Вихідні дані для станцій нафтопроводу
        </h2>

        <fieldset className="data__fieldset">
          <div className="data__fieldset-replacer">
            <div className="data__container data__container--stations">
              <table className="data__table data__table--stations">
                <thead className="data__table-head">
                  <tr>
                    <td className="data__table-cell data__table-cell--station">
                      Станція
                    </td>
                    <td className="data__table-cell data__table-cell--length">
                      Довжина прилеглої ділянки
                    </td>
                    <td className="data__table-cell data__table-cell--geo-point">
                      Геодезична позначка станції
                    </td>
                    <td className="data__table-cell data__table-cell--pump-quant">
                      Кількість одночасно працюючих основних насосів
                    </td>
                    <td className="data__table-cell data__table-cell--min-pressure">
                      Мінімально допустимий тиск на вході
                    </td>
                    <td className="data__table-cell data__table-cell--max-pressure">
                      Максимально допустимий тиск на виході
                    </td>
                  </tr>
                </thead>

                <tbody className="data__table-body">
                  {inputValues.map((item, index) => (
                    <IncomeStationsRow
                      key={item.keyId}
                      data={item}
                      station={index + 1}
                      isMainStation={index === 0}
                      isEndPoint={index === inputValues.length - 1}
                      placeholders={stations[index].placeholders}
                      refItems={inputElements}
                      onInputChange={inputChangeHandler}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className="button button--primary data__button data__button--calc"
              type="button"
              disabled={isRequestSending}
              onClick={calcButtonClickHandler}
            >
              Розрахувати
            </button>
          </div>
        </fieldset>
      </div>
    </section>
  );
};

export default IncomeStations;
