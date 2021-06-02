const SiteHeader = ({ currentPage, onNavigationOpenClick }) => (
  <header id="site-header" className="site-header">
    <button
      className="hamburger hamburger--squeeze"
      type="button"
      onClick={onNavigationOpenClick}
    >
      <span className="hamburger-box">
        <span className="hamburger-inner"></span>
      </span>
    </button>

    <nav className="site-nav">
      <ul className="site-nav__list">
        <li className="site-nav__item">
          <button
            className="site-nav__button site-nav__button--current site-nav__button--intro"
            type="button"
            data-section="intro"
          >
            <span className="site-nav__button--text">Вступ</span>
          </button>
        </li>
        <li className="site-nav__item">
          <button
            className="site-nav__button site-nav__button--income-data"
            type="button"
            data-section="income-data"
          >
            <span className="site-nav__button--text site-nav__button--text-desktop">
              Вихідні дані
            </span>
            <span className="site-nav__button--text site-nav__button--text-mobile">
              Дані
            </span>
          </button>
        </li>
        <li className="site-nav__item">
          <button
            className="site-nav__button site-nav__button--income-segments"
            type="button"
            data-section="income-stations"
            disabled
          >
            <span className="site-nav__button--text">Станції</span>
          </button>
        </li>
        <li className="site-nav__item">
          <button
            className="site-nav__button site-nav__button--results"
            type="button"
            data-section="results"
            disabled
          >
            <span className="site-nav__button--text">Результати</span>
          </button>
        </li>
      </ul>
    </nav>

    <div className="site-header__donate">
      <a
        className="site-header__donate-link"
        href="https://donatello.to/embyth"
        target="_blank"
        title="Придбати автору каву"
      >
        <svg className="site-header__donate-svg" width="25" height="25">
          <use xlinkHref="assets/img/sprite.svg#icon-coffee"></use>
        </svg>
      </a>
    </div>
  </header>
);

export default SiteHeader;
