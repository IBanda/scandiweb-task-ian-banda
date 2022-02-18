import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import CategoryPage from './pages/category';
import ProductPage from './pages/product';
import CartPage from './pages/cart';

const StyledApp = styled.div`
     margin-bottom: 2em;
`;

class App extends React.Component {
     render() {
          return (
               <Router>
                    <Header />
                    <StyledApp className="container">
                         <Switch>
                              <Route component={CategoryPage} path="/" exact />
                              <Route component={ProductPage} path="/product/:id" exact />
                              <Route component={CartPage} path="/cart" exact />
                         </Switch>
                    </StyledApp>
               </Router>
          );
     }
}

export default App;
