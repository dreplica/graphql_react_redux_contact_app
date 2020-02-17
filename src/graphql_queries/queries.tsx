import ApolloClient, { gql, Operation,GraphQLRequest } from 'apollo-boost';
const options = {
    uri: 'http://localhost:3001/graphql',
    request: (operation:Operation) => {
        const token = localStorage['tok'];
        operation.setContext({
            headers: {
                "x-auth-users":token ?? ""
            }
        })
        console.log("operation")
    }
}
export const client = new ApolloClient(options)
export const token = gql`
    fragment Token on Token{
        token  
    }
`

export const profile = gql`
    fragment profile on Person{
        id
        fname
        lname
        email
        username
        Contacts{
            id
            fname
        }
    }
`

export const signup = gql`
     mutation Signup ($firstname:String!,$lastname:String!,$username:String!, $password:String!,$email:String!){
        SignUp(username:$username,fname:$firstname,lname:$lastname,email:$email,password:$password){
            ...Token
        }
    }
    ${token}
`

export const LoginRequest = gql`
	mutation Login($email:String!,$password:String!){
		SignIn(email:$email,password:$password){
			...Token 
		}
	}
${token}
`

export const getProfile = gql`
query users{
    Profile{
        ...profile
        }
    }
${profile}
`

export const deleteProfile = gql`
mutation users($id:String!){
    DeleteProfile(id:$id){
        fname
    }
}
`
export const updateProfile = gql`
mutation users($firstname:String!,$lastname:String!,$username:String!,$email:String!){
    UpdateUser(fname:$firstname,lname:$lastname,username:$username,email:$email){
        ...profile
        }
}
${profile}
`