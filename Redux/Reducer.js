
const initialState={
    test:"123",
    username:'',
    profile:'SISMI',
    data:[],
    createPin:'123',
    createDate:'12',
    ExpiryDate:'123',
}

export const baseReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_CREATE_PIN":  // for updating state
            return {
                ...state, // return the updated state
                createPin: action.payload  
            }
            case "SET_CREATE_DATE":  // for updating state
            return {
                ...state, // return the updated state
                createDate: action.payload  
            }
            case "SET_EXPIRYDATE":  // for updating state
            return {
                ...state, // return the updated state
                ExpiryDate: action.payload  
            }
    
        default:
            return state;

    }
}
