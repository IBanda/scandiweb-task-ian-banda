import { ApolloProvider } from '@apollo/client';
import { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from '../../App';
import apolloClient from '../../graphql/client';
import { persistedReducer } from '../../store';

export default class TestApp extends Component {
     render() {
          return (
               <ApolloProvider client={apolloClient}>
                    <Provider store={createStore(persistedReducer)}>
                         <App />
                    </Provider>
               </ApolloProvider>
          );
     }
}
