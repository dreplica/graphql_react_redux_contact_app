import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTokenFromRegister } from '../../Redux/ActionCreators/authorization/AuthactionFunc';
import { Stater} from "../../Redux/Reducer/auth";
import { useMutation } from '@apollo/react-hooks';
import { signup } from '../../graphql_queries/queries';
interface Iprops {
    data: { auth: string | undefined;};
    getToken:(arg:string)=>void
}

export interface form{
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    email: string;

}
export const formData:form = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: "",

}

const Register: React.FC<Iprops> = ({ data, getToken }) => {
    const [form, setform] = useState(formData)
    const history = useHistory()
    const [registerUser] = useMutation(signup) 
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        registerUser({
            variables: {
                ...form
            }
        }).then(res => getToken(res.data.SignUp.token))
            .then(_ => history.push('/home'))
        .catch(err=>console.log(err.message))
        
   }
    return (
        <form>
            <label>First Name
             <input type='text' value={form.firstname} onChange={(e)=>setform({...form,firstname:e.target.value})} />
            </label>
            <label>Last Name
             <input type='text' value={form.lastname} onChange={(e) => setform({ ...form, lastname: e.target.value })} />
            </label>
            <label>username
             <input type='text' value={form.username} onChange={(e) => setform({ ...form, username: e.target.value })} />
            </label>
            <label>Email
             <input type='email' value={form.email} onChange={(e) => setform({ ...form, email: e.target.value })} />
            </label>
            <label>Password
             <input type='password' value={form.password} onChange={(e) => setform({ ...form, password: e.target.value})} />
            </label>
            <button type="submit" onClick={handleSubmit}>Register</button>
        </form>
    )
}

const mapStateToProps = ({ authenticateReducer}:{authenticateReducer:Stater}) => ({
    data :{auth:authenticateReducer.auth}
})

const Connecting = connect(mapStateToProps,{getToken:getTokenFromRegister})(Register)

export default Connecting;