import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getTokenFromLogin } from '../../Redux/ActionCreators/authorization/AuthactionFunc';
import { Stater } from '../../Redux/Reducer/auth';
import { LoginRequest } from '../../graphql_queries/queries'
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
interface Iprops {
	data: { auth: string | undefined };
	getToken: (arg: string) => void;
}

interface form {
	password: string;
	email: string;
}
const formData: form = {
	password: '',
	email: ''
};


// there should be a useMutation from appolo/react-hooks
// it collects variables


const Login: React.FC<Iprops> = ({ data, getToken }) => {
	const [form, setform] = useState(formData);
	const history = useHistory()
	const [loginUser, {data:incomingToken}] = useMutation(LoginRequest)
	console.log('this is data', data);
	// console.log("this is incoming data",incomingToken)
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		loginUser({
			variables: {
				...form
			}
		}).then((resp) => getToken(resp.data.SignIn.token))
			.then(_=>history.push('/home'))
		.catch(err=>console.log("this is the returned error",err.message))
		console.log("here",incomingToken);
	};
	return (
		<form>
			<label>
				Email
				<input type="email" value={form.email} onChange={(e) => setform({ ...form, email: e.target.value })} />
			</label>
			<label>
				Password
				<input type="password" value={form.password} onChange={(e) => setform({ ...form, password: e.target.value })}/>
			</label>
			<button type="submit" onClick={handleSubmit}>
				Register
			</button>
		</form>
	);
};

const mapStateToProps = ({ authenticateReducer }: { authenticateReducer: Stater }) => ({
	data: { auth: authenticateReducer.auth }
});
const mapDispatchToProps = (dispatch: any) => ({
	getToken: (token: string) => dispatch(getTokenFromLogin(token))
});

const Connecting = connect(mapStateToProps, mapDispatchToProps)(Login);

// export default graphql(query)(Register)

export default Connecting;
