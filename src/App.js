import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import Layout from './Layout';
import Users from './Users';
import User from './User';

const client = new ApolloClient({
  uri: 'https://c3interview.danshin.pro/graphql',
});

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/' component={ Users } />
          <Route exact path='/user/:userId' component={ User } />
        </Switch>
      </Layout>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;