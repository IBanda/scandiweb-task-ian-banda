import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Cart from './Cart';
import CurrencySwitcher from './CurrencySwitcher';
import Nav from './Nav';

const StyledHeader = styled.header`
     display: flex;
     align-items: center;
     justify-content: space-between;
     height: 60px;
     margin-bottom: 4em;
     .right-col {
          display: flex;
          align-items: center;
     }
`;

export default class Header extends Component {
     render() {
          return (
               <StyledHeader>
                    <Nav />
                    <div>
                         <Link to="/">
                              <img src="/logo.png" width={30} height={28} alt="logo" />
                         </Link>
                    </div>
                    <div className="right-col">
                         <CurrencySwitcher />
                         <Cart />
                    </div>
               </StyledHeader>
          );
     }
}
