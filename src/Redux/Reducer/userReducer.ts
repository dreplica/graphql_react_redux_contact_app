import { type_profile } from "../ActionCreators/user/contactActions";
import { GET_USER, DELETE_USER, UPDATE_USER, LOADING_USER, ERROR } from "../ActionCreators/user/actions";
import { Stater } from "./auth";

export interface userState extends Stater{
    data:Array<object>
} 

//i can get user token from auth reducer
const stateObject: userState = {
    isLoading: false,
    error: "",
    data: []
}

const userReducer = (state = stateObject, action: type_profile): userState => {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                data: (action.payload as object[]),
            }
        case DELETE_USER:
            return {
                ...state,
                data:state.data.filter((val:any)=>val.id !== action.payload)
            }
        case UPDATE_USER:
            return {
                ...state,
                data:action.payload as object[]
            }
        case LOADING_USER:
            return {
                ...state,
                isLoading:action.payload as boolean
            }
        case ERROR:
            return {
                ...state,
                error:action.payload as string
            }
        default:
            return state;
    }
}

export default userReducer