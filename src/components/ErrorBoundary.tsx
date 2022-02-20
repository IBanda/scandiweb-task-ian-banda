import { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

type State = {
     hasError: boolean;
};
type Props = {
     children: ReactNode;
};

const StyledDiv = styled.div`
     color: #fff;
     background-color: #dd4a48;
     padding: 2em;
     width: 350px;
     button {
          background-color: transparent;
          color: #fff;
          border: none;
          padding: 0;
          text-decoration: underline;
     }
`;

export class ErrorBoundary extends Component<Props, State> {
     state = {
          hasError: false,
     };

     componentDidCatch(error: Error, errorInfo: ErrorInfo) {
          console.log(error);
          console.log(errorInfo);
          this.setState({ hasError: true });
     }

     onReset = () => {
          this.setState({ hasError: false });
     };

     render() {
          return (
               <>
                    {this.state.hasError ? (
                         <StyledDiv role={'alert'}>
                              Opps something went wrong {''}
                              <button onClick={this.onReset}>Click to retry</button>
                         </StyledDiv>
                    ) : (
                         this.props.children
                    )}
               </>
          );
     }
}
