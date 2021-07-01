import { useContext, useState, useRef, useEffect } from "react";

import CalculationDataContext from "../../store/calculation-data-context";

import useFormValidation from "../../hooks/useFormValidation";
import useInvalidShake from "../../hooks/useInvalidShake";
import useNotification from "../../hooks/useNotification";
import useLocalStorage from "../../hooks/useLocalStorage";

import IncomeConsumptionsItem from "./income-consumptions-item";

import { SHAKE_ANIMATION_TIMEOUT, LocalStorage } from "../../utils/const";

const IncomeConsumptionsConfiguration = ({
  currentCalculation,
  basisRoutesAmount,
  configurationFields,
  setIsNextSectionShow,
  sendConsumptionsData,
}) => {
  const { setIncomeData } = useContext(CalculationDataContext);

  const { isUserDataValid, checkInputValidity } = useFormValidation();
  const { toggleShake } = useInvalidShake(SHAKE_ANIMATION_TIMEOUT);
  const { spawnErrorNotification } = useNotification();

  const initialValues = [...Array(basisRoutesAmount)].reduce(
    (acc, item, index) => ({
      ...acc,
      ...configurationFields.reduce(
        (prev, field) => ({
          ...prev,
          [`${field.id}-${index}`]: "",
        }),
        {}
      ),
    }),
    {}
  );
  const [cachedValues, setCacheValues] = useLocalStorage(
    LocalStorage[currentCalculation].CONSUMPTIONS_CONFIG,
    initialValues
  );

  const [inputConfigValues, setInputConfigValues] = useState(cachedValues);

  const [isBuildButtonPressed, setIsBuildButtonPressed] = useState(false);
  const [isRequestSending, setIsRequestSending] = useState(false);

  const sectionRef = useRef();
  const inputElements = useRef([]);

  useEffect(() => {
    if (cachedValues && Object.keys(cachedValues).length > 0) {
      const slicedCache =
        basisRoutesAmount === 0
          ? cachedValues
          : [...Array(basisRoutesAmount)].reduce(
              (acc, item, index) => ({
                ...acc,
                ...configurationFields.reduce(
                  (prev, field) => ({
                    ...prev,
                    [`${field.id}-${index}`]:
                      cachedValues[`${field.id}-${index}`] || "",
                  }),
                  {}
                ),
              }),
              {}
            );

      setInputConfigValues(slicedCache);
    }

    inputElements.current = inputElements.current.slice(0, basisRoutesAmount);
  }, [basisRoutesAmount]); // eslint-disable-line

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
    setIncomeData({ segmentsConfig: data });
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

      await sendConsumptionsData(
        inputConfigValues,
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
        Конфігурація ділянок основних напрямів
      </h3>
      <div
        className="data__container data__container--configuration"
        ref={sectionRef}
      >
        {[...Array(basisRoutesAmount)].map((item, index) =>
          configurationFields.map((field) => (
            <IncomeConsumptionsItem
              key={field.id}
              definition={`${field.definition}<sub>${index + 1}</sub>`}
              label={`${field.label}${index + 1}`}
              id={`${field.id}-${index}`}
              placeholder={field.placeholder}
              min={field.min}
              max={field.max}
              step={field.step}
              dimension={field.dimension}
              value={inputConfigValues[`${field.id}-${index}`] || ""}
              refItem={(element) =>
                inputElements.current.splice(index, 1, element)
              }
              onInputChange={inputChangeHandler}
            />
          ))
        )}
        <div className="data__item">
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

export default IncomeConsumptionsConfiguration;
