import { authType } from "../ActionCreators/authorization/Authactions";
import { actionType } from "../ActionCreators/authorization/AuthactionFunc";

export interface Stater{
    auth: string | undefined;
    isLoading: boolean;
    error: string | undefined;
}
const contactReducer = (state:Stater = {auth:undefined,isLoading:false,error:""}, action:actionType) => {
    switch (action.type) {
       
        default:
            return state;
    }
}

export default contactReducer