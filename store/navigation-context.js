import { createContext, useState } from "react";

const NavigationContext = createContext({});

export const NavigationContextProvider = ({ children }) => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  const context = {
    isNavigationOpen,
    openNavigation: () => setIsNavigationOpen(true),
    closeNavigation: () => setIsNavigationOpen(false),
  };

  return (
    <NavigationContext.Provider value={context}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationContext;
