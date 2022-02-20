import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import GlobalStyles, { theme } from './GlobalStyles';
import reportWebVitals from './reportWebVitals';
import { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
     <React.StrictMode>
          <GlobalStyles />
          <ThemeProvider theme={theme}>
               <PersistGate loading={null} persistor={persistor}>
                    <App />
               </PersistGate>
          </ThemeProvider>
     </React.StrictMode>,
     document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
