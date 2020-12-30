import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {ApolloProvider} from 'react-apollo';
// Provider to allow rest of our application to access state stored insdie apollo

import {createHttpLink} from 'apollo-link-http';
// single http url to apollo server /graphql,  dependency of apollo-boost
 
import {InMemoryCache} from 'apollo-cache-inmemory';
// caches the data fetched from apollo server in memory, dependency of apollo-boost

import {ApolloClient, gql} from 'apollo-boost';
// graphql client side library

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';
import {  resolvers, typeDefs} from './graphql/resolvers';

// setup link to backend 
const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com' // the playground
});

// cache for client side , also the client side state (redux)
const cache = new InMemoryCache();

// graphQL client
const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers // Adding the new typedefs and mutations (resolvers) to the apollo client
});

// initialState same as redux 
client.writeData({
  data: {
    cartHidden: true 
  }
});


// testing a sample query
const promise = client.query({
  query: gql`
    {
      getCollectionsByTitle(title:"hats") {
        id
        title
        items {
          id
          name
          price
          imageUrl
        }
      }
    }
  `
});

promise.then(resp=>console.log('response from jql', resp));



ReactDOM.render(
  <ApolloProvider client={client}>
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
