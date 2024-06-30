import { createContext, useState } from "react";

export const PurchaseContext = createContext();

const initialPurchase = {
  client: 0,
  employed: 0,
  purchase_date: "",
  description: {
    surtidor: "",
    producto: "",
    metodo_pago: "",
    total: "",
    litros: "",
  },
  total_amount: 0,
};

export const PurchaseProvider = ({ children }) => {
  const [purchase, setPurchase] = useState(initialPurchase);

  const resetPurchase = () => {
    setPurchase(initialPurchase);
  };

  return (
    <PurchaseContext.Provider value={{ purchase, setPurchase, resetPurchase }}>
      {children}
    </PurchaseContext.Provider>
  );
};
