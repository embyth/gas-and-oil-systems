import { useContext, useEffect, useState, useRef } from "react";

import ScreenContext from "../../store/screen-context";
import CalculationDataContext from "../../store/calculation-data-context";
import CalculationTypeContext from "../../store/calculation-type-context";

import useFormValidation from "../../hooks/useFormValidation";
import useInvalidShake from "../../hooks/useInvalidShake";
import useNotification from "../../hooks/useNotification";
import useLocalStorage from "../../hooks/useLocalStorage";

import IncomeBranchesSegmentRow from "./income-branches-segment-row";

import { SHAKE_ANIMATION_TIMEOUT, LocalStorage } from "../../utils/const";
import { PipeType } from "../../calculations/gas-branches/const";

const IncomeBranchesSegments = ({
  segmentsInputFields,
  nextScreenId,
  sendBranchesData,
}) => {
  const { currentCalculation } = useContext(CalculationTypeContext);
  const { changeScreen } = useContext(ScreenContext);
  const { getIncomeData, setIncomeData, setResults } = useContext(
    CalculationDataContext
  );

  const { isUserDataValid, checkInputValidity } = useFormValidation();
  const { toggleShake } = useInvalidShake(SHAKE_ANIMATION_TIMEOUT);
  const { spawnErrorNotification } = useNotification();

  const { branchesData, branchesSegmentsConfig } = getIncomeData();

  const initialValues = branchesSegmentsConfig
    ? branchesSegmentsConfig.map((segment) =>
        segmentsInputFields.reduce(
          (acc, item) => ({
            ...acc,
            [item.id]: "",
            uniqId: segment.uniqId,
            placeholders: segment.placeholders,
          }),
          {}
        )
      )
    : [];

  const [cachedValues, setCacheValues] = useLocalStorage(
    LocalStorage[currentCalculation].SEGMENTS,
    { segments: initialValues, pipeType: PipeType.STEEL }
  );

  const [inputValues, setInputValues] = useState(cachedValues);
  const [pipeType, setPipeType] = useState(
    (cachedValues && cachedValues.pipeType) || PipeType.STEEL
  );

  const [isCalculateButtonPressed, setIsCalculateButtonPressed] =
    useState(false);
  const [isRequestSending, setIsRequestSending] = useState(false);

  const sectionRef = useRef();
  const inputElements = useRef([]);

  useEffect(() => {
    if (cachedValues && cachedValues.segments.length > 0) {
      const updatedCache = branchesSegmentsConfig
        ? branchesSegmentsConfig.map((segment, index) =>
            segmentsInputFields.reduce(
              (acc, item) => ({
                ...acc,
                [item.id]: cachedValues.segments[index]
                  ? cachedValues.segments[index][item.id]
                  : "",
                uniqId: segment.uniqId,
                placeholders: segment.placeholders,
              }),
              {}
            )
          )
        : cachedValues;

      setInputValues({ segments: updatedCache, pipeType });
      setCacheValues({ segments: updatedCache, pipeType });
    }
  }, [branchesSegmentsConfig]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    inputElements.current = inputElements.current.slice(
      0,
      inputValues.segments.length * 4
    );
  }, [inputValues]);

  const pipeTypeChangeHandler = (evt) => {
    const radioValue = evt.target.value;

    setPipeType(radioValue);
    setInputValues({ ...inputValues, pipeType: radioValue });
    setCacheValues({
      ...cachedValues,
      pipeType: radioValue,
    });
  };

  const inputChangeHandler = (evt) => {
    const {
      name,
      value,
      dataset: { segment },
    } = evt.target;

    const updatedSegment = {
      ...inputValues.segments[segment],
      [name]: value,
    };

    const updatedValues = [
      ...inputValues.segments.slice(0, +segment),
      updatedSegment,
      ...inputValues.segments.slice(+segment + 1),
    ];

    if (isCalculateButtonPressed) {
      checkInputValidity(evt.target);
    }

    setInputValues({ ...inputValues, segments: updatedValues });
    setCacheValues({ ...cachedValues, segments: updatedValues });
  };

  const sendDataSuccessHandler = (data) => {
    setResults(data);
  };

  const sendDataErrorHandler = (data) => {
    spawnErrorNotification(data.message || "Невідома помилка!");
  };

  const calcButtonClickHandler = async () => {
    if (!isCalculateButtonPressed) {
      setIsCalculateButtonPressed(true);
    }

    if (isUserDataValid(inputElements.current)) {
      const incomeFormation = {
        branchesData,
        branchesSegments: inputValues,
      };

      setIncomeData({ branchesSegments: inputValues });
      setIsRequestSending(true);

      await sendBranchesData(
        incomeFormation,
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
    <>
      <h3 className="data__container-heading">
        Таблиця даних ділянок розгалуженої газової мережі
      </h3>
      <div
        className="data__container data__container--segments"
        ref={sectionRef}
      >
        <table className="data__table data__table--branches-segments">
          <thead className="data__table-head">
            <tr>
              <td className="data__table-cell data__table-cell--number">
                Номер
              </td>
              <td className="data__table-cell data__table-cell--segment">
                Ділянка
              </td>
              <td className="data__table-cell data__table-cell--consumption">
                Витрата
              </td>
              <td className="data__table-cell data__table-cell--length">
                Довжина
              </td>
              {branchesData.calcType === `SEGMENT` && (
                <td className="data__table-cell data__table-cell--start-pressure">
                  Тиск на початку ділянки
                </td>
              )}
            </tr>
          </thead>

          <tbody className="data__table-body">
            {inputValues.segments.map((item, index) => (
              <IncomeBranchesSegmentRow
                key={item.uniqId}
                data={item}
                segment={index + 1}
                placeholders={item.placeholders}
                refItems={inputElements}
                pressureType={branchesData.pressureType}
                calcType={branchesData.calcType}
                onInputChange={inputChangeHandler}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="data__footer">
        <div className="data__footer-item">
          <span className="data__legend">Тип газопроводів</span>
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
    </>
  );
};

export default IncomeBranchesSegments;
