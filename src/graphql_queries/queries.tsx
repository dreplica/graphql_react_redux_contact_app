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
        console.log(operation)
    }
}
export const client = new ApolloClient(options)
export const token = gql`
    fragment Token on Token{
        token  
    }
`

export default {}