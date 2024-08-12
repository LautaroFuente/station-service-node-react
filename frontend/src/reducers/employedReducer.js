export const initialEmployed = {
    employed_id: 0,
    name: "",
    last_name: "",
    dni: "",
    token: "",
  };

export const employedReducer = (state, action) =>{
    switch (action.type) {
        case "SET_EMPLOYED": return action.payload;

        case "RESET_EMPLOYED": return initialEmployed;

        default:
            return state;
    }
}