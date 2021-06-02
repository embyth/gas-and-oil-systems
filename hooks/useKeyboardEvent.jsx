import { useEffect } from "react";
/**
 * useKeyPress
 * @param {string} key - the name of the key to respond to, compared against event.key
 * @param {function} callback - the action to perform on key press
 * @param {boolean} condition - should handler be added on document
 */
export default function useKeyboardEvent(key, callback, condition = true) {
  useEffect(() => {
    const keydownHandler = (evt) => {
      if (evt.key === key) {
        callback();
      }
    };

    if (condition) {
      document.addEventListener("keydown", keydownHandler);
    }

    return () => document.removeEventListener("keydown", keydownHandler);
  }, [condition]);
}
