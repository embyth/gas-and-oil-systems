import Link from "next/link";

const DetailsHeader = ({ calculationHref, date }) => {
  const toHumanDate = (dateString) =>
    new Date(dateString).toLocaleString(`uk-UA`, {
      year: `numeric`,
      month: `long`,
      day: `numeric`,
    });

  return (
    <div className="details-header">
      <Link href={calculationHref}>
        <a className="details-header__link" title="Повернутися до розрахунку">
          <svg className="details-header__link-svg" width="25" height="25">
            <use xlinkHref="assets/img/sprite.svg#icon-back" />
          </svg>
        </a>
      </Link>

      <span
        className="details-header__date"
        title={`Востаннє відредаговано: ${toHumanDate(date)}`}
      >
        <svg className="details-header__date-svg" width="25" height="25">
          <use xlinkHref="assets/img/sprite.svg#icon-date" />
        </svg>
      </span>
    </div>
  );
};

export default DetailsHeader;
