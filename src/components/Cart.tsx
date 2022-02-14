import { Component } from 'react';
import styled from 'styled-components';
import { CartIcon } from './Icon';

const StyledDiv = styled.div`
     svg {
          margin-top: 3px;
          width: 28px;
          height: 28px;
     }
`;

export default class Cart extends Component {
     render() {
          return (
               <StyledDiv>
                    <CartIcon />
               </StyledDiv>
          );
     }
}
