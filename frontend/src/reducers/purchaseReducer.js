
export const initialPurchase = {
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

export const purchaseReducer = (state, action) =>{
    switch (action) {
        case "RESET_PURCHASE":return initialPurchase;

        case "SET_PURCHASE_DESCRIPTION": return {
            ...state,
            description:{
                ...description,
                ...action.payload,
            }
        };

        case "SET_PURCHASE_TOTAL_AMOUNT": return {
            ...state,
            total_amount: action.payload,
        };

        case "SET_PURCHASE_CLIENT": return {
            ...state,
            client: action.payload,
        };

        case "SET_PURCHASE_EMPLOYED": return {
            ...state,
            employed: action.payload,
        };

        case "SET_PURCHASE_PURCHASE_DATE": return {
            ...state,
            purchase_date: action.payload,
        };
    
        default:
            return state;
    }
}