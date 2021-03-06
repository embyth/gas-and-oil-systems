import { useEffect, useState, useRef, useCallback } from "react";
/**
 * useInvalidShake - shake animation on element with invalid inputs
 * @param {number} delay - animation duration in ms
 */
export default function useInvalidShake(delay) {
  const shakeTimeoutRef = useRef();

  const [isTriggered, setIsTriggered] = useState(false);
  const [element, setElement] = useState();

  const toggleShake = (shakeElement) => {
    setElement(shakeElement);
    setIsTriggered(true);
  };

  const shake = useCallback(() => {
    if (!element) {
      return;
    }

    element.style.animation = `shake ${delay / 1000}s`;
    shakeTimeoutRef.current = setTimeout(() => {
      element.style.animation = ``;
      setIsTriggered(false);
    }, delay);
  }, [delay, element]);

  useEffect(() => {
    if (isTriggered) {
      shake();
    }

    return () => clearTimeout(shakeTimeoutRef.current);
  }, [isTriggered, shake]);

  return { toggleShake };
}
