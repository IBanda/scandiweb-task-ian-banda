import { Component, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import getPrice from '../utils/getPrice';
import { Currency, SelectedProduct } from '../utils/interfaces';
import Attribute from './Attribute';
import { CartIcon } from './Icon';
import QuantityCTL from './QuantityCTL';
import { Link } from 'react-router-dom';
import { Modal } from './Modal';

const StyledDiv = styled.div`
     cursor: pointer;
     position: relative;
     .cart_btn {
          position: relative;
          background-color: transparent;
          border: none;
          padding: 0;
     }
     svg {
          margin-top: 3px;
          width: 45px;
          height: 35px;
     }
     .indicator {
          font-family: Roboto;
          font-size: 10px;
          width: 18px;
          height: 18px;
          background-color: #000;
          color: #fff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 1px;
          right: 3px;
     }
     .item_count {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 2em 0;
     }
     .cart_dropdown {
          background-color: #fff;
          width: 375px;

          padding: 1em;
          position: absolute;
          right: 0;
          top: 50px;
          text-align: left;
          .item_count {
               font-weight: 600;
               font-size: 16px;
               text-transform: capitalize;
               span {
                    font-weight: 200;
                    text-transform: lowercase;
               }
          }
          .total_price {
               margin-top: 1em;
               display: flex;
               justify-content: space-between;
               width: 100%;
               text-transform: capitalize;
               font-family: Roboto;
               font-size: 14px;
               font-weight: 700;
          }
          .cart_actions {
               margin-top: 2em;
               display: flex;
               gap: 1em;
               a {
                    text-decoration: none;
               }
               &_btn {
                    height: 43px;
                    background-color: #fff;
                    border: 1px solid;
                    font-size: 14px;
                    font-weight: 600;
                    text-transform: uppercase;
                    width: 164px;
                    &.checkout {
                         background-color: ${(props) => props.theme.primary};
                         color: #fff;
                    }
               }
          }
     }
     .cart_list {
          list-style: none;
          margin: 0;
          padding: 0;
          max-height: 250px;
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
                    .attr_box {
                         width: 33px;
                         height: 33px;
                         background-color: #fff;
                         color: #000;

                         &.selected {
                              background-color: #eeeeee;
                              color: #a6a6a6;
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
                              width: 33px;
                              height: 33px;
                         }
                         .quantity_text {
                              font-size: 14px;
                         }
                    }
                    .cart_img {
                         width: 90px;
                         height: 120px;
                         object-fit: contain;
                    }
               }
          }
     }
`;

type Props = {
     cart: SelectedProduct[];
     currency: Currency;
};

type State = {
     isOverlayOpen: boolean;
};

class CartOverlay extends Component<Props, State> {
     state = {
          isOverlayOpen: false,
     };

     onClick = (e: Event) => {
          if (!(e.target as HTMLElement).closest('#cart_overlay')) {
               this.setState({
                    isOverlayOpen: false,
               });
          }
     };

     componentDidMount() {
          window.addEventListener('click', this.onClick);
     }

     componentWillUnmount() {
          window.removeEventListener('click', this.onClick);
     }

     formatItemCountText = (count: number) => {
          return `${count} item${count > 1 ? 's' : ''}`;
     };
     isSelected = (product: SelectedProduct) => (attrName: string, id: string) => {
          if (Object.keys(product.variant).length) {
               return product.variant[attrName].id === id;
          }
     };

     onPageTransition = (e: SyntheticEvent) => {
          e.preventDefault();
          this.setState({ isOverlayOpen: false });
     };

     render() {
          const { isOverlayOpen } = this.state;
          const { cart, currency } = this.props;
          const totalQuantity = cart
               .map((item) => item.quantity)
               .reduce((acc, cur) => acc + cur, 0);
          const totalPrice =
               cart.length &&
               cart
                    .map(
                         (p) =>
                              (getPrice(p.prices, currency.symbol)?.amount as number) *
                              p.quantity
                    )
                    .reduce((acc, cur) => {
                         if ((acc || acc == 0) && cur) {
                              return acc + cur;
                         }
                         return 0;
                    }, 0);

          return (
               <>
                    <StyledDiv
                         onClick={() => this.setState({ isOverlayOpen: true })}
                         id="cart_overlay"
                    >
                         <CartIcon />
                         {!!totalQuantity && (
                              <div className="indicator">{totalQuantity}</div>
                         )}
                         {isOverlayOpen && (
                              <div className="cart_dropdown">
                                   <h3 className="item_count">
                                        my bag,
                                        <span>
                                             {this.formatItemCountText(cart.length)}
                                        </span>
                                   </h3>

                                   <ul className="cart_list">
                                        {cart.map((product, index) => {
                                             const currentPrice = getPrice(
                                                  product.prices,
                                                  currency.symbol
                                             );
                                             return (
                                                  <li
                                                       className="cart_item"
                                                       key={`${product.id}-${index}`}
                                                  >
                                                       <div className="cart_left">
                                                            <h4 className="brand">
                                                                 {product.brand}
                                                            </h4>
                                                            <h5 className="name">
                                                                 {product.name}
                                                            </h5>
                                                            <h6 className="price">
                                                                 {
                                                                      currentPrice
                                                                           ?.currency
                                                                           .symbol
                                                                 }{' '}
                                                                 {currentPrice?.amount}
                                                            </h6>
                                                            <Attribute
                                                                 attribute={
                                                                      product
                                                                           .attributes[0]
                                                                 }
                                                                 isSelected={this.isSelected(
                                                                      product
                                                                 )}
                                                            />
                                                       </div>
                                                       <div className="cart_right">
                                                            <QuantityCTL
                                                                 product={product}
                                                            />
                                                            <img
                                                                 className="cart_img"
                                                                 src={product.gallery[0]}
                                                                 alt="product"
                                                            />
                                                       </div>
                                                  </li>
                                             );
                                        })}
                                   </ul>
                                   <div className="total_price">
                                        <span>total </span>
                                        <span>
                                             {currency.symbol}
                                             {totalPrice?.toFixed(2)}
                                        </span>
                                   </div>
                                   <div className="cart_actions">
                                        <Link to="/cart">
                                             <button
                                                  onClick={this.onPageTransition}
                                                  className="view_cart cart_actions_btn"
                                             >
                                                  view cart
                                             </button>
                                        </Link>
                                        <Link to="/">
                                             <button className="checkout cart_actions_btn">
                                                  checkout
                                             </button>
                                        </Link>
                                   </div>
                              </div>
                         )}
                    </StyledDiv>
                    {isOverlayOpen && <Modal />}
               </>
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

export default connect(mapStateToProps)(CartOverlay);
