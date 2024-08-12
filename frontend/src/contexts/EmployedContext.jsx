import { createContext, useReducer } from "react";
import { employedReducer, initialEmployed } from "../reducers/employedReducer";

export const EmployedContext = createContext();

export const EmployedProvider = ({ children }) => {
  const [stateEmployed, dispatchEmployed ] = useReducer(employedReducer,initialEmployed);

  return (
    <EmployedContext.Provider value={{ stateEmployed, dispatchEmployed }}>
      {children}
    </EmployedContext.Provider>
  );
};
