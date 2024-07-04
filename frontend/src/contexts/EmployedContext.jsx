import { createContext, useState } from "react";

export const EmployedContext = createContext();

const initialEmployed = {
  employed_id: 0,
  name: "",
  last_name: "",
  dni: "",
  token: "",
};

export const EmployedProvider = ({ children }) => {
  const [employed, setEmployed] = useState(initialEmployed);

  const resetEmployed = () => {
    setEmployed(initialEmployed);
  };

  return (
    <EmployedContext.Provider value={{ employed, setEmployed, resetEmployed }}>
      {children}
    </EmployedContext.Provider>
  );
};
