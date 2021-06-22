export const adaptClientDataToServer = (clientData) => ({
  startingPressure: clientData.startingPressure,
  allowablePressure: clientData.allowablePressure,
  density: clientData.gasDensity,
  viscosity: clientData.gasViscosity * 10 ** -6,
  segmentsAmount: clientData.segmentsAmount,
  overloadFactor: clientData.overloadFactor,
  averageTemperature: clientData.averageTemperature + 273.15,
  calcAccurance: clientData.calcAccurance / 100,
  atmosphericPressure: clientData.atmosphericPressure,
  maxVelosity: clientData.gasSpeed,
  averageConsumption: clientData.gasConsumption,
  pipeType: clientData.pipeType,
  lengths: clientData.segments.map((segment) => +segment.length),
  resistCoefs: clientData.segments.map((segment) => +segment["resist-coef"]),
  consumptions: clientData.segments.map((segment) => +segment.consumption),
  segmentsNames: clientData.segments.map((segment) => segment.segment),
  moveDirections: clientData.segments.map(
    (segment) => +segment["movement-direction"]
  ),
});
