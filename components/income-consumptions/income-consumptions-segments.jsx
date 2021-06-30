import { useContext, useEffect, useState, useRef } from "react";

import ScreenContext from "../../store/screen-context";
import CalculationDataContext from "../../store/calculation-data-context";

import useFormValidation from "../../hooks/useFormValidation";
import useInvalidShake from "../../hooks/useInvalidShake";

import IncomeConsumptionsSegmentsRow from "./income-consumptions-segments-row";

import { SHAKE_ANIMATION_TIMEOUT, LocalStorage } from "../../utils/const";

const IncomeConsumptionsSegments = ({
  currentCalculation,
  segmentFields,
  specificTravelGasConsumption,
  nextScreenId,
}) => {
  const { changeScreen } = useContext(ScreenContext);
  const { getIncomeData, setResults } = useContext(CalculationDataContext);

  const { isUserDataValid, checkInputValidity } = useFormValidation();
  const { toggleShake } = useInvalidShake(SHAKE_ANIMATION_TIMEOUT);

  const { segmentsConfig, "total-length": totalLength } = getIncomeData();

  const initialValues = segmentsConfig
    ? segmentsConfig.map((segment) =>
        segmentFields.reduce(
          (acc, item) => ({
            ...acc,
            [item.id]: "",
            uniqId: segment.uniqId,
            basisRoutesProps: segment.basisRoutesProps,
            placeholders: segment.placeholders,
          }),
          {}
        )
      )
    : [];
  const [inputValues, setInputValues] = useState(initialValues);
  const [isContinueButtonPressed, setIsContinueButtonPressed] = useState(false);

  const sectionRef = useRef();
  const inputElements = useRef([]);

  useEffect(() => {
    const cachedValues = JSON.parse(
      localStorage.getItem(LocalStorage[currentCalculation].CONSUMPTIONS)
    );

    if (
      cachedValues &&
      cachedValues.segments &&
      Object.keys(cachedValues.segments).length > 0
    ) {
      const updatedCache = segmentsConfig
        ? segmentsConfig.map((segment, index) =>
            segmentFields.reduce(
              (acc, item) => ({
                ...acc,
                [item.id]: cachedValues.segments[index]
                  ? cachedValues.segments[index][item.id]
                  : "",
                uniqId: segment.uniqId,
                basisRoutesProps: segment.basisRoutesProps,
                placeholders: segment.placeholders,
              }),
              {}
            )
          )
        : cachedValues.segments;

      setInputValues(updatedCache);
    }
  }, [currentCalculation, segmentsConfig, segmentFields]);

  const calculateConsumptions = (segment, name, value) => {
    const length = name === "length" ? +value : +inputValues[segment].length;
    const pathConsumption =
      name === "length"
        ? +((specificTravelGasConsumption / +totalLength) * length).toFixed(2)
        : +inputValues[segment]["consumption-path"];
    const transitConsumption =
      name === "consumption-transit"
        ? +value
        : +inputValues[segment]["consumption-transit"];

    const updatedValue = {
      ...inputValues[segment],
      [name]: value,

      "consumption-path":
        name === "length"
          ? pathConsumption
          : inputValues[segment]["consumption-path"],

      "consumption-calc":
        name === "consumption-transit" || name === "length"
          ? +(transitConsumption + 0.5 * pathConsumption).toFixed(2)
          : inputValues[segment]["consumption-calc"],
    };

    return updatedValue;
  };

  const inputChangeHandler = (evt) => {
    const {
      name,
      value,
      dataset: { segment },
    } = evt.target;

    const updatedValue = calculateConsumptions(segment, name, value);

    const updatedValues = [
      ...inputValues.slice(0, +segment),
      updatedValue,
      ...inputValues.slice(+segment + 1),
    ];

    if (isContinueButtonPressed) {
      checkInputValidity(evt.target);
    }

    setInputValues(updatedValues);

    const cachedValues = JSON.parse(
      localStorage.getItem(LocalStorage[currentCalculation].CONSUMPTIONS)
    );

    localStorage.setItem(
      LocalStorage[currentCalculation].CONSUMPTIONS,
      JSON.stringify({ ...cachedValues, segments: updatedValues })
    );
  };

  const continueButtonClickHandler = () => {
    if (!isContinueButtonPressed) {
      setIsContinueButtonPressed(true);
    }

    if (isUserDataValid(inputElements.current)) {
      setResults({ segmentsConsumptions: inputValues });
      changeScreen(nextScreenId);
    } else {
      toggleShake(sectionRef.current);
    }
  };

  return (
    <>
      <h3 className="data__container-heading">
        Таблиця витрат газу ділянок газової мережі
      </h3>
      <div
        className="data__container data__container--segments"
        ref={sectionRef}
      >
        <table className="data__table data__table--consumption-segments">
          <thead className="data__table-head">
            <tr>
              <td className="data__table-cell data__table-cell--number">
                Номер
              </td>
              <td className="data__table-cell data__table-cell--segment">
                Ділянка
              </td>
              <td className="data__table-cell data__table-cell--length">
                Довжина
              </td>
              <td className="data__table-cell data__table-cell--consumption-path">
                Шляхова витрата
              </td>
              <td className="data__table-cell data__table-cell--consumption-transit">
                Транзитна витрата
              </td>
              <td className="data__table-cell data__table-cell--consumption-calc">
                Розрахункова витрата
              </td>
            </tr>
          </thead>

          <tbody className="data__table-body">
            {inputValues.map((item, index) => (
              <IncomeConsumptionsSegmentsRow
                key={item.uniqId}
                data={item}
                segment={index + 1}
                basisRoutesProps={item.basisRoutesProps}
                placeholders={item.placeholders}
                refItems={inputElements}
                onInputChange={inputChangeHandler}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="data__item">
        <button
          className="button button--primary data__button data__button--continue"
          type="button"
          onClick={continueButtonClickHandler}
        >
          Продовжити
        </button>
      </div>
    </>
  );
};

export default IncomeConsumptionsSegments;
