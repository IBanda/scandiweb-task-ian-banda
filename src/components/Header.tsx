import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CartOverlay from './CartOverlay';
import CurrencySwitcher from './CurrencySwitcher';
import Nav from './Nav';

const StyledHeader = styled.header`
     background-color: #fff;
     position: relative;
     z-index: 5;
     .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 60px;
          margin-bottom: 4em;
          .right-col {
               display: flex;
               align-items: center;
          }
     }
`;

export default class Header extends Component {
     render() {
          return (
               <StyledHeader>
                    <div className="container">
                         <Nav />
                         <div>
                              <Link to="/">
                                   <img
                                        src="/logo.png"
                                        width={30}
                                        height={28}
                                        alt="logo"
                                   />
                              </Link>
                         </div>
                         <div className="right-col">
                              <CurrencySwitcher />
                              <CartOverlay />
                         </div>
                    </div>
               </StyledHeader>
          );
     }
}
