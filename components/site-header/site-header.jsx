import { useContext } from "react";

import ScreenContext from "../../store/screen-context";

import SiteHeaderItem from "./site-header-item";

const SiteHeader = ({ onNavigationOpenClick }) => {
  const { screensState } = useContext(ScreenContext);

  return (
    <header id="site-header" className="site-header">
      <button
        className="hamburger hamburger--squeeze"
        type="button"
        onClick={onNavigationOpenClick}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner" />
        </span>
      </button>

      {screensState.length > 0 && (
        <nav className="site-nav">
          <ul className="site-nav__list">
            {screensState.map((item) => (
              <SiteHeaderItem key={item.id} screenInfo={item} />
            ))}
          </ul>
        </nav>
      )}

      <div className="site-header__donate">
        <a
          className="site-header__donate-link"
          href="https://donatello.to/embyth"
          target="_blank"
          title="Придбати автору каву"
          rel="noreferrer"
        >
          <svg className="site-header__donate-svg" width="25" height="25">
            <use xlinkHref="assets/img/sprite.svg#icon-coffee" />
          </svg>
        </a>
      </div>
    </header>
  );
};

export default SiteHeader;
