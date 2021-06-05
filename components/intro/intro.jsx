import { useContext } from "react";
import Link from "next/link";

import ScreenContext from "../../store/screen-context";

const Intro = ({ info, nextScreenId }) => {
  const { changeScreen } = useContext(ScreenContext);

  return (
    <section id="intro" className="intro">
      <div className="section__container">
        <h1 className="site-heading">{info.heading}</h1>

        <p className="intro__text">{info.text}</p>

        <div className="intro__buttons">
          <Link href={info.detailsHref}>
            <a className="button button--secondary intro__button intro__button--info">
              Інформація
            </a>
          </Link>
          <button
            className="button button--primary intro__button intro__button--begin"
            type="button"
            onClick={() => changeScreen(nextScreenId)}
          >
            Почати
          </button>
        </div>
      </div>
    </section>
  );
};

export default Intro;
