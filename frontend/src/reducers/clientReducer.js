export const initialClient = {
    client_id: 0,
    name: "",
    last_name: "",
    dni: "",
    token: "",
  };

export const clientReducer = (state, action) =>{
    switch (action.type) {
        case "SET_CLIENT": return action.payload;

        case "RESET_CLIENT": return initialClient;

        default:
            return state;
    }
}