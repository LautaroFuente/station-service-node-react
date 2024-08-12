import { createContext, useReducer } from "react";
import { initialClient, clientReducer } from "../reducers/clientReducer";

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [stateClient, dispatchClient] = useReducer(clientReducer,initialClient);

  return (
    <ClientContext.Provider value={{ stateClient, dispatchClient }}>
      {children}
    </ClientContext.Provider>
  );
};
