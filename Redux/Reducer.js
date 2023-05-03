
const initialState={
    test:"123",
    username:'',
    profile:'SISMI',
    data:[],
    createPin:'123',
    createDate:'12',
    ExpiryDate:'123',
    
    customerList:[],
    customerID:'',
    cgtCustomerDetails:'',
    activityId:'',
    slot:[],
    NewcgtSlot:''
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
            case "SET_SELECTED_CUSTOMERLIST":  // for updating state
            return {
                ...state, // return the updated state
                customerList: action.payload  
            }
            case "SET_SELECTED_CUSTOMERID":  // for updating state
            return {
                ...state, // return the updated state
                customerID: action.payload  
            }
         case "SET_CGT_CUSTOMERdETAILS":  // for updating state
            return {
                ...state, // return the updated state
                cgtCustomerDetails: action.payload  
            }
            case "SET_CGT_ACTIVITY_ID":  // for updating state
            return {
                ...state, // return the updated state
                activityId: action.payload  
            }
            case "SET_ACTIVITY":  // for updating state
            return {
                ...state, // return the updated state
                slot: action.payload  
            }
            case  "SET_CREATE_DATE_CGT":  // for updating state
            return {
                ...state, // return the updated state
                NewcgtSlot: action.payload  
            }
           
        default:
            return state;

    }
}
