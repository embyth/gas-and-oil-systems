import { useState, useRef, useEffect } from "react";

import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import useFormValidation from "../../hooks/useFormValidation";
import useInvalidShake from "../../hooks/useInvalidShake";

import IncomeDataItem from "./income-data-item";

import { SHAKE_ANIMATION_TIMEOUT, LocalStorage } from "../../utils/const";

const IncomeDataModal = ({
  incomeModalFields,
  updateInputValues,
  currentCalculation,
  updateModalValidationStatus,
  validateOnOpen,
  updateValidateOnOpen,
  onModalClose,
}) => {
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
  const [modalValues, setModalValues] = useState(initialValues);
  const [isApplyButtonPressed, setIsApplyButtonPressed] = useState(false);

  const modalRef = useRef();
  const modalInputElements = useRef([]);

  useEffect(() => {
    const cachedValues = JSON.parse(
      localStorage.getItem(LocalStorage[currentCalculation].MODAL)
    );

    if (cachedValues) {
      setModalValues({ ...modalValues, ...cachedValues });
    }

    let timer;
    if (validateOnOpen) {
      timer = setTimeout(() => {
        if (!isUserDataValid(modalInputElements.current)) {
          toggleShake(modalRef.current);
        }
      }, 500);
    }

    return () => clearTimeout(timer);
  }, []); // eslint-disable-line

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

    localStorage.setItem(
      LocalStorage[currentCalculation].MODAL,
      JSON.stringify(updatedValues)
    );
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
          title="Закрити"
          onClick={onModalClose}
        >
          <svg className="modal__close--svg" width="20" height="20">
            <use xlinkHref="assets/img/sprite.svg#icon-close" />
          </svg>
        </button>

        <h3 className="section-heading">Параметри вашого ГПА</h3>
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
              Підтвердити
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeDataModal;
