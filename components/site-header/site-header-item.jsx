import { useContext } from "react";

import ScreenContext from "../../store/screen-context";

import useWindowSize from "../../hooks/useWindowSize";

const SiteHeaderItem = ({ screenInfo }) => {
  const { currentScreenId, changeScreen } = useContext(ScreenContext);

  const { isTablet, isMobile } = useWindowSize();

  return (
    <li className="site-nav__item">
      <button
        className={`site-nav__button ${
          screenInfo.id === currentScreenId ? `site-nav__button--current` : ``
        }`}
        type="button"
        disabled={screenInfo.isDisabled}
        onClick={() => changeScreen(screenInfo.id)}
      >
        <span className="site-nav__button--text">
          {isTablet || isMobile
            ? screenInfo.labelCropped || screenInfo.label
            : screenInfo.label}
        </span>
      </button>
    </li>
  );
};

export default SiteHeaderItem;
