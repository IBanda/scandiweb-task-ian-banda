import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import CategoryPage from './pages/category';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const StyledApp = styled.div`
     margin-bottom: 2em;
`;

class App extends React.Component {
     render() {
          return (
               <StyledApp className="container">
                    <Header />
                    <Router>
                         <Routes>
                              <Route element={<CategoryPage />} path="/" />
                         </Routes>
                    </Router>
               </StyledApp>
          );
     }
}

export default App;
