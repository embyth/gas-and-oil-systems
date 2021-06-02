const IncomeStations = () => (
  <section id="income-stations" className="income-stations">
    <div className="section__container">
      <h2 className="section-heading">Вихідні дані для станцій нафтопроводу</h2>

      <fieldset className="data__fieldset">
        <div className="data__fieldset-replacer">
          <div className="data__container data__container--stations">
            <table className="data__table data__table--stations">
              <thead className="data__table-head">
                <tr>
                  <td className="data__table-cell data__table-cell--station">
                    Станція
                  </td>
                  <td className="data__table-cell data__table-cell--length">
                    Довжина прилеглої ділянки
                  </td>
                  <td className="data__table-cell data__table-cell--geo-point">
                    Геодезична позначка станції
                  </td>
                  <td className="data__table-cell data__table-cell--pump-quant">
                    Кількість одночасно працюючих основних насосів
                  </td>
                  <td className="data__table-cell data__table-cell--min-pressure">
                    Мінімально допустимий тиск на вході
                  </td>
                  <td className="data__table-cell data__table-cell--max-pressure">
                    Максимально допустимий тиск на виході
                  </td>
                </tr>
              </thead>

              {/* {Income stations body} */}
            </table>
          </div>
          <button
            className="button button--primary data__button data__button--calc"
            type="button"
          >
            Розрахувати
          </button>
        </div>
      </fieldset>
    </div>
  </section>
);

export default IncomeStations;
