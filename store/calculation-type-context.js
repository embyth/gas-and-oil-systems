import { createContext, useState } from "react";

const CalculationTypeContext = createContext({});

export const CalculationTypeContextProvider = ({ children, calculation }) => {
  const [currentCalculation, setCurrentCalculation] = useState(calculation);

  const context = {
    currentCalculation,
    setCalculation: (newCalculation) => setCurrentCalculation(newCalculation),
  };

  return (
    <CalculationTypeContext.Provider value={context}>
      {children}
    </CalculationTypeContext.Provider>
  );
};

export default CalculationTypeContext;
