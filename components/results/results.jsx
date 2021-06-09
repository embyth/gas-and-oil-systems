import ResultsTable from "./results-table";

const Results = ({ resultFields }) => (
  <section id="results" className="results">
    <div className="section__container">
      <h2 className="section-heading">{resultFields.RESULTS_HEADING}</h2>

      <div className="data__container data__container--results">
        <ResultsTable resultFields={resultFields} />
      </div>
    </div>
  </section>
);

export default Results;
