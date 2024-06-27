import { createContext, useState } from "react";

export const ClientContext = createContext();

const initialClient = {
  client_id: 0,
  name: "",
  last_name: "",
  dni: "",
  token: "",
};

export const ClientProvider = ({ children }) => {
  const [client, setClient] = useState(initialClient);

  return (
    <ClientContext.Provider value={{ client, setClient }}>
      {children}
    </ClientContext.Provider>
  );
};
