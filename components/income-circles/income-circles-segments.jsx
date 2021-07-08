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
import { PipeType } from "../../calculations/gas-network/const";

const IncomeCirclesSegments = ({
  segmentFields,
  nextScreenId,
  pipeType,
  onPipeTypeChange,
  sendCirclesData,
}) => {
  const { currentCalculation } = useContext(CalculationTypeContext);
  const { changeScreen } = useContext(ScreenContext);
  const { getIncomeData, setIncomeData, getResults, setResults } = useContext(
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
    }
  }, [circleSegmentsConfig]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    inputElements.current = inputElements.current.slice(
      0,
      inputValues.length * 5
    );
  }, [inputValues]);

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

  const calcButtonClickHandler = async () => {
    if (!isContinueButtonPressed) {
      setIsContinueButtonPressed(true);
    }

    if (isUserDataValid(inputElements.current)) {
      const { "physical-properties": physicsProps } = getResults();
      const { networkConfig, circlesConfig } = getIncomeData();

      const incomeFormation = {
        physicsProps: {
          normalDensity: physicsProps.RoN,
          kinematicViscosity: physicsProps.nyu,
        },
        networkConfig,
        circlesConfig,
        circlesSegments: inputValues,
      };

      setIncomeData({ circlesSegments: inputValues });
      setIsRequestSending(true);

      await sendCirclesData(
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
              onChange={onPipeTypeChange}
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
              onChange={onPipeTypeChange}
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

export default IncomeCirclesSegments;
