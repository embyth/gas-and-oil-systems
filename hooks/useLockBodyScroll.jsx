import { useLayoutEffect, useEffect } from "react";
/**
 * useLockBodyScroll - locking body scroll on component mount or condition
 * @param {boolean} shouldLock - should body be locked on passed condition
 */
export default function useLockBodyScroll(shouldLock = true) {
  const useIsomorphicLayoutEffect =
    typeof window === "undefined" ? useEffect : useLayoutEffect;

  useIsomorphicLayoutEffect(
    () => {
      // get original value of body
      const originalStyle = window.getComputedStyle(document.body).overflow;

      if (shouldLock) {
        // prevent scrolling on mount
        document.body.style.overflow = "hidden";
      }

      // re-enable scrolling when component unmounts
      return () => {
        document.body.style.overflow = originalStyle;
      };
    },
    [shouldLock] // dependencies array to ensures effect is running on dependencie change
  );
}
