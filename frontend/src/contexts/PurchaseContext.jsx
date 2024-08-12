import { createContext, useReducer } from "react";
import { initialPurchase, purchaseReducer } from "../reducers/purchaseReducer";

export const PurchaseContext = createContext();

export const PurchaseProvider = ({ children }) => {
  const [statePurchase, dispatchPurchase] = useReducer(purchaseReducer,initialPurchase);

  return (
    <PurchaseContext.Provider value={{ statePurchase, dispatchPurchase }}>
      {children}
    </PurchaseContext.Provider>
  );
};
