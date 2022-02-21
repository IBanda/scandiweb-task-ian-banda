import { Component } from 'react';
import styled from 'styled-components';
import { CarretLeftIcon, CarretRightIcon } from './Icon';

const StyledDiv = styled.div`
     position: relative;
     .product_img {
          width: 141px;
          height: 162px;
          object-fit: cover;
     }
     button {
          background-color: transparent;
          border: none;
          position: absolute;
          top: 50%;
          display: none;
          transform: translateY(-50%);
          &.btn {
               &_next {
                    right: 0;
               }
          }
     }
     &:hover {
          button {
               display: block;
          }
     }
`;

type Props = {
     gallery: string[];
};
type State = {
     currentImgIndex: number;
};

export default class CartItemImage extends Component<Props, State> {
     state = {
          currentImgIndex: 0,
     };

     onNextImage = () =>
          this.setState((prev) => ({ currentImgIndex: prev.currentImgIndex + 1 }));
     onPrevImage = () =>
          this.setState((prev) => ({ currentImgIndex: prev.currentImgIndex - 1 }));

     render() {
          const { gallery } = this.props;
          const { currentImgIndex } = this.state;
          const hasMultipleImgs = gallery.length > 1;
          return (
               <StyledDiv className="img_wrapper">
                    {hasMultipleImgs && (
                         <button
                              data-testid="btn_prev"
                              onClick={this.onPrevImage}
                              disabled={currentImgIndex === 0}
                              className="btn_prev"
                         >
                              <CarretLeftIcon />
                         </button>
                    )}
                    <img
                         className="product_img"
                         src={gallery[currentImgIndex]}
                         alt="product"
                         data-testid="cart_thumbnail"
                    />
                    {hasMultipleImgs && (
                         <button
                              onClick={this.onNextImage}
                              disabled={currentImgIndex === gallery.length - 1}
                              className="btn_next"
                              data-testid="btn_next"
                         >
                              <CarretRightIcon />
                         </button>
                    )}
               </StyledDiv>
          );
     }
}
