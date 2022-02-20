import { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Attribute from '../components/Attribute';
import { Modal } from '../components/Modal';
import { getPrice } from '../utils';
import { Currency, SelectedProduct } from '../utils/interfaces';
import QuantityCTL from '../components/QuantityCTL';
import { Link } from 'react-router-dom';

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
          &_items {
               margin: 0;
               padding: 0;
               list-style: none;
          }
          &_item_left {
               .brand,
               .name {
                    font-size: 20px;
               }
               .brand {
                    font-weight: 500;
                    margin: 0 0 10px 0;
               }
               .name {
                    font-weight: 300;
                    margin: 0 0 20px 0;
               }
               .price {
                    font-weight: 600;
                    font-size: 20px;
                    margin: 20px 0 20px 0;
               }
               .attr_container {
                    margin-bottom: 1em;
                    display: flex;
                    align-items: flex-end;
               }
               .show_more_btn {
                    background-color: transparent;
                    border: none;
                    text-transform: capitalize;
                    font-size: 12px;
               }
          }
          .empty_cart_msg {
               color: #8d8f9a;
               font-size: 16px;
          }
          &_item {
               border-top: 1px solid #e5e5e5;
               padding: 1em 0;
               & > div {
                    display: flex;
                    justify-content: space-between;
                    height: 181px;
               }
          }
          &_item_right {
               display: flex;
               position: sticky;
               top: 0;
               .product_img {
                    width: 141px;
                    height: 185px;
                    object-fit: contain;
               }
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
     isSelected = (product: SelectedProduct) => (attrName: string, id: string) => {
          if (Object.keys(product.variant).length) {
               return product.variant[attrName].id === id;
          }
     };

     onModalOpen = (prdct: SelectedProduct) => {
          this.setState({
               showModal: true,
               productForModal: prdct,
          });
     };

     render() {
          const { cart, currency } = this.props;
          const { showModal, productForModal } = this.state;
          return (
               <StyledDiv>
                    <h1 className="page_title">cart</h1>
                    <div className="cart">
                         {cart.length ? (
                              <ul className="cart_items">
                                   {cart.map((product, index) => {
                                        const currentPrice = getPrice(
                                             product.prices,
                                             currency.symbol
                                        );
                                        return (
                                             <li
                                                  key={`${product.id}-${index}`}
                                                  className="cart_item"
                                             >
                                                  <div>
                                                       <div className="cart_item_left">
                                                            <h2 className="brand">
                                                                 {product.brand}
                                                            </h2>
                                                            <h3 className="name">
                                                                 <Link
                                                                      to={`/product/${product.id}`}
                                                                 >
                                                                      {product.name}
                                                                 </Link>
                                                            </h3>
                                                            <h4 className="price">
                                                                 {
                                                                      currentPrice
                                                                           ?.currency
                                                                           .symbol
                                                                 }
                                                                 {currentPrice?.amount}
                                                            </h4>

                                                            <div className="attr_container">
                                                                 <Attribute
                                                                      attribute={
                                                                           product
                                                                                .attributes[0]
                                                                      }
                                                                      onChange={() => {}}
                                                                      isSelected={this.isSelected(
                                                                           product
                                                                      )}
                                                                 />
                                                                 {product.attributes
                                                                      .length &&
                                                                 product.attributes
                                                                      .length > 1 ? (
                                                                      <button
                                                                           className="show_more_btn"
                                                                           onClick={() =>
                                                                                this.onModalOpen(
                                                                                     product
                                                                                )
                                                                           }
                                                                      >
                                                                           Show all
                                                                           attributes
                                                                      </button>
                                                                 ) : null}
                                                            </div>
                                                       </div>
                                                       <div className="cart_item_right">
                                                            <QuantityCTL
                                                                 product={product}
                                                            />
                                                            <img
                                                                 className="product_img"
                                                                 src={product.gallery[0]}
                                                                 alt="product"
                                                            />
                                                       </div>
                                                  </div>
                                             </li>
                                        );
                                   })}
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
                                                       onChange={() => {}}
                                                       isSelected={this.isSelected(
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

export default connect(mapStateToProps)(CartPage);
