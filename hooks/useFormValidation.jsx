import { ErrorMessage } from "../utils/const";
/**
 * useFormValidation - form validation hook for data inputs
 */
export default function useFormValidation() {
  const highlightInput = (input) => {
    input.classList.add(`data__input--error`);
  };

  const resetHighlightInput = (input) => {
    input.classList.remove(`data__input--error`);
  };

  const checkInputValidity = (input) => {
    if (input.validity.valueMissing) {
      input.setCustomValidity(ErrorMessage.VALUE_MISSING);
      input.reportValidity();
      highlightInput(input);
    } else if (input.validity.rangeUnderflow) {
      input.setCustomValidity(ErrorMessage.RANGE_UNDERFLOW + input.min);
      input.reportValidity();
      highlightInput(input);
    } else if (input.validity.rangeOverflow) {
      input.setCustomValidity(ErrorMessage.RANGE_OVERFLOW + input.max);
      input.reportValidity();
      highlightInput(input);
    } else {
      input.setCustomValidity(``);
      resetHighlightInput(input);
    }
  };

  const isUserDataValid = (inputs) => {
    const notValidInputs = [];

    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        highlightInput(input);
        notValidInputs.push(input);
      }
    });

    if (notValidInputs.length) {
      checkInputValidity(notValidInputs[0]);
    }

    return notValidInputs.length === 0;
  };

  return {
    checkInputValidity,
    isUserDataValid,
  };
}
