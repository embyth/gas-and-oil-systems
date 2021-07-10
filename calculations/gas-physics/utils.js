export const adaptIncomeDataToServer = (clientData) => ({
  ch4: +clientData.methane,
  c2h6: +clientData.ethane,
  c3h8: +clientData.propane,
  c4h10: +clientData.butane,
  c5h12: +clientData.pentane,
  n2: +clientData.nitrogen,
  co2: +clientData["carbon-dioxide"],
});
