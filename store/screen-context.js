import { createContext, useReducer, useState } from "react";

const screenReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_STATE":
      return action.payload;

    default:
      throw new Error(`Unexpected action type!`);
  }
};

const ScreenContext = createContext({
  currentScreenId: {},
  screensInfo: {},
  changeScreen: () => {},
});

export const ScreenContextProvider = ({ children, initialState }) => {
  const [state, dispatch] = useReducer(screenReducer, initialState);

  const initialCurrentScreen = state.length > 0 ? state[0].id : null;

  const [currentScreenId, setCurrentScreenId] = useState(initialCurrentScreen);

  const getScreenById = (id) => state.find((screen) => screen.id === id);

  const updateScreensState = (newScreen) => {
    const index = state.indexOf(newScreen);
    const updatedScreen = { ...newScreen, isDisabled: false };

    const updatedState = [
      ...state.slice(0, index),
      updatedScreen,
      ...state.slice(index + 1),
    ];

    dispatch({ type: "UPDATE_STATE", payload: updatedState });
  };

  const unblockScreen = (screenId) => {
    const targetScreen = getScreenById(screenId);

    if (targetScreen.isDisabled) {
      updateScreensState(targetScreen);
    }
  };

  const changeScreenHandler = (screenId) => {
    unblockScreen(screenId);
    setCurrentScreenId(screenId);
  };

  const context = {
    currentScreenId,
    screensState: state,
    changeScreen: changeScreenHandler,
    unblockScreen,
  };

  return (
    <ScreenContext.Provider value={context}>{children}</ScreenContext.Provider>
  );
};

export default ScreenContext;
