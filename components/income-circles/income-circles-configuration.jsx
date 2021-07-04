import { useContext, useState, useRef, useEffect } from "react";

import CalculationDataContext from "../../store/calculation-data-context";
import CalculationTypeContext from "../../store/calculation-type-context";

import useFormValidation from "../../hooks/useFormValidation";
import useInvalidShake from "../../hooks/useInvalidShake";
import useNotification from "../../hooks/useNotification";
import useLocalStorage from "../../hooks/useLocalStorage";

import IncomeCirclesItem from "./income-circles-item";

import { SHAKE_ANIMATION_TIMEOUT, LocalStorage } from "../../utils/const";

const IncomeCirclesConfiguration = ({
  basisRoutesAmount,
  circlesAmount,
  configurationFields,
  setIsNextSectionShow,
  sendSegmentsData,
}) => {
  const { currentCalculation } = useContext(CalculationTypeContext);
  const { setIncomeData } = useContext(CalculationDataContext);

  const { isUserDataValid, checkInputValidity } = useFormValidation();
  const { toggleShake } = useInvalidShake(SHAKE_ANIMATION_TIMEOUT);
  const { spawnErrorNotification } = useNotification();

  const initialValues = {
    ...[...Array(circlesAmount)].reduce(
      (acc, item, index) => ({
        ...acc,
        [`${configurationFields[0].id}-${index}`]: "",
      }),
      {}
    ),
    ...[...Array(basisRoutesAmount)].reduce(
      (acc, item, index) => ({
        ...acc,
        [`${configurationFields[1].id}-${index}`]: "",
      }),
      {}
    ),
  };
  const [cachedValues, setCacheValues] = useLocalStorage(
    LocalStorage[currentCalculation].CIRCLES_CONFIG,
    initialValues
  );

  const [inputConfigValues, setInputConfigValues] = useState(cachedValues);

  const [isBuildButtonPressed, setIsBuildButtonPressed] = useState(false);
  const [isRequestSending, setIsRequestSending] = useState(false);

  const sectionRef = useRef();
  const inputElements = useRef([]);

  useEffect(() => {
    if (cachedValues && Object.keys(cachedValues).length > 0) {
      const slicedSegmentsAmountCache = [...Array(circlesAmount)].reduce(
        (acc, item, index) => ({
          ...acc,
          [`${configurationFields[0].id}-${index}`]:
            cachedValues[`${configurationFields[0].id}-${index}`] || "",
        }),
        {}
      );

      const slicedRoutesLengthCache = [...Array(basisRoutesAmount)].reduce(
        (acc, item, index) => ({
          ...acc,
          [`${configurationFields[1].id}-${index}`]:
            cachedValues[`${configurationFields[1].id}-${index}`] || "",
        }),
        {}
      );

      const slicedCache = {
        ...slicedSegmentsAmountCache,
        ...slicedRoutesLengthCache,
      };

      setInputConfigValues(slicedCache);
      setIncomeData({ circlesConfig: slicedCache });
    }

    inputElements.current = inputElements.current.slice(
      0,
      circlesAmount + basisRoutesAmount
    );
  }, [basisRoutesAmount, circlesAmount]); // eslint-disable-line react-hooks/exhaustive-deps

  const createInputFields = () => {
    const circleSegmentsAmount = [...Array(circlesAmount)].map(
      (item, index) => ({
        ...configurationFields[0],
        id: `${configurationFields[0].id}-${index}`,
        definition: `${configurationFields[0].definition}<sub>${
          index + 1
        }</sub>`,
        label: `${configurationFields[0].label} ${index + 1}`,
      })
    );

    const basisRoutesLength = [...Array(basisRoutesAmount)].map(
      (item, index) => ({
        ...configurationFields[1],
        id: `${configurationFields[1].id}-${index}`,
        definition: `${configurationFields[1].definition}<sub>${
          index + 1
        }</sub>`,
        label: `${configurationFields[1].label} ${index + 1}`,
      })
    );

    return [...circleSegmentsAmount, ...basisRoutesLength];
  };

  const inputChangeHandler = (evt) => {
    const { id, value } = evt.target;

    const updatedValues = {
      ...inputConfigValues,
      [id]: value,
    };

    if (isBuildButtonPressed) {
      checkInputValidity(evt.target);
    }

    setInputConfigValues(updatedValues);
    setCacheValues(updatedValues);
  };

  const sendDataSuccessHandler = (data) => {
    setIncomeData({ circleSegmentsConfig: data });
  };

  const sendDataErrorHandler = (data) => {
    spawnErrorNotification(data.message || "Невідома помилка!");
  };

  const buildButtonClickHandler = async () => {
    if (!isBuildButtonPressed) {
      setIsBuildButtonPressed(true);
    }

    if (isUserDataValid(inputElements.current)) {
      setIsRequestSending(true);
      setIsNextSectionShow(false);

      await sendSegmentsData(
        { ...inputConfigValues, type: `circles` },
        sendDataSuccessHandler,
        sendDataErrorHandler
      );

      setIsRequestSending(false);
      setIsNextSectionShow(true);
    } else {
      toggleShake(sectionRef.current);
      setIsNextSectionShow(false);
    }
  };

  return (
    <>
      <h3 className="data__container-heading">
        Конфігурація ділянок в кільцях та основних напрямів
      </h3>
      <div
        className="data__container data__container--configuration"
        ref={sectionRef}
      >
        {createInputFields().map((item, index) => (
          <IncomeCirclesItem
            key={item.id}
            definition={item.definition}
            label={item.label}
            id={item.id}
            placeholder={item.placeholder}
            min={item.min}
            max={item.max}
            step={item.step}
            dimension={item.dimension}
            value={inputConfigValues[item.id] || ""}
            refItem={(element) =>
              inputElements.current.splice(index, 1, element)
            }
            onInputChange={inputChangeHandler}
          />
        ))}
        <div className="data__item data__item--button">
          <button
            className="button button--primary data__button data__button--next"
            type="button"
            disabled={isRequestSending}
            onClick={buildButtonClickHandler}
          >
            Побудувати таблицю
          </button>
        </div>
      </div>
    </>
  );
};

export default IncomeCirclesConfiguration;
