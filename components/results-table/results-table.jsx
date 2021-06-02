const ResultsTable = () => (
  <table className="data__table data__table--results">
    <thead className="data__table-head">
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Параметр
        </td>
        <td className="data__table-cell data__table-cell--marking">
          Позначення
        </td>
        <td className="data__table-cell data__table-cell--value">Значення</td>
        <td className="data__table-cell data__table-cell--dimension">
          Розмірність
        </td>
      </tr>
    </thead>
    <tbody className="data__table-body">
      <tr className="data__table-row data__table-row--full">
        <td colspan="4">
          Визначення розрахункових величин густини, в’язкості та витрати нафти
        </td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Температурна поправка
        </td>
        <td className="data__table-cell data__table-cell--marking">α</td>
        <td className="data__table-cell data__table-cell--value">
          {tempCorrection}
        </td>
        <td className="data__table-cell data__table-cell--dimension">
          кг/(м<sup>3</sup>·<sup>о</sup>С)
        </td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Густина нафти за температури перекачування
        </td>
        <td className="data__table-cell data__table-cell--marking">
          ρ<sub>t</sub>
        </td>
        <td className="data__table-cell data__table-cell--value">{density}</td>
        <td className="data__table-cell data__table-cell--dimension">
          кг/м<sup>3</sup>
        </td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Коефіцієнт крутизни віскограми
        </td>
        <td className="data__table-cell data__table-cell--marking">U</td>
        <td className="data__table-cell data__table-cell--value">
          ${viscosityCoef}
        </td>
        <td className="data__table-cell data__table-cell--dimension">
          1/<sup>о</sup>C
        </td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          В'язкість нафти за температури перекачування
        </td>
        <td className="data__table-cell data__table-cell--marking">ν</td>
        <td className="data__table-cell data__table-cell--value">
          {viscosity}
        </td>
        <td className="data__table-cell data__table-cell--dimension">
          м<sup>2</sup>/с
        </td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Розрахункове число робочих днів трубопроводу
        </td>
        <td className="data__table-cell data__table-cell--marking">N</td>
        <td className="data__table-cell data__table-cell--value">
          {workingDays}
        </td>
        <td className="data__table-cell data__table-cell--dimension">діб</td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Добовий об'єм перекачування
        </td>
        <td className="data__table-cell data__table-cell--marking">
          Q<sub>доб</sub>
        </td>
        <td className="data__table-cell data__table-cell--value">
          {dailyVolume}
        </td>
        <td className="data__table-cell data__table-cell--dimension">
          м<sup>3</sup>/добу
        </td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Годинна продуктивність нафтопроводу
        </td>
        <td className="data__table-cell data__table-cell--marking">
          Q<sub>год</sub>
        </td>
        <td className="data__table-cell data__table-cell--value">
          {hourlyVolume}
        </td>
        <td className="data__table-cell data__table-cell--dimension">
          м<sup>3</sup>/год
        </td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Секундна продуктивність нафтопроводу
        </td>
        <td className="data__table-cell data__table-cell--marking">
          Q<sub>сек</sub>
        </td>
        <td className="data__table-cell data__table-cell--value">
          {secondlyVolume}
        </td>
        <td className="data__table-cell data__table-cell--dimension">
          м<sup>3</sup>/с
        </td>
      </tr>
      <tr className="data__table-row data__table-row--full">
        <td colspan="4">
          Характеристика основного обладнання нафтоперекачувальної станції
        </td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Напір що створює один основний насос при заданій продуктивності
        </td>
        <td className="data__table-cell data__table-cell--marking">h</td>
        <td className="data__table-cell data__table-cell--value">
          {singleMainPumpPressure}
        </td>
        <td className="data__table-cell data__table-cell--dimension">м</td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Напір що створює один підпірний насос при заданій продуктивності
        </td>
        <td className="data__table-cell data__table-cell--marking">
          h<sub>п</sub>
        </td>
        <td className="data__table-cell data__table-cell--value">
          {singleSupPumpPressure}
        </td>
        <td className="data__table-cell data__table-cell--dimension">м</td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Напір, що створює головна нафтоперекачувальна станція
        </td>
        <td className="data__table-cell data__table-cell--marking">
          Н<sub>гнпс</sub>
        </td>
        <td className="data__table-cell data__table-cell--value">
          {mainStationPumpPressure}
        </td>
        <td className="data__table-cell data__table-cell--dimension">м</td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Тиск, що створює головна нафтоперекачувальна станція
        </td>
        <td className="data__table-cell data__table-cell--marking">
          Р<sub>гнпс</sub>
        </td>
        <td className="data__table-cell data__table-cell--value">
          {mainStationPressure}
        </td>
        <td className="data__table-cell data__table-cell--dimension">МПа</td>
      </tr>
      <tr className="data__table-row data__table-row--full">
        <td colspan="4">Проектний гідравлічний розрахунок нафтопроводу</td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Внутрішній діаметр трубопроводу
        </td>
        <td className="data__table-cell data__table-cell--marking">d</td>
        <td className="data__table-cell data__table-cell--value">
          {diameterCI}
        </td>
        <td className="data__table-cell data__table-cell--dimension">м</td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Швидкість рідини в трубопроводі
        </td>
        <td className="data__table-cell data__table-cell--marking">W</td>
        <td className="data__table-cell data__table-cell--value">{velosity}</td>
        <td className="data__table-cell data__table-cell--dimension">м/с</td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Число Рейнольдса
        </td>
        <td className="data__table-cell data__table-cell--marking">Re</td>
        <td className="data__table-cell data__table-cell--value">{reynolds}</td>
        <td className="data__table-cell data__table-cell--dimension"></td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Коефіцієнт гідравлічного опору
        </td>
        <td className="data__table-cell data__table-cell--marking">λ</td>
        <td className="data__table-cell data__table-cell--value">
          {coefHydraulicResist}
        </td>
        <td className="data__table-cell data__table-cell--dimension"></td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Втрати напору на тертя по довжині трубопроводу
        </td>
        <td className="data__table-cell data__table-cell--marking">
          h<sub>τ</sub>
        </td>
        <td className="data__table-cell data__table-cell--value">
          {frictionPressureLoss}
        </td>
        <td className="data__table-cell data__table-cell--dimension">м</td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Втрати напору на ділянці довжиною 100 км
        </td>
        <td className="data__table-cell data__table-cell--marking">
          h<sub>ф</sub>
        </td>
        <td className="data__table-cell data__table-cell--value">
          {frictionPressureLoss100}
        </td>
        <td className="data__table-cell data__table-cell--dimension">м</td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Загальні втрати напору
        </td>
        <td className="data__table-cell data__table-cell--marking">
          Н<sub>заг</sub>
        </td>
        <td className="data__table-cell data__table-cell--value">
          {frictionPressureLossAll}
        </td>
        <td className="data__table-cell data__table-cell--dimension">м</td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Напір, що створює проміжна станція
        </td>
        <td className="data__table-cell data__table-cell--marking">
          Н<sub>ст</sub>
        </td>
        <td className="data__table-cell data__table-cell--value">
          {stationPressure}
        </td>
        <td className="data__table-cell data__table-cell--dimension">м</td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Розрахункова кількість проміжних перекачувальних станцій
        </td>
        <td className="data__table-cell data__table-cell--marking">
          n<sub>р</sub>
        </td>
        <td className="data__table-cell data__table-cell--value">
          {stationsQuantity}
        </td>
        <td className="data__table-cell data__table-cell--dimension"></td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Кількість проміжних перекачувальних станцій
        </td>
        <td className="data__table-cell data__table-cell--marking">n</td>
        <td className="data__table-cell data__table-cell--value">{stations}</td>
        <td className="data__table-cell data__table-cell--dimension">шт</td>
      </tr>
      {loopingResultsTemplate}
      <tr className="data__table-row data__table-row--full">
        <td colspan="4">Уточнений гідравлічний розрахунок нафтопроводу</td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Коефіцієнт А математичної моделі сумарної напірної характеристики всіх
          НПС
        </td>
        <td className="data__table-cell data__table-cell--marking">А</td>
        <td className="data__table-cell data__table-cell--value">{volCoefA}</td>
        <td className="data__table-cell data__table-cell--dimension">м</td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Коефіцієнт B математичної моделі сумарної напірної характеристики всіх
          НПС
        </td>
        <td className="data__table-cell data__table-cell--marking">B</td>
        <td className="data__table-cell data__table-cell--value">{volCoefB}</td>
        <td className="data__table-cell data__table-cell--dimension">
          c<sup>2</sup>/м<sup>5</sup>
        </td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Параметр æ
        </td>
        <td className="data__table-cell data__table-cell--marking">æ</td>
        <td className="data__table-cell data__table-cell--value">
          {coefKappa}
        </td>
        <td className="data__table-cell data__table-cell--dimension">
          c<sup>2</sup>/м
        </td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Швидкість руху нафти
        </td>
        <td className="data__table-cell data__table-cell--marking">W</td>
        <td className="data__table-cell data__table-cell--value">
          {factVelosity}
        </td>
        <td className="data__table-cell data__table-cell--dimension">м/с</td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Число Рейнольдса
        </td>
        <td className="data__table-cell data__table-cell--marking">Re</td>
        <td className="data__table-cell data__table-cell--value">
          {factReynolds}
        </td>
        <td className="data__table-cell data__table-cell--dimension"></td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Коефіцієнт гідравлічного опору
        </td>
        <td className="data__table-cell data__table-cell--marking">λ</td>
        <td className="data__table-cell data__table-cell--value">
          {resistCoef}
        </td>
        <td className="data__table-cell data__table-cell--dimension"></td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Напір, що створює один основний насос
        </td>
        <td className="data__table-cell data__table-cell--marking">h</td>
        <td className="data__table-cell data__table-cell--value">
          {factSingleMainPumpPressure}
        </td>
        <td className="data__table-cell data__table-cell--dimension">м</td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Напір, що створює один підпірний насос
        </td>
        <td className="data__table-cell data__table-cell--marking">
          h<sub>п</sub>
        </td>
        <td className="data__table-cell data__table-cell--value">
          {factSingleSupPumpPressure}
        </td>
        <td className="data__table-cell data__table-cell--dimension">м</td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Напір, що створює ГНПС
        </td>
        <td className="data__table-cell data__table-cell--marking">
          H<sub>гнпс</sub>
        </td>
        <td className="data__table-cell data__table-cell--value">
          {factMainStationPumpPressure}
        </td>
        <td className="data__table-cell data__table-cell--dimension">м</td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Тиск, що створює ГНПС
        </td>
        <td className="data__table-cell data__table-cell--marking">
          H<sub>гнпс</sub>
        </td>
        <td className="data__table-cell data__table-cell--value">
          {factMainStationPressure}
        </td>
        <td className="data__table-cell data__table-cell--dimension">МПа</td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Сумарний напір, що дроселюється на виході всіх станцій
        </td>
        <td className="data__table-cell data__table-cell--marking">
          h'<sub>др</sub>
        </td>
        <td className="data__table-cell data__table-cell--value">
          {sumThrottlePressure}
        </td>
        <td className="data__table-cell data__table-cell--dimension">м</td>
      </tr>
      <tr className="data__table-row">
        <td className="data__table-cell data__table-cell--parameter">
          Уточненна фактична пропускна здатності
        </td>
        <td className="data__table-cell data__table-cell--marking">Q</td>
        <td className="data__table-cell data__table-cell--value">
          {factVolume}
        </td>
        <td className="data__table-cell data__table-cell--dimension">
          м<sup>3</sup>/c
        </td>
      </tr>
      <tr className="data__table-row data__table-row--full">
        <td colspan="4">Пропускна здатність магістрального нафтопроводу</td>
      </tr>
      {pipelineCapicityResultsTemplate}
    </tbody>
  </table>
);

export default ResultsTable;
