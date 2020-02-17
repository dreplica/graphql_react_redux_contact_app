import { type_profile, mounting_user, isError, all_contacts, delete_user, deleting_contact, mounting_contact, mounting_contacts, contact_view, update_user, update_contact}from './contactActions'
import { profile_view}from './contactActions'
import { Dispatch } from 'redux';
import { dataType } from '../../Reducer/userReducer';

interface actions{
    func: (args: type_profile) => type_profile;
}


export const viewUser = (data:dataType) => (dispatch: Dispatch) => {
    try {
        dispatch(mounting_user(true));
        dispatch(profile_view(data));
        dispatch(mounting_user(false));
    } catch (error) {
        dispatch(isError(error.message))
    }
}

export const viewContacts = (data:Array<object>) => (dispatch: Dispatch) => {
    try {
        dispatch(mounting_contacts(true));
        dispatch(all_contacts(data));
        dispatch(mounting_contacts(false));
    } catch (error) {
        dispatch(isError(error.message))
    }
}
export const viewContact = (id:string) => (dispatch: Dispatch) => {
    try {
        dispatch(mounting_contact(true));
        dispatch(contact_view(id));
        dispatch(mounting_contact(false));
    } catch (error) {
        dispatch(isError(error.message))
    }
}

export const deleteUser = (id:string) => (dispatch: Dispatch) => {
    try {
        dispatch(mounting_user(true));
        dispatch(delete_user(id));
        dispatch(mounting_user(false));
    } catch (error) {
        dispatch(isError(error.message))
    }
}
export const deleteContact = (id:string) => (dispatch: Dispatch) => {
    try {
        dispatch(mounting_contact(true));
        dispatch(deleting_contact(id));
        dispatch(mounting_contact(false));
    } catch (error) {
        dispatch(isError(error.message))
    }
}
export const updateUser = (id:object) => (dispatch: Dispatch) => {
    try {
        dispatch(mounting_contact(true));
        dispatch(update_user(id));
        dispatch(mounting_contact(false));
    } catch (error) {
        dispatch(isError(error.message))
    }
}
export const updateContact = (id:Array<object>) => (dispatch: Dispatch) => {
    try {
        dispatch(mounting_contact(true));
        dispatch(update_contact(id));
        dispatch(mounting_contact(false));
    } catch (error) {
        dispatch(isError(error.message))
    }
}
