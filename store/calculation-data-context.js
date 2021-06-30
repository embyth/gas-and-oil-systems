import { createContext, useReducer } from "react";

const calculationDataReducer = (state, action) => {
  switch (action.type) {
    case "SET_INCOME_DATA":
      return {
        ...state,
        INCOME_DATA: {
          ...state.INCOME_DATA,
          ...action.payload,
        },
      };

    case "SET_STATIONS_DATA":
      return {
        ...state,
        STATIONS_DATA: action.payload,
      };

    case "SET_SEGMENTS_DATA":
      return {
        ...state,
        SEGMENTS_DATA: action.payload,
      };

    case "SET_RESULTS":
      return {
        ...state,
        RESULTS: {
          ...state.RESULTS,
          ...action.payload,
        },
      };

    default:
      throw new Error(`Unexpected action type!`);
  }
};

const CalculationDataContext = createContext({});

export const CalculationDataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(calculationDataReducer, {});

  const setIncomeData = (data) => {
    dispatch({ type: "SET_INCOME_DATA", payload: data });
  };

  const setStationsData = (data) => {
    dispatch({ type: "SET_STATIONS_DATA", payload: data });
  };

  const setSegmentsData = (data) => {
    dispatch({ type: "SET_SEGMENTS_DATA", payload: data });
  };

  const setResults = (results) => {
    dispatch({ type: "SET_RESULTS", payload: results });
  };

  const getIncomeData = () => state.INCOME_DATA;

  const getStationsData = () => state.STATIONS_DATA;

  const getSegmentsData = () => state.SEGMENTS_DATA;

  const getResults = () => state.RESULTS;

  const context = {
    setIncomeData,
    setStationsData,
    setSegmentsData,
    setResults,
    getIncomeData,
    getStationsData,
    getSegmentsData,
    getResults,
    calcState: state,
  };

  return (
    <CalculationDataContext.Provider value={context}>
      {children}
    </CalculationDataContext.Provider>
  );
};

export default CalculationDataContext;
