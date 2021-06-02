import { Fragment } from "react";
import Link from "next/link";

import { AVAILABLE_CALCULATIONS } from "../../utils/calculations";

const SiteNavigation = ({
  currentPage,
  isNavigationOpen,
  onNavigationCloseClick,
}) => {
  return (
    <Fragment>
      <div
        className={`site-aside__overlay ${
          isNavigationOpen ? `` : `site-aside__overlay--hidden`
        }`}
        onClick={onNavigationCloseClick}
      ></div>
      <aside
        id="site-aside"
        className={`site-aside ${isNavigationOpen ? `` : `site-aside--hidden`}`}
      >
        <button
          type="button"
          className="site-aside__close"
          title="Закрити"
          onClick={onNavigationCloseClick}
        >
          <svg className="site-aside__close--svg" width="20" height="20">
            <use xlinkHref="assets/img/sprite.svg#icon-close"></use>
          </svg>
        </button>

        <ul className="site-aside__links-list">
          <li
            className={`site-aside__links-item ${
              currentPage === AVAILABLE_CALCULATIONS.GAS_NETWORK
                ? `site-aside__links-item--active`
                : ``
            }`}
          >
            <Link href="/gas-network">
              Розрахунок системи газопостачання сільського населеного пункту
            </Link>
          </li>
          <li
            className={`site-aside__links-item ${
              currentPage === AVAILABLE_CALCULATIONS.GAS_TRANSMISSION
                ? `site-aside__links-item--active`
                : ``
            }`}
          >
            <Link href="/gas-transmission">
              Розрахунок режиму роботи газотранспортної системи
            </Link>
          </li>
          <li
            className={`site-aside__links-item ${
              currentPage === AVAILABLE_CALCULATIONS.GAS_INDOOR
                ? `site-aside__links-item--active`
                : ``
            }`}
          >
            <Link href="/gas-indoor">
              Розрахунок внутрішньо-будинкової газової мережі
            </Link>
          </li>
          <li
            className={`site-aside__links-item ${
              currentPage === AVAILABLE_CALCULATIONS.OIL_TRANSMISSION
                ? `site-aside__links-item--active`
                : ``
            }`}
          >
            <Link href="/oil-transmission">
              Технологічний розрахунок магістрального нафтопроводу
            </Link>
          </li>
        </ul>

        <div id="socials" className="socials">
          <ul className="socials__list">
            <li className="socials__item socials__item--telegram">
              <a href="https://t.me/embyth" target="_blank" title="Telegram">
                <svg className="socials__svg" width="20" height="20">
                  <use xlinkHref="assets/img/sprite.svg#icon-telegram"></use>
                </svg>
              </a>
            </li>
            <li className="socials__item socials__item--github">
              <a
                href="https://github.com/embyth"
                target="_blank"
                title="GitHub"
              >
                <svg className="socials__svg" width="20" height="20">
                  <use xlinkHref="assets/img/sprite.svg#icon-github"></use>
                </svg>
              </a>
            </li>
            <li className="socials__item socials__item--instagram">
              <a
                href="https://instagram.com/rostyslavminiukov"
                target="_blank"
                title="Instagram"
              >
                <svg className="socials__svg" width="20" height="20">
                  <use xlinkHref="assets/img/sprite.svg#icon-instagram"></use>
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <div className="mentions">
          <ul className="mentions__list">
            <li className="mentions__item">
              <a
                href="https://nung.edu.ua"
                target="_blank"
                title="Сайт ІФНТУНГ"
              >
                <img
                  className="mentions__logo mentions__logo--nung"
                  src="assets/img/nung-logo.png"
                  alt="Логотип ІФНТУНГ"
                />
              </a>
            </li>
            <li className="mentions__item">
              <a
                href="https://www.nung.edu.ua/department/%D0%BD%D0%B0%D1%84%D1%82%D0%BE%D0%B3%D0%B0%D0%B7%D0%BE%D0%BF%D1%80%D0%BE%D0%B2%D0%BE%D0%B4%D1%96%D0%B2/tzng"
                target="_blank"
                title="Сайт кафедри ТЗНГ"
              >
                <img
                  className="mentions__logo mentions__logo--gnps"
                  src="assets/img/gnps-logo.png"
                  alt="Логотип кафедри ГНПС"
                />
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </Fragment>
  );
};

export default SiteNavigation;
