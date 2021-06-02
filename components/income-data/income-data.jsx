import IncomeDataItem from "../income-data-item/income-data-item";

const IncomeData = ({ incomeInputFields }) => (
  <section id="income-data" className="income-data">
    <div className="section__container">
      <h2 className="section-heading">Вихідні дані для розрахунку</h2>

      <fieldset className="data__fieldset">
        <div className="data__fieldset-replacer">
          <div className="data__container">
            {incomeInputFields.map((item) => (
              <IncomeDataItem key={item.id} {...item} />
            ))}
            <div className="data__item">
              <button
                className="button button--primary data__button data__button--next"
                type="button"
              >
                Далі
              </button>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  </section>
);

export default IncomeData;
