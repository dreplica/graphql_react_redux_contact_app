import {
    GET_USER, DELETE_USER, UPDATE_USER,
    LOADING_CONTACTS, LOADING_CONTACT,
    ERROR, VIEW_CONTACTS, VIEW_CONTACT,
    DELETING_CONTACT, UPDATE_CONTACT,
    LOADING_USER
} from "./actions"
import { dataType } from "../../Reducer/userReducer"


export interface type_profile {
    type: string;
    data?:dataType
    payload?: string|boolean|Array<object>|object;//not all actioncreators would need payload
}



//USER ACTIONS
export const profile_view =(data:dataType):type_profile => ({
    type: GET_USER,
    data
})
export const delete_user =(payload:string):type_profile => ({
    type: DELETE_USER,
    payload
})
export const update_user =(payload:object):type_profile => ({
    type: UPDATE_USER,
    payload
})

//CONTACT ACTIONS
export const mounting_contacts = (payload:boolean): type_profile => ({
    type: LOADING_CONTACTS,
    payload
})
export const mounting_contact = (payload:boolean): type_profile => ({
    type: LOADING_CONTACT,
    payload
})

export const mounting_user = (payload:boolean): type_profile => ({
    type: LOADING_USER,
    payload
})

export const isError = (payload:string): type_profile => ({
    type: ERROR,
    payload
})
export const all_contacts = (payload:Array<object>): type_profile => ({
    type: VIEW_CONTACTS,
    payload
})

export const contact_view =(payload:string):type_profile => ({
    type: VIEW_CONTACT,
    payload
})
export const deleting_contact = (payload:string): type_profile => ({
    type: DELETING_CONTACT,
    payload
})
export const update_contact = (payload:Array<object>): type_profile => ({
    type: UPDATE_CONTACT,
    payload
})

