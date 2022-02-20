import { ApolloError } from '@apollo/client';
import { Component } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
     color: #fff;
     background-color: #dd4a48;
     padding: 2em;
     h1 {
          font-size: 24px;
     }
`;
type Props = {
     error: ApolloError;
};

export default class GraphqlErrorAlert extends Component<Props> {
     render() {
          return (
               <StyledDiv role={'alert'}>
                    <h1>{this.props.error.message}</h1>
                    <span>Refresh to try again</span>
               </StyledDiv>
          );
     }
}
