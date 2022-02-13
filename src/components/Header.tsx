import { Component } from 'react';
import styled from 'styled-components';
import CurrencySwitcher from './CurrencySwitcher';
import Nav from './Nav';

const StyledHeader = styled.header`
     display: flex;
     align-items: center;
     justify-content: space-between;
     height: 60px;
`;

export default class Header extends Component {
     render() {
          return (
               <StyledHeader>
                    <Nav />
                    <div>
                         <img src="/logo.png" width={30} height={30} alt="logo" />
                    </div>
                    <div>
                         <CurrencySwitcher />
                    </div>
               </StyledHeader>
          );
     }
}
