import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getPrice, isAttributedSelected } from '../utils';
import { Currency, SelectedProduct } from '../utils/interfaces';
import Attribute from './Attribute';
import QuantityCTL from './QuantityCTL';

type Props = {
     cart?: SelectedProduct[];
     currency?: Currency;
};

const StyledList = styled.ul`
     &.cart_list {
          list-style: none;
          margin: 0;
          padding: 0;
          max-height: 320px;
          overflow-y: auto;
          .cart_item {
               display: flex;
               justify-content: space-between;
               text-align: left;
               height: 120px;
               margin-bottom: 2em;
               .cart_left {
                    /* max-width: 50px; */
                    overflow-x: auto;
                    .brand,
                    .name,
                    .price {
                         font-size: 14px;
                         margin: 0 0 5px 0;
                    }
                    .name,
                    .brand {
                         font-weight: 300;
                    }
                    .name {
                         margin-bottom: 10px;
                    }
                    .price {
                         font-weight: 600;
                         margin-bottom: 22.5px;
                    }
                    .cart_attrs {
                         display: flex;
                         gap: 1em;
                    }
                    .attr_box {
                         width: 30px;
                         height: 30px;
                         background-color: #fff;
                         color: #000;

                         &.selected {
                              background-color: #eeeeee;
                              color: #a6a6a6;
                              border-color: #a6a6a6;
                         }
                         .attr_text {
                              font-size: 10px;
                              text-overflow: ellipsis;
                              overflow: hidden;
                         }
                    }
               }
               .cart_right {
                    display: flex;
                    .quantity {
                         button {
                              width: 30px;
                              height: 30px;
                         }
                         .quantity_text {
                              font-size: 14px;
                         }
                    }
                    .cart_img {
                         width: 75px;
                         height: 105px;
                         object-fit: contain;
                    }
               }
          }
     }
`;

class CartDropdownList extends Component<Props> {
     render() {
          const { cart, currency } = this.props;
          return (
               <StyledList className="cart_list" data-testid="cart_list">
                    {cart?.map((product, index) => {
                         const currentPrice = getPrice(
                              product.prices,
                              currency?.symbol as string
                         );
                         return (
                              <li
                                   data-testid="cart_list_item"
                                   className="cart_item"
                                   key={`${product.id}-${index}`}
                              >
                                   <div className="cart_left">
                                        <h4 className="brand">
                                             <Link to={`/product/${product.id}`}>
                                                  {product.brand}
                                             </Link>
                                        </h4>
                                        <h5
                                             data-testid="cart_list-product_name"
                                             className="name"
                                        >
                                             <Link to={`/product/${product.id}`}>
                                                  {product.name}
                                             </Link>
                                        </h5>
                                        <h6 className="price">
                                             {currentPrice?.currency.symbol}{' '}
                                             {currentPrice?.amount}
                                        </h6>
                                        <div className="cart_attrs">
                                             {product.attributes.map((attr) => (
                                                  <Attribute
                                                       key={attr.id}
                                                       attribute={attr}
                                                       isSelected={isAttributedSelected(
                                                            product
                                                       )}
                                                  />
                                             ))}
                                        </div>
                                   </div>
                                   <div className="cart_right">
                                        <QuantityCTL product={product} />
                                        <img
                                             className="cart_img"
                                             src={product.gallery[0]}
                                             alt="product"
                                        />
                                   </div>
                              </li>
                         );
                    })}
               </StyledList>
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

export default connect(mapStateToProps)(CartDropdownList);
