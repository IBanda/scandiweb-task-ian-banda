import { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Attribute from '../components/Attribute';
import { Modal } from '../components/Modal';
import { Currency, SelectedProduct } from '../utils/interfaces';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../store/actions';
import CartItem from '../components/CartItem';
import { isAttributedSelected } from '../utils';

const StyledDiv = styled.div`
     height: calc(100% - 4em - 80px);
     position: relative;
     .page_title {
          text-transform: uppercase;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 1em;
     }
     .cart {
          position: absolute;
          max-height: 430px;
          overflow: auto;
          width: 80%;
          .empty_cart_msg {
               color: #8d8f9a;
               font-size: 16px;
          }
          &_items {
               list-style: none;
               padding: 0;
               margin: 0;
          }
     }
`;

const StyledAttrs = styled.div`
     height: 100%;
     width: 100%;
     display: flex;
     justify-content: center;
     align-items: center;
     & > div {
          background-color: #fff;
          align-items: center;
          padding: 1em;
          height: 400px;
          width: 320px;
          overflow: auto;
          button {
               background-color: transparent;
               border: none;
               cursor: pointer;
               margin-left: auto;
          }
          h1 {
               font-size: 20px;
               font-weight: 700;
          }
          .attr_name {
               font-family: 'Roboto Condensed';
               font-size: 16px;
               font-weight: 600;
          }
     }
`;
type Props = {
     cart: SelectedProduct[];
     currency: Currency;
     removeFromCart: Function;
};

type State = {
     showModal: boolean;
     productForModal: SelectedProduct;
};

class CartPage extends Component<Props, State> {
     state = {
          showModal: false,
          productForModal: {} as SelectedProduct,
     };

     onModalOpen = (prdct: SelectedProduct) => {
          this.setState({
               showModal: true,
               productForModal: prdct,
          });
     };

     onRemoveFromCart = (product: SelectedProduct) => {
          this.props.removeFromCart(product);
     };

     render() {
          const { cart } = this.props;
          const { showModal, productForModal } = this.state;
          return (
               <StyledDiv>
                    <h1 className="page_title">cart</h1>
                    <div className="cart">
                         {cart.length ? (
                              <ul className="cart_items">
                                   {cart.map((product, index) => (
                                        <CartItem
                                             key={`${product.id}-${index}`}
                                             onModalOpen={this.onModalOpen}
                                             product={product}
                                        />
                                   ))}
                              </ul>
                         ) : (
                              <>
                                   <h2 className="empty_cart_msg">Cart is Empty</h2>
                                   <Link to="/">Go to shop</Link>
                              </>
                         )}
                    </div>
                    {showModal ? (
                         <Modal>
                              <StyledAttrs className="more_attrs">
                                   <div>
                                        <button
                                             onClick={() =>
                                                  this.setState({ showModal: false })
                                             }
                                        >
                                             &#10005; Close
                                        </button>
                                        <h1>
                                             Selected attributes for{' '}
                                             {productForModal.brand}{' '}
                                             {productForModal.name}
                                        </h1>
                                        {productForModal.attributes.map((attr) => (
                                             <div key={attr.id}>
                                                  <h3 className="attr_name">
                                                       {attr.name}:
                                                  </h3>
                                                  <Attribute
                                                       attribute={attr}
                                                       isSelected={isAttributedSelected(
                                                            productForModal
                                                       )}
                                                  />
                                             </div>
                                        ))}
                                   </div>
                              </StyledAttrs>
                         </Modal>
                    ) : null}
               </StyledDiv>
          );
     }
}

type rootState = {
     cart: SelectedProduct[];
     currency: Currency;
};

const mapStateToProps = (state: rootState) => ({
     cart: state.cart,
     currency: state.currency,
});

export default connect(mapStateToProps, { removeFromCart })(CartPage);
