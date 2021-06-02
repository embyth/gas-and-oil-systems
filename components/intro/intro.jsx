const Intro = () => (
  <section id="intro" className="intro">
    <div className="section__container">
      <h1 className="site-heading">
        Розрахунок пропускної здатності магістрального нафтопроводу
      </h1>

      <p className="intro__text">
        Розрахунок режимів експлуатації нафтопроводу передбачає визначення
        тисків нафти на виході нафтоперекачувальних станцій, підпорів перед ними
        і продуктивності нафтопроводу за умов, що відрізняються від
        розрахункових. Розв’язується також питання про регулювання режимів
        роботи нафтопроводу з метою забезпечення проектних режимів його роботи.
      </p>

      <div className="intro__buttons">
        <a
          className="button button--secondary intro__button intro__button--info"
          href="https://github.com/embyth/oil-transmission-system#readme"
          target="_blank"
        >
          Інформація
        </a>
        <button
          className="button button--primary intro__button intro__button--begin"
          type="button"
        >
          Почати
        </button>
      </div>
    </div>
  </section>
);

export default Intro;
