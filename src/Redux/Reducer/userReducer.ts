import { type_profile } from "../ActionCreators/user/contactActions";
import { GET_USER, DELETE_USER, UPDATE_USER, LOADING_USER, ERROR } from "../ActionCreators/user/actions";
import { Stater } from "./auth";

export interface dataType {
    [key: string]: Array<{ [key: string]: number|string | Array<object> }>; 
}
 export interface userState extends Stater{
    data: dataType
} 

//i can get user token from auth reducer
const stateObject: userState = {
    isLoading: false,
    error: "",
    data: { }
} 

const userReducer = (state = stateObject, action: type_profile): userState => {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                data: action.data as dataType,
            }
        case DELETE_USER:
            const filter = state.data.Profile.filter((val:{ [key: string]: number|string | Array<object> })=>val.email !== (action.payload as string))
            return {
                ...state,
                data: { Profile:(state.data.Profile = filter) }
            }
        case UPDATE_USER:
            return {
                ...state,
                data: { Profile: [{ ...action.payload as object }]}//watch out remove the casting and see the error to solve
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