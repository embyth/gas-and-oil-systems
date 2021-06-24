import { useContext } from "react";
import Link from "next/link";

import NavigationContext from "../../store/navigation-context";

import { AvailableCalculation } from "../../utils/const";

const SiteNavigation = ({ currentCalculation }) => {
  const { isNavigationOpen, closeNavigation } = useContext(NavigationContext);

  return (
    <>
      <div
        className={`site-aside__overlay ${
          isNavigationOpen ? `` : `site-aside__overlay--hidden`
        }`}
        onClick={closeNavigation}
        role="button"
        tabIndex="-1"
        onKeyDown={(evt) => {
          if (evt.key === `Enter`) {
            closeNavigation();
          }
        }}
      />
      <aside
        id="site-aside"
        className={`site-aside ${isNavigationOpen ? `` : `site-aside--hidden`}`}
      >
        <button
          type="button"
          className="site-aside__close"
          title="Закрити"
          onClick={closeNavigation}
        >
          <svg className="site-aside__close--svg" width="20" height="20">
            <use xlinkHref="assets/img/sprite.svg#icon-close" />
          </svg>
        </button>

        <ul className="site-aside__links-list">
          <li
            className={`site-aside__links-item ${
              currentCalculation === AvailableCalculation.GAS_NETWORK
                ? `site-aside__links-item--active`
                : ``
            }`}
          >
            <Link href="/gas-network">
              <a
                className={`${
                  currentCalculation === AvailableCalculation.GAS_NETWORK
                    ? `site-aside__links-item--disabled`
                    : ``
                }`}
              >
                Розрахунок системи газопостачання сільського населеного пункту
              </a>
            </Link>
          </li>
          <li
            className={`site-aside__links-item ${
              currentCalculation === AvailableCalculation.GAS_TRANSMISSION
                ? `site-aside__links-item--active`
                : ``
            }`}
          >
            <Link href="/gas-transmission">
              <a
                className={`${
                  currentCalculation === AvailableCalculation.GAS_TRANSMISSION
                    ? `site-aside__links-item--disabled`
                    : ``
                }`}
              >
                Розрахунок режиму роботи газотранспортної системи
              </a>
            </Link>
          </li>
          <li
            className={`site-aside__links-item ${
              currentCalculation === AvailableCalculation.GAS_INDOOR
                ? `site-aside__links-item--active`
                : ``
            }`}
          >
            <Link href="/gas-indoor">
              <a
                className={`${
                  currentCalculation === AvailableCalculation.GAS_INDOOR
                    ? `site-aside__links-item--disabled`
                    : ``
                }`}
              >
                Розрахунок внутрішньо-будинкової газової мережі
              </a>
            </Link>
          </li>
          <li
            className={`site-aside__links-item ${
              currentCalculation === AvailableCalculation.OIL_TRANSMISSION
                ? `site-aside__links-item--active`
                : ``
            }`}
          >
            <Link href="/oil-transmission">
              <a
                className={`${
                  currentCalculation === AvailableCalculation.OIL_TRANSMISSION
                    ? `site-aside__links-item--disabled`
                    : ``
                }`}
              >
                Технологічний розрахунок магістрального нафтопроводу
              </a>
            </Link>
          </li>
        </ul>

        <div id="socials" className="socials">
          <ul className="socials__list">
            <li className="socials__item socials__item--telegram">
              <a
                href="https://t.me/embyth"
                target="_blank"
                title="Telegram"
                rel="noreferrer"
              >
                <svg className="socials__svg" width="20" height="20">
                  <use xlinkHref="assets/img/sprite.svg#icon-telegram" />
                </svg>
              </a>
            </li>
            <li className="socials__item socials__item--github">
              <a
                href="https://github.com/embyth"
                target="_blank"
                title="GitHub"
                rel="noreferrer"
              >
                <svg className="socials__svg" width="20" height="20">
                  <use xlinkHref="assets/img/sprite.svg#icon-github" />
                </svg>
              </a>
            </li>
            <li className="socials__item socials__item--instagram">
              <a
                href="https://instagram.com/rostyslavminiukov"
                target="_blank"
                title="Instagram"
                rel="noreferrer"
              >
                <svg className="socials__svg" width="20" height="20">
                  <use xlinkHref="assets/img/sprite.svg#icon-instagram" />
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
                rel="noreferrer"
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
                href="https://www.nung.edu.ua/department/institut-naftogazovoi-inzhenerii/kafedra-gazonaftoprovodiv-ta-gazonaftoskhovisch"
                target="_blank"
                title="Сайт кафедри ТЗНГ"
                rel="noreferrer"
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

        <div className="issue">
          <a
            href="https://github.com/embyth/gas-and-oil-systems/issues"
            target="_blank"
            rel="noreferrer"
          >
            Знайшли помилку?
          </a>
        </div>
      </aside>
    </>
  );
};

export default SiteNavigation;
