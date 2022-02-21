import { connect } from 'react-redux';
import { Component } from 'react';
import styled from 'styled-components';
import { SelectedProduct } from '../utils/interfaces';
import { updateCart } from '../store/actions';

export const StyledDiv = styled.div`
     height: 100%;
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: space-between;
     margin-right: 1em;
     button {
          background-color: #fff;
          height: 45px;
          width: 45px;
          border: 1px solid #000;
          /* font-size: 23px; */
          font-weight: 200;
          display: flex;
          align-items: center;
          justify-content: center;
     }
     .quantity_text {
          font-size: 24px;
          font-weight: 400;
     }
`;

type Props = {
     updateCart?: Function;
     product: SelectedProduct;
};

class QuantityCTL extends Component<Props> {
     onCartUpdate = (type: 'INC' | 'DEC') => {
          const { product, updateCart: updateCartItem } = this.props;

          if (type === 'DEC') {
               return updateCartItem?.(product, product.quantity - 1);
          }
          updateCartItem?.(product, product.quantity + 1);
     };
     render() {
          const { product } = this.props;
          return (
               <StyledDiv className="quantity">
                    <button
                         data-testid="btn_inc"
                         onClick={() => this.onCartUpdate('INC')}
                    >
                         &#xff0b;
                    </button>
                    <span data-testid="quantity" className="quantity_text">
                         {product.quantity}
                    </span>

                    <button
                         data-testid="btn_dec"
                         className="dd"
                         onClick={() => this.onCartUpdate('DEC')}
                    >
                         &mdash;
                    </button>
               </StyledDiv>
          );
     }
}

type State = {
     cart: SelectedProduct[];
};

const mapState = (state: State) => ({
     cart: state.cart,
});

export default connect(mapState, { updateCart })(QuantityCTL);
