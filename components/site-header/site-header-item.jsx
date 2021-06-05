import { useContext } from "react";

import ScreenContext from "../../store/screen-context";

const SiteHeaderItem = ({ screenInfo }) => {
  const { currentScreenId, changeScreen } = useContext(ScreenContext);

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
        <span className="site-nav__button--text">{screenInfo.label}</span>
      </button>
    </li>
  );
};

export default SiteHeaderItem;
