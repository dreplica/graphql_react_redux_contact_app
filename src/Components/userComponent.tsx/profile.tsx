import React, { useState, useEffect, FormEvent } from 'react';
import {form} from '../AuthorizationComponents/Register'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { userState,dataType } from '../../Redux/Reducer/userReducer';
import { Stater } from '../../Redux/Reducer/auth';
import { viewUser, deleteUser, updateUser } from '../../Redux/ActionCreators/user/contactsActionFunc';
import { getProfile, deleteProfile, updateProfile } from '../../graphql_queries/queries';


interface Iprops{
    data: dataType; 
    auth: string | undefined;
    view: (args: dataType) => void;
    deleter: (id: string) => void;
    update: (args: object) => void;
} 

type formDisplay =  Omit<form,"password">
const profileForm: formDisplay = {
    firstname: "",
    lastname: "",
    email: "",
    username: "",
}// i have to remove password field



const Profile: React.FC<Iprops> = ({ data,view,deleter,update }) => {
    const [profile_form, setprofile_form] = useState(profileForm) 
    const [focus, setFocus] = useState(false)
    const [deleting] = useMutation(deleteProfile)
    const [updating] = useMutation(updateProfile)
    const { data: profileDetails, loading, error } = useQuery(getProfile)
    console.log("here is data form",data)
    useEffect(() => {
        view(profileDetails)
        if (profileDetails) {
            try {
                setprofile_form({
                    ...profile_form,
                    firstname: data.Profile[0].fname as string,
                    lastname: data.Profile[0].lname as string,
                    username: data.Profile[0].username as string,
                    email: data.Profile[0].email as string,
                })
            
            } catch (error) { 
                console.log(error.message) 
            }
        }
    }, [profileDetails, data,update,updating])
    
        if (loading) {
            console.log('loading now')
            return <> fetching your data </> 
    }
    
        if (error) {
            console.log('error now')
            return <> {error.message} </>
    }

    const update_user = (e: FormEvent): void => {
        e.preventDefault();
        console.log(profile_form)
        const body = {
            fname: profile_form.firstname,
            lname: profile_form.lastname,
            email: profile_form.email,
            username: profile_form.username   
        }
        update(body);
        updating({
            variables: {
                ...profile_form
            }
        })
    }

    const delete_user = (e:FormEvent) => { 
        e.preventDefault();
        deleting({
            variables: {
                id:data.Profile[0].id as string
            }
        })
        deleter(profile_form.email)
    }
    // const handleText = (e: any): void => {
    //     e.preventDefault();
    //     focus && setFocus(false)
    //     const target = e.target?.id as string;
    //     setprofile_form({...profile_form,['e.target.id']:e.target.value})
    // }
  return (
          <form>
            <label>First Name
             <input type='text' id='firstname' value={profile_form.firstname} onChange={(e)=>setprofile_form({...profile_form,firstname:e.target.value})} />
            </label>
            <label>Last Name
             <input type='text' id='lastname' value={profile_form.lastname} onChange={(e) => setprofile_form({ ...profile_form, lastname: e.target.value })} />
            </label>
            <label>username
             <input type='text' id='username' value={profile_form.username} onChange={(e) => setprofile_form({ ...profile_form, username: e.target.value })} />
            </label>
            <label>Email {focus && "can't change email"}
                  <input type='email' value={profile_form.email} onChange={(e) => setFocus(true)}/>
            </label>
            <button type="submit" onClick={update_user}>Edit</button>
            <button type="submit" onClick={delete_user}>Delete</button>
        </form>
  );
}


const mapStateToProps = ({ userReducer, authenticateReducer }: { userReducer: userState ;authenticateReducer:Stater}) => ({
    data: userReducer.data,
    auth: authenticateReducer.auth
    
})

const Connecting = connect(mapStateToProps,{view:viewUser,deleter:deleteUser,update:updateUser})(Profile)

export default Connecting;