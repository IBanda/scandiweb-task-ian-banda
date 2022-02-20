import { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledDiv = styled.div`
     text-align: center;
     h1 {
          color: #8d8f9a;
     }
     a {
          text-decoration: underline;
     }
`;

export default class NotFound extends Component {
     render() {
          return (
               <StyledDiv>
                    <h1>Page not found</h1>
                    <Link to="/">Go home</Link>
               </StyledDiv>
          );
     }
}
