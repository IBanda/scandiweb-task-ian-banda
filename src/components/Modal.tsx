import { Component } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const StyledModal = styled.div`
     position: fixed;
     top: 0;
     left: 0;
     height: 100%;
     width: 100%;
     z-index: 2;
     background-color: rgba(57, 55, 72, 0.22);
`;

const modalRoot = document.getElementById('modal');
export class Modal extends Component {
     element = document.createElement('div');

     componentDidMount() {
          modalRoot?.append(this.element);
     }

     componentWillUnmount() {
          this.element.remove();
     }

     render() {
          return createPortal(
               <StyledModal role="dialog">{this.props.children}</StyledModal>,
               this.element
          );
     }
}
