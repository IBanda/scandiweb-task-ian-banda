import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import CategoryPage from './pages/category';
import ProductPage from './pages/product';
import CartPage from './pages/cart';
import { ErrorBoundary } from './components/ErrorBoundary';
import NotFound from './components/404';

const StyledApp = styled.div`
     margin-bottom: 2em;
`;

class App extends React.Component {
     render() {
          return (
               <Router>
                    <Header />
                    <StyledApp className="container">
                         <ErrorBoundary>
                              <Switch>
                                   <Route component={CategoryPage} path="/" exact />
                                   <Route
                                        component={ProductPage}
                                        path="/product/:id"
                                        exact
                                   />
                                   <Route component={CartPage} path="/cart" exact />
                                   <Route component={NotFound} path="*" />
                              </Switch>
                         </ErrorBoundary>
                    </StyledApp>
               </Router>
          );
     }
}

export default App;
