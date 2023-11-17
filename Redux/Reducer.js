
const initialState={
    test:"123",
    username:'',
    profile:'SISMI',
    data:[],
    createPin:'123',
    createDate:'12',
    ExpiryDate:'123',
    customertcpending:'',
    customerList:[],
    customerID:[],
    DLEcustomerID:'',
    cgtCustomerDetails:'',
    activityId:'',
    cgtactivity:'',
    slot:[],
    NewcgtSlot:'',
    CallFlag:'',
    DLEStatus:'',
    SpouseOccupation:'',
    isLastPage:'',
    AgentId:'',
    notificationcount:'',
    customer_ID:'',
    TC_Customer_id:'',
    TC_Customer_idADD:''
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
            case "SET_CUSTOMER_TC_PENDING":
                return {
                    ...state, // return the updated state
                    customertcpending: action.payload  
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
            case "SET_SELECTED_CUSTOMERID_OF_DLE":  // for updating state
            return {
                ...state, // return the updated state
                DLEcustomerID: action.payload  
            }

            case "SET_SELECTED_LOANCUSTOMERID":  // for updating state
            return {
                ...state, // return the updated state
                loancustomerID: action.payload  
            }
            case "SET_SELECTED_LOANID":  // for updating state
            return {
                ...state, // return the updated state
                loanID: action.payload  
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
            case "SET_CGT_ACTIVITY":  // for updating state
            return {
                ...state, // return the updated state
                cgtactivity: action.payload  
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
            case  "SET_CALL-FLAG":  // for updating state
            return {
                ...state, // return the updated state
                CallFlag: action.payload  
            }
            case  "SET_DLE_STATUS":  // for updating state
            return {
                ...state, // return the updated state
                DLEStatus: action.payload  
            }
            case  "SET_SPOUSE_OCCUPATION":  // for updating state
            return {
                ...state, // return the updated state
                SpouseOccupation: action.payload  
            }
            case  "SET_LASTPAGE":  // for updating state
            return {
                ...state, // return the updated state
                isLastPage: action.payload  
            }
            case  "SET_AGENT_ID":  // for updating state
            return {
                ...state, // return the updated state
                AgentId: action.payload  
            }
            case "SET_NOTIFICATION_COUNT":  // for updating state
            return {
                ...state, // return the updated state
                notificationcount: action.payload  
            }
            case "SET_CUSTOMER_ID":  // for updating state
            return {
                ...state, // return the updated state
                customer_ID: action.payload  
            }
            case "SET_TCCUSTOMER_ID":  // for updating state
            return {
                ...state, // return the updated state
               TC_Customer_id: action.payload  
            }
            case "SET_TCCUSTOMER_ID_ADD":  // for updating state
            return {
                ...state, // return the updated state
                TC_Customer_idADD: action.payload  
            }
        default:
            return state;

    }
}
