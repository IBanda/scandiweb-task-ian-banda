import { connect } from 'react-redux';
import { Component } from 'react';
import styled from 'styled-components';
import { Currency, SelectedProduct } from '../utils/interfaces';
import { removeFromCart } from '../store/actions';
import { Link } from 'react-router-dom';
import { getPrice, isAttributedSelected } from '../utils';
import Attribute from './Attribute';
import QuantityCTL from './QuantityCTL';
import CartItemImage from './CartImage';

const StyledListItem = styled.li`
     border-top: 1px solid #e5e5e5;
     padding: 1em 0;
     cursor: pointer;
     & > div {
          display: flex;
          justify-content: space-between;
          height: 164px;
     }
     &:hover {
          .cart_item_left {
               .show_more_btn {
                    display: block;
               }
               .name_row > button {
                    display: inline-block;
               }
          }
     }
     .cart {
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
                    margin: 0 10px 0 0;
               }
               .price {
                    font-weight: 600;
                    font-size: 16px;
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
                    display: none;
               }
               .name_row {
                    display: flex;
                    align-items: center;
                    button {
                         display: none;
                         background-color: transparent;
                         border: none;
                         text-transform: capitalize;
                         color: ${(props) => props.theme.primary};
                    }
               }
          }
          &_item_right {
               display: flex;
          }
     }
`;

type Props = {
     product: SelectedProduct;
     currency?: Currency;
     removeFromCart?: Function;
     onModalOpen?: Function;
};

class CartItem extends Component<Props> {
     onRemoveFromCart = (product: SelectedProduct) => {
          this.props.removeFromCart?.(product);
     };

     render() {
          const { product, currency } = this.props;
          const currentPrice = getPrice(product.prices, currency?.symbol as string);
          return (
               <StyledListItem className="cart_item">
                    <div>
                         <div className="cart_item_left">
                              <h2 className="brand">{product.brand}</h2>

                              <div className="name_row">
                                   <h3 className="name">
                                        <Link to={`/product/${product.id}`}>
                                             {product.name}
                                        </Link>
                                   </h3>
                                   <button
                                        onClick={() => this.onRemoveFromCart(product)}
                                        className="remove_btn"
                                   >
                                        remove
                                   </button>
                              </div>
                              <h4 className="price">
                                   {currentPrice?.currency.symbol}
                                   {currentPrice?.amount}
                              </h4>
                              <div className="attr_container">
                                   <Attribute
                                        attribute={product.attributes[0]}
                                        onChange={() => {}}
                                        isSelected={isAttributedSelected(product)}
                                   />
                                   {product.attributes.length &&
                                   product.attributes.length > 1 ? (
                                        <button
                                             className="show_more_btn"
                                             onClick={() =>
                                                  this.props.onModalOpen?.(product)
                                             }
                                        >
                                             Show all attributes
                                        </button>
                                   ) : null}
                              </div>
                         </div>
                         <div className="cart_item_right">
                              <QuantityCTL product={product} />
                              <CartItemImage gallery={product.gallery} />
                         </div>
                    </div>
               </StyledListItem>
          );
     }
}

type rootState = {
     currency: Currency;
};

const mapStateToProps = (state: rootState) => ({
     currency: state.currency,
});

export default connect(mapStateToProps, { removeFromCart })(CartItem);
