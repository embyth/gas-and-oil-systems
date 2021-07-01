import { useContext, useEffect, useState, useRef } from "react";

import ScreenContext from "../../store/screen-context";
import CalculationDataContext from "../../store/calculation-data-context";

import useFormValidation from "../../hooks/useFormValidation";
import useInvalidShake from "../../hooks/useInvalidShake";
import useLocalStorage from "../../hooks/useLocalStorage";

import IncomeConsumptionsSegmentsRow from "./income-consumptions-segments-row";

import { SHAKE_ANIMATION_TIMEOUT, LocalStorage } from "../../utils/const";

const IncomeConsumptionsSegments = ({
  currentCalculation,
  totalLength,
  segmentFields,
  specificTravelGasConsumption,
  nextScreenId,
}) => {
  const { changeScreen } = useContext(ScreenContext);
  const { getIncomeData, setResults } = useContext(CalculationDataContext);

  const { isUserDataValid, checkInputValidity } = useFormValidation();
  const { toggleShake } = useInvalidShake(SHAKE_ANIMATION_TIMEOUT);

  const { segmentsConfig } = getIncomeData();

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
  const [cachedValues, setCacheValues] = useLocalStorage(
    LocalStorage[currentCalculation].CONSUMPTIONS_SEGMENTS,
    initialValues
  );

  const [inputValues, setInputValues] = useState(cachedValues);
  const [isContinueButtonPressed, setIsContinueButtonPressed] = useState(false);

  const sectionRef = useRef();
  const inputElements = useRef([]);

  const calculateSegmentConsumptions = (segment) => {
    const { length, "consumption-transit": consumptionTransit } = segment;

    const pathConsumption = +(
      (specificTravelGasConsumption / totalLength) *
      +length
    ).toFixed(2);

    const calcedConsumption = +(
      +consumptionTransit +
      0.5 * pathConsumption
    ).toFixed(2);

    return {
      ...segment,
      "consumption-path": pathConsumption,
      "consumption-calc": calcedConsumption,
    };
  };

  useEffect(() => {
    if (cachedValues && Object.keys(cachedValues).length > 0) {
      const updatedCache = segmentsConfig
        ? segmentsConfig.map((segment, index) =>
            cachedValues[index]
              ? calculateSegmentConsumptions(cachedValues[index])
              : segmentFields.reduce(
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
        : cachedValues;

      setInputValues(updatedCache);
      setCacheValues(updatedCache);
    }
  }, [segmentsConfig]); // eslint-disable-line

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

    const calcedSegment =
      name === "segment"
        ? updatedSegment
        : calculateSegmentConsumptions(updatedSegment);

    const updatedValues = [
      ...inputValues.slice(0, +segment),
      calcedSegment,
      ...inputValues.slice(+segment + 1),
    ];

    if (isContinueButtonPressed) {
      checkInputValidity(evt.target);
    }

    setInputValues(updatedValues);
    setCacheValues(updatedValues);
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
