const ResultsTableRow = ({ label, marking, value, dimention }) => (
  <tr className="data__table-row">
    <td className="data__table-cell data__table-cell--parameter">{label}</td>
    <td className="data__table-cell data__table-cell--marking">{marking}</td>
    <td className="data__table-cell data__table-cell--value">{value}</td>
    <td className="data__table-cell data__table-cell--dimension">
      {dimention}
    </td>
  </tr>
);

export default ResultsTableRow;
