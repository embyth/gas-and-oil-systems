import { useContext, useState, useRef } from "react";

import ScreenContext from "../../store/screen-context";
import CalculationDataContext from "../../store/calculation-data-context";
import CalculationTypeContext from "../../store/calculation-type-context";

import useFormValidation from "../../hooks/useFormValidation";
import useInvalidShake from "../../hooks/useInvalidShake";
import useNotification from "../../hooks/useNotification";
import useLocalStorage from "../../hooks/useLocalStorage";

import IncomeStationsRow from "./income-stations-row";

import { SHAKE_ANIMATION_TIMEOUT, LocalStorage } from "../../utils/const";

const IncomeStations = ({ stationFields, nextScreenId, sendStationsData }) => {
  const { currentCalculation } = useContext(CalculationTypeContext);
  const { changeScreen } = useContext(ScreenContext);
  const { getResults, getIncomeData, setResults } = useContext(
    CalculationDataContext
  );

  const { isUserDataValid, checkInputValidity } = useFormValidation();
  const { toggleShake } = useInvalidShake(SHAKE_ANIMATION_TIMEOUT);
  const { spawnErrorNotification } = useNotification();

  const incomeData = getIncomeData();
  const { firstCalcResults, stationsProps } = getResults();

  const sectionRef = useRef();
  const inputElements = useRef([]);

  const initialValues = stationsProps.map(() =>
    stationFields.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: "",
      }),
      {}
    )
  );
  const [cachedValues, setCacheValues] = useLocalStorage(
    LocalStorage[currentCalculation].STATIONS,
    initialValues
  );

  const [inputValues, setInputValues] = useState(cachedValues);
  const [isCalcButtonPressed, setIsCalcButtonPressed] = useState(false);
  const [isRequestSending, setIsRequestSending] = useState(false);

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
    setCacheValues(updatedValues);
  };

  const calcButtonClickHandler = async () => {
    if (!isCalcButtonPressed) {
      setIsCalcButtonPressed(true);
    }

    if (isUserDataValid(inputElements.current)) {
      setIsRequestSending(true);

      const userValues = {
        incomeData,
        incomeStations: inputValues,
        firstCalcResults,
      };

      const response = await sendStationsData(userValues);
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
    <section id="income-stations" className="income-stations" ref={sectionRef}>
      <div className="section__container">
        <h2 className="section-heading">
          ?????????????? ???????? ?????? ?????????????? ????????????????????????
        </h2>

        <fieldset className="data__fieldset">
          <div className="data__fieldset-replacer">
            <div className="data__container data__container--stations">
              <table className="data__table data__table--stations">
                <thead className="data__table-head">
                  <tr>
                    <td className="data__table-cell data__table-cell--station">
                      ??????????????
                    </td>
                    <td className="data__table-cell data__table-cell--length">
                      ?????????????? ?????????????????? ??????????????
                    </td>
                    <td className="data__table-cell data__table-cell--geo-point">
                      ???????????????????? ???????????????? ??????????????
                    </td>
                    <td className="data__table-cell data__table-cell--pump-quant">
                      ?????????????????? ?????????????????? ?????????????????? ???????????????? ??????????????
                    </td>
                    <td className="data__table-cell data__table-cell--min-pressure">
                      ???????????????????? ???????????????????? ???????? ???? ??????????
                    </td>
                    <td className="data__table-cell data__table-cell--max-pressure">
                      ?????????????????????? ???????????????????? ???????? ???? ????????????
                    </td>
                  </tr>
                </thead>

                <tbody className="data__table-body">
                  {inputValues.map((item, index) => (
                    <IncomeStationsRow
                      key={stationsProps[index].uniqId}
                      data={item}
                      station={index + 1}
                      isMainStation={index === 0}
                      isEndPoint={index === inputValues.length - 1}
                      placeholders={stationsProps[index].placeholders}
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
              ??????????????????????
            </button>
          </div>
        </fieldset>
      </div>
    </section>
  );
};

export default IncomeStations;
