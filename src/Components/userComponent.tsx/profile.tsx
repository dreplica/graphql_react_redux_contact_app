import React, { useState, useEffect } from 'react';
import {form,formData} from '../AuthorizationComponents/Register'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { connect } from 'react-redux';
import { userState } from '../../Redux/Reducer/userReducer';
import { Stater } from '../../Redux/Reducer/auth';
import { viewUser, deleteUser } from '../../Redux/ActionCreators/user/contactsActionFunc';


interface Iprops{
    data: any;
    auth: string | undefined;
    view: (args: Array<object>) => void;
    // deleter: (id: string) => void;
    // update: (args: object) => void;
}

type formDisplay =  Omit<form,"password">
const profileForm: formDisplay = formData// i have to remove password field

const getProfile =  gql`
query users{
    Profile{
        fname
        lname
        email
        username
        Contacts{
            fname
        }
    }
}
`

const Profile: React.FC<Iprops> = ({ data, auth,view }) => {
    const [profile_form, setprofile_form] = useState<object>(profileForm)
    console.log("this is auth",auth)
    const { data: profileDetails, loading, error } = useQuery(getProfile)
    useEffect(() => {
        view(profileDetails)
        if (data) {
            console.log(data.Profile[0].fname)
            try {
                setprofile_form({
                    ...profileForm,
                    firstname: data.Profile[0].fname,
                    lastname: data.Profile[0].lname,
                    username: data.Profile[0].username,
                    email: data.Profile[0].email,
                })
            
            } catch (error) { 
                console.log(error.message)
            }
        }
        }, [profileDetails,data,view])
        const loader = () => {
            if (loading) {
                console.log('loading now')
            return <> fetching your data </> 
        }
    }
    const errorLoading = () => {
        if (error) {
            console.log('error now')
            return <> {error.message} </>
        }
    } 
        loader();
        errorLoading() 
    // console.log("profile data details",profileDetails)
    console.log("na data d hee",data)
    console.log("profile form",profile_form)
  return (
    <>
          {loader()}
          {errorLoading()}
    </>
  );
}


const mapStateToProps = ({ userReducer, authenticateReducer }: { userReducer: userState;authenticateReducer:Stater}) => ({
    data: userReducer.data,
    auth: authenticateReducer.auth
    
})

const Connecting = connect(mapStateToProps,{view:viewUser,})(Profile)

export default Connecting;