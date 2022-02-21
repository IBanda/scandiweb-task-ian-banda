import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import GlobalStyles, { theme } from './GlobalStyles';
import reportWebVitals from './reportWebVitals';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './graphql/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
     <React.StrictMode>
          <ApolloProvider client={apolloClient}>
               <Provider store={store}>
                    <BrowserRouter>
                         <GlobalStyles />
                         <ThemeProvider theme={theme}>
                              <PersistGate loading={null} persistor={persistor}>
                                   <App />
                              </PersistGate>
                         </ThemeProvider>
                    </BrowserRouter>
               </Provider>
          </ApolloProvider>
     </React.StrictMode>,
     document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
