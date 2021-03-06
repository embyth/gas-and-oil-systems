import { useState, useRef, useEffect, useContext } from "react";

import CalculationTypeContext from "../../store/calculation-type-context";

import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import useFormValidation from "../../hooks/useFormValidation";
import useInvalidShake from "../../hooks/useInvalidShake";
import useLocalStorage from "../../hooks/useLocalStorage";

import IncomeDataItem from "./income-data-item";

import { SHAKE_ANIMATION_TIMEOUT, LocalStorage } from "../../utils/const";

const IncomeDataModal = ({
  incomeModalFields,
  updateInputValues,
  updateModalValidationStatus,
  validateOnOpen,
  updateValidateOnOpen,
  onModalClose,
}) => {
  const { currentCalculation } = useContext(CalculationTypeContext);

  const { isUserDataValid, checkInputValidity } = useFormValidation();
  const { toggleShake } = useInvalidShake(SHAKE_ANIMATION_TIMEOUT);
  useLockBodyScroll();

  const initialValues = incomeModalFields.reduce(
    (acc, item) =>
      item.isTriple
        ? {
            ...acc,
            [`${item.id}1`]: "",
            [`${item.id}2`]: "",
            [`${item.id}3`]: "",
          }
        : { ...acc, [item.id]: "" },
    {}
  );
  const [cachedValues, setCacheValues] = useLocalStorage(
    LocalStorage[currentCalculation].MODAL,
    initialValues
  );

  const [modalValues, setModalValues] = useState(cachedValues);
  const [isApplyButtonPressed, setIsApplyButtonPressed] = useState(false);

  const modalRef = useRef();
  const modalInputElements = useRef([]);

  useEffect(() => {
    let timer;
    if (validateOnOpen) {
      timer = setTimeout(() => {
        if (!isUserDataValid(modalInputElements.current)) {
          toggleShake(modalRef.current);
        }
      }, 500);
    }

    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const inputChangeHandler = (evt) => {
    const { id, value } = evt.target;

    if (isApplyButtonPressed || validateOnOpen) {
      checkInputValidity(evt.target);
    }

    const updatedValues = {
      ...modalValues,
      [id]: value,
    };

    setModalValues(updatedValues);
    updateModalValidationStatus(false);
    updateInputValues(id, value);
    setCacheValues(updatedValues);
  };

  const applyButtonClickHandler = () => {
    if (!isApplyButtonPressed) {
      setIsApplyButtonPressed(true);
    }

    if (isUserDataValid(modalInputElements.current)) {
      updateModalValidationStatus(true);
      updateValidateOnOpen(false);
      onModalClose();
    } else {
      toggleShake(modalRef.current);
    }
  };

  return (
    <div className="modal__container">
      <div
        className="modal__overlay"
        onClick={onModalClose}
        role="button"
        tabIndex="-1"
        onKeyDown={(evt) => {
          if (evt.key === `Enter`) {
            onModalClose();
          }
        }}
      />
      <div className="modal">
        <button
          type="button"
          className="button modal__close"
          title="??????????????"
          onClick={onModalClose}
        >
          <svg className="modal__close--svg" width="20" height="20">
            <use xlinkHref="assets/img/sprite.svg#icon-close" />
          </svg>
        </button>

        <h3 className="section-heading">?????????????????? ???????????? ??????</h3>
        <div className="modal__inner" ref={modalRef}>
          {incomeModalFields.map((item, index) => (
            <IncomeDataItem
              key={item.id}
              definition={item.definition}
              label={item.label}
              id={item.id}
              placeholder={item.placeholder}
              min={item.min}
              max={item.max}
              step={item.step}
              dimension={item.dimension}
              values={modalValues}
              isTriple={item.isTriple}
              refItem={(element) =>
                modalInputElements.current.splice(index, 1, element)
              }
              onInputChange={inputChangeHandler}
            />
          ))}

          <div className="data__item data__item--apply">
            <button
              type="button"
              className="button button--primary modal__apply"
              onClick={applyButtonClickHandler}
            >
              ??????????????????????
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeDataModal;
