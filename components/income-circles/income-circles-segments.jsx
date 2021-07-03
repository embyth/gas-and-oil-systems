import { useContext, useEffect, useState, useRef } from "react";

import ScreenContext from "../../store/screen-context";
import CalculationDataContext from "../../store/calculation-data-context";
import CalculationTypeContext from "../../store/calculation-type-context";

import useFormValidation from "../../hooks/useFormValidation";
import useInvalidShake from "../../hooks/useInvalidShake";
import useNotification from "../../hooks/useNotification";
import useLocalStorage from "../../hooks/useLocalStorage";

import IncomeCirclesSegmentRow from "./income-circles-segment-row";

import { SHAKE_ANIMATION_TIMEOUT, LocalStorage } from "../../utils/const";

const IncomeCirclesSegments = ({
  segmentFields,
  nextScreenId,
  sendCirclesData,
}) => {
  const { currentCalculation } = useContext(CalculationTypeContext);
  const { changeScreen } = useContext(ScreenContext);
  const { getIncomeData, setIncomeData, setResults } = useContext(
    CalculationDataContext
  );

  const { isUserDataValid, checkInputValidity } = useFormValidation();
  const { toggleShake } = useInvalidShake(SHAKE_ANIMATION_TIMEOUT);
  const { spawnErrorNotification } = useNotification();

  const { circleSegmentsConfig } = getIncomeData();

  const initialValues = circleSegmentsConfig
    ? circleSegmentsConfig.map((segment) =>
        segmentFields.reduce(
          (acc, item) => ({
            ...acc,
            [item.id]: "",
            uniqId: segment.uniqId,
            segmentProps: segment.segmentProps,
            placeholders: segment.placeholders,
          }),
          {}
        )
      )
    : [];
  const [cachedValues, setCacheValues] = useLocalStorage(
    LocalStorage[currentCalculation].CIRCLES_SEGMENTS,
    initialValues
  );

  const [inputValues, setInputValues] = useState(cachedValues);
  const [isContinueButtonPressed, setIsContinueButtonPressed] = useState(false);
  const [isRequestSending, setIsRequestSending] = useState(false);

  const sectionRef = useRef();
  const inputElements = useRef([]);

  useEffect(() => {
    if (cachedValues && cachedValues.length > 0) {
      const updatedCache = circleSegmentsConfig
        ? circleSegmentsConfig.map((segment, index) =>
            segmentFields.reduce(
              (acc, item) => ({
                ...acc,
                [item.id]: cachedValues[index]
                  ? cachedValues[index][item.id]
                  : "",
                uniqId: segment.uniqId,
                segmentProps: segment.segmentProps,
                placeholders: segment.placeholders,
              }),
              {}
            )
          )
        : cachedValues;

      setInputValues(updatedCache);
      setCacheValues(updatedCache);
    }
  }, [circleSegmentsConfig]); // eslint-disable-line react-hooks/exhaustive-deps

  const inputChangeHandler = (evt) => {
    const {
      name,
      value,
      dataset: { segment },
    } = evt.target;

    const updatedSegment = {
      ...inputValues[segment],
      [name]: value,
    };

    const updatedValues = [
      ...inputValues.slice(0, +segment),
      updatedSegment,
      ...inputValues.slice(+segment + 1),
    ];

    if (isContinueButtonPressed) {
      checkInputValidity(evt.target);
    }

    setInputValues(updatedValues);
    setCacheValues(updatedValues);
  };

  const sendDataSuccessHandler = (data) => {
    setResults(data);
  };

  const sendDataErrorHandler = (data) => {
    spawnErrorNotification(data.message || "Невідома помилка!");
  };

  const continueButtonClickHandler = async () => {
    if (!isContinueButtonPressed) {
      setIsContinueButtonPressed(true);
    }

    if (isUserDataValid(inputElements.current)) {
      setIncomeData({ circlesSegments: inputValues });
      setIsRequestSending(true);

      await sendCirclesData(
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
    <>
      <h3 className="data__container-heading">
        Таблиця даних ділянок кільцевої газової мережі
      </h3>
      <div
        className="data__container data__container--segments"
        ref={sectionRef}
      >
        <table className="data__table data__table--circles-segments">
          <thead className="data__table-head">
            <tr>
              <td className="data__table-cell data__table-cell--number">
                Номер
              </td>
              <td className="data__table-cell data__table-cell--segment">
                Ділянка
              </td>
              <td className="data__table-cell data__table-cell--consumption-calc">
                Розрахункова витрата
              </td>
              <td className="data__table-cell data__table-cell--length">
                Довжина
              </td>
              <td className="data__table-cell data__table-cell--neighbor-circle-num">
                Номер сусіднього кільця
              </td>
              <td className="data__table-cell data__table-cell--basis-route-num">
                Номер основного напряму
              </td>
            </tr>
          </thead>

          <tbody className="data__table-body">
            {inputValues.map((item, index) => (
              <IncomeCirclesSegmentRow
                key={item.uniqId}
                data={item}
                segment={index + 1}
                segmentProps={item.segmentProps}
                placeholders={item.placeholders}
                refItems={inputElements}
                onInputChange={inputChangeHandler}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="data__item data__item--button">
        <button
          className="button button--primary data__button data__button--continue"
          type="button"
          disabled={isRequestSending}
          onClick={continueButtonClickHandler}
        >
          Розрахувати
        </button>
      </div>
    </>
  );
};

export default IncomeCirclesSegments;
