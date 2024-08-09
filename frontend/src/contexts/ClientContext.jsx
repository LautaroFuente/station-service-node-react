import { createContext, useState, useReducer } from "react";
import { initialClient, clientReducer } from "../reducers/clientReducer";

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [state, dispatch] = useReducer(clientReducer,initialClient)

  return (
    <ClientContext.Provider value={{ state, dispatch }}>
      {children}
    </ClientContext.Provider>
  );
};
