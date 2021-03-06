import { Component } from 'react';
import styled from 'styled-components';

const StyledLoader = styled.div`
     margin: 60px auto;
     font-size: 10px;
     position: relative;
     text-indent: -9999em;
     border-top: 1.1em solid rgba(94, 206, 123, 0.2);
     border-right: 1.1em solid rgba(94, 206, 123, 0.2);
     border-bottom: 1.1em solid rgba(94, 206, 123, 0.2);
     border-left: 1.1em solid #5ece7b;

     transform: translateZ(0);

     animation: spin 1.1s infinite linear;
     &,
     &:after {
          border-radius: 50%;
          width: 10em;
          height: 10em;
     }

     @keyframes spin {
          0% {
               transform: rotate(0deg);
          }
          100% {
               transform: rotate(360deg);
          }
     }
`;

export class Loader extends Component {
     render() {
          return (
               <StyledLoader data-testid="loader" className="loader">
                    Loading...
               </StyledLoader>
          );
     }
}
