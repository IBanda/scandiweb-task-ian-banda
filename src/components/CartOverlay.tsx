import { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getPrice } from '../utils';
import { Currency, SelectedProduct } from '../utils/interfaces';
import { CartIcon } from './Icon';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Modal } from './Modal';
import CartDropdownList from './CartDropdownList';

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
          .empty_cart_msg {
               text-align: center;
               font-size: 16px;
               color: #8d8f9a;
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

class CartOverlay extends Component<Props & RouteComponentProps, State> {
     state = {
          isOverlayOpen: false,
     };

     componentDidMount() {
          window.addEventListener('click', this.onClick);
     }

     componentWillUnmount() {
          window.removeEventListener('click', this.onClick);
     }

     componentDidUpdate(prevProps: RouteComponentProps) {
          if (prevProps.location.pathname != this.props.location.pathname) {
               this.setState({ isOverlayOpen: false });
          }
     }
     onClick = (e: Event) => {
          const ele = e.target as HTMLElement;
          if (!(ele.closest('#cart_overlay') || ele.closest('.quantity'))) {
               this.setState({
                    isOverlayOpen: false,
               });
          }
     };

     formatItemCountText = (count: number) => {
          return `${count} item${count > 1 ? 's' : ''}`;
     };

     onCartClick = () => {
          this.setState((prev) => ({ isOverlayOpen: !prev.isOverlayOpen }));
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
                    <StyledDiv id="cart_overlay">
                         <button className="cart_btn" onClick={this.onCartClick}>
                              <CartIcon />
                              {!!totalQuantity && (
                                   <div className="indicator">{totalQuantity}</div>
                              )}
                         </button>
                         {isOverlayOpen && (
                              <div className="cart_dropdown">
                                   {cart.length ? (
                                        <>
                                             <h3 className="item_count">
                                                  my bag,
                                                  <span>
                                                       {this.formatItemCountText(
                                                            totalQuantity
                                                       )}
                                                  </span>
                                             </h3>

                                             <CartDropdownList />
                                             <div className="total_price">
                                                  <span>total </span>
                                                  <span>
                                                       {currency.symbol}
                                                       {totalPrice?.toFixed(2)}
                                                  </span>
                                             </div>
                                             <div className="cart_actions">
                                                  <Link to="/cart">
                                                       <button className="view_cart cart_actions_btn">
                                                            view bag
                                                       </button>
                                                  </Link>
                                                  <Link to="/">
                                                       <button className="checkout cart_actions_btn">
                                                            checkout
                                                       </button>
                                                  </Link>
                                             </div>
                                        </>
                                   ) : (
                                        <h1 className="empty_cart_msg">Cart is empty</h1>
                                   )}
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

const WrappedRouterComponent = withRouter(CartOverlay);

export default connect(mapStateToProps)(WrappedRouterComponent);
