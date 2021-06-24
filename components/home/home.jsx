import { useContext } from "react";

import NavigationContext from "../../store/navigation-context";

const Home = () => {
  const { openNavigation } = useContext(NavigationContext);

  return (
    <section id="intro" className="intro">
      <div className="section__container">
        <h1 className="site-heading">
          Сервіс для розрахунку режимів роботи нафто-, газопроводів, газових
          мереж та внутрішньобудинкових газових мереж
        </h1>

        <p className="intro__text">
          Веб-сервіс з розрахунками, які я проводив коли навчався на кафедрі
          газонафтопроводів та газонафтосховищ для курсових та самостійних робіт
          в Івано-Франківському національному технічному університеті нафти і
          газу з таких дисциплін як проектування та експлуатація газових мереж,
          проектування та експлуатація компресорних станцій, проектування та
          експлуатація нафтопроводів. Якщо ви маєте запитання або знайшли
          помилку
          <a
            className="issue__link"
            href="https://github.com/embyth/gas-and-oil-systems/issues"
            target="_blank"
            rel="noreferrer"
          >
            клікайте сюди
          </a>
          та опишіть свою проблему. Був радий вам допомогти
        </p>

        <div className="intro__buttons">
          <button
            className="button button--secondary intro__button intro__button--info"
            type="button"
            onClick={openNavigation}
          >
            Вибрати розрахунок
          </button>

          <a
            href="https://donatello.to/embyth"
            target="_blank"
            className="button button--primary intro__button intro__button--begin"
            rel="noreferrer"
          >
            Подякувати автору
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
