export const adaptIncomeDataToServer = (clientData) => ({
  annualVolume: +clientData.capacity,
  length: +clientData.length,
  density20: +clientData.density20,
  viscosity0: +clientData.viscosity,
  viscosity20: +clientData.viscosity20,
  diameter: +clientData.diameter,
  wall: +clientData.wall,
  oilTemp: +clientData["oil-temp"],
  pipelineCondition: +clientData["pipeline-cond"],
  aCoefMain: +clientData["a-coef"],
  bCoefMain: +clientData["b-coef"],
  aCoefSup: +clientData["a-coef-sup"],
  bCoefSup: +clientData["b-coef-sup"],
  pumpAmount: +clientData["pump-amount"],
  startGeoPoint: +clientData["start-geopoint"],
  endGeoPoint: +clientData["end-geopoint"],
});

export const adaptStationsDataToServer = (clientData) => ({
  stationsData: {
    lengths: clientData.incomeStations
      .map(({ length }) => (length === "" ? length : +length))
      .filter((item) => typeof item === "number"),
    geoPoints: clientData.incomeStations
      .map((item) =>
        item["geo-point"] === "" ? item["geo-point"] : +item["geo-point"]
      )
      .filter((item) => typeof item === "number"),
    pumpUnits: clientData.incomeStations
      .map((item) =>
        item["pump-quant"] === "" ? item["pump-quant"] : +item["pump-quant"]
      )
      .filter((item) => typeof item === "number"),
    pressureMinLimits: clientData.incomeStations
      .map((item) =>
        item["min-pressure"] === ""
          ? item["min-pressure"]
          : +item["min-pressure"]
      )
      .filter((item) => typeof item === "number"),
    pressureMaxLimits: clientData.incomeStations
      .map((item) =>
        item["max-pressure"] === ""
          ? item["max-pressure"]
          : +item["max-pressure"]
      )
      .filter((item) => typeof item === "number"),
  },
  results: { ...clientData.firstCalcResults },
  incomeData: {
    aCoefMain: +clientData.incomeData["a-coef"],
    bCoefMain: +clientData.incomeData["b-coef"],
    aCoefSup: +clientData.incomeData["a-coef-sup"],
    bCoefSup: +clientData.incomeData["b-coef-sup"],
  },
});
