import React from 'react';
import store from './Redux/store/store'
import { Provider } from 'react-redux'
import Register from './Components/AuthorizationComponents/Register';
import Login from './Components/AuthorizationComponents/login';
import { client } from './graphql_queries/queries';
import {ApolloProvider} from '@apollo/react-hooks'
import Profile from './Components/userComponent.tsx/profile';
import ShowContacts from './Components/contacts/contactListing'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Provider store={store}>
          <Switch>
            {/* profile router */}
            <Route exact path='/home'>
              <Profile/>
            </Route>
            {/* register router */}
            <Route path='/reg'>
              <Register />
            </Route>
            {/* login router */}
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/contact'>
              <ShowContacts />
            </Route>
          </Switch>
        </Provider>
      </Router>
    </ApolloProvider>
  );
}


export default App;
