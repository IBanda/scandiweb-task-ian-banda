import { Component, SyntheticEvent } from 'react';
import styled from 'styled-components';
import { Currency, Product, Variant } from '../utils/interfaces';
import { connect } from 'react-redux';
import { CartIcon } from './Icon';
import { Link } from 'react-router-dom';
import { getPrice, getSelectedVariant } from '../utils';
import { addToCart } from '../store/actions';

const StyledDiv = styled.div`
     .product {
          &_card {
               background-color: #fff;
          }
          &_link {
               text-decoration: none;
               color: #000;
          }
          &_card_body {
               width: 386px;
               height: 444px;
               padding: 1em;
               cursor: pointer;
               &:hover {
                    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
                    .btn_add_to_cart {
                         display: block;
                    }
               }
               @media (max-width: 1024px) {
                    width: 100%;
                    height: 407px;
               }
          }
          &_card_img {
               height: calc(100% - 80px);
               width: 356px;
               position: relative;
               img {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    object-fit: cover;
               }
               .in_stock {
                    display: none;
               }
               .no_stock {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: rgba(255, 255, 255, 0.5);
                    position: absolute;
                    color: #8d8f9a;
                    font-weight: 400;
                    text-transform: uppercase;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
               }
               @media (max-width: 1024px) {
                    width: 100%;
               }
          }

          &_detail {
               height: 80px;
               padding: 1.5em 0 1em 0;
               position: relative;
               h3,
               h4 {
                    font-size: 16px;
                    margin: 0;
               }
               h3 {
                    font-weight: 300;
                    margin-bottom: 10px;
               }
               h4 {
                    font-weight: 500;
               }
               .btn_add_to_cart {
                    width: 52px;
                    height: 52px;
                    border-radius: 50%;
                    border: none;
                    background-color: ${(props) => props.theme.primary};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    top: -26px;
                    right: 1em;
                    box-shadow: 1px 1px 9px 5px rgba(0, 0, 0, 0.05);
                    display: none;
                    cursor: pointer;
                    svg {
                         width: 40px;
                         height: 40px;
                         fill: #fff;
                         margin-left: -3px;
                         margin-top: 2px;
                    }
               }
          }
     }
`;

type Props = {
     product: Product;
     currency: Currency;
     addToCart: Function;
};

type State = {
     selectedVariant: Variant;
};

class ProductCard extends Component<Props, State> {
     state = {
          selectedVariant: {},
     };

     onAddToCart = (e: SyntheticEvent<HTMLButtonElement>) => {
          e.preventDefault();
          this.props.addToCart({
               ...this.props.product,
               variant: this.state.selectedVariant,
               quantity: 1,
          });
     };

     componentDidMount() {
          this.setState({
               selectedVariant: getSelectedVariant(this.props.product),
          });
     }

     render() {
          const {
               product: { id, name, inStock, prices, gallery, brand },
               currency,
          } = this.props;

          const currentPrice = getPrice(prices, currency.symbol);
          return (
               <StyledDiv className="product_card" data-testid="product_card">
                    <Link className="product_link" to={`/product/${id}`}>
                         <div className="product_card_body">
                              <div className={`product_card_img `}>
                                   <img
                                        src={gallery[0]}
                                        alt="product"
                                        height={400}
                                        width={356}
                                   />
                                   {!inStock && (
                                        <div className="no_stock">out of stock</div>
                                   )}
                              </div>
                              <div className="product_detail">
                                   {inStock ? (
                                        <button
                                             data-testid="add_to_cart"
                                             className="btn_add_to_cart"
                                             onClick={this.onAddToCart}
                                        >
                                             <CartIcon />
                                        </button>
                                   ) : null}
                                   <h3>
                                        {brand} {name}
                                   </h3>
                                   <h4 data-testid="price">
                                        {currentPrice
                                             ? currentPrice.currency.symbol
                                             : '$'}
                                        {''}
                                        {currentPrice ? currentPrice.amount : ''}
                                   </h4>
                              </div>
                         </div>
                    </Link>
               </StyledDiv>
          );
     }
}

type rootState = {
     currency: Currency;
};
const mapStateToProps = (state: rootState) => ({
     currency: state.currency,
});

export default connect(mapStateToProps, { addToCart })(ProductCard);
