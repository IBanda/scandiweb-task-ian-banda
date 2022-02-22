import { ChildDataProps, graphql } from '@apollo/client/react/hoc';
import { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { GET_PRODUCT } from '../graphql/queries';
import { Attribute as Attr, Currency, Product, Variant } from '../utils/interfaces';
import { addToCart } from '../store/actions';
import Attribute from '../components/Attribute';
import { getPrice, getSelectedVariant } from '../utils';
import { Loader } from '../components/Loader';
import GraphqlErrorAlert from '../components/GraphqlErrorAlert';
import parse from 'html-react-parser';

const StyledDiv = styled.div`
     display: grid;
     grid-template-columns: 3.5fr 2fr;
     gap: 2em;

     @media (max-width: 1024px) {
          grid-template-columns: 1fr;
     }
     .product {
          &_imgs {
               height: 550px;
               overflow: hidden;
               display: flex;
               gap: 2em;
               position: sticky;
               top: 62px;
               @media (max-width: 640px) {
                    flex-direction: column;
               }
               @media (max-width: 1024px) {
                    position: relative;
                    top: 0;
               }

               .thumbnail {
                    width: 90px;
                    height: 90px;
                    object-fit: cover;
                    margin-bottom: 1em;
                    cursor: pointer;
                    &:last-child {
                         margin-bottom: 0;
                    }
                    &:focus {
                         outline: none;
                    }
               }
               .product_img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
               }
          }
          &_thumbnails {
               height: inherit;
               overflow-y: auto;
               width: 100px;
               @media (max-width: 640px) {
                    order: 1;
                    display: flex;
                    height: 120px;
                    width: 100%;
                    gap: 1em;
                    overflow-y: unset;
                    overflow-x: scroll;
               }
          }
          &_main_img {
               height: 550px;
               width: 100%;
               @media (max-width: 640px) {
                    height: calc(100% - 150px);
               }
          }
          &_details {
               padding: 0 5em 0 3em;
               @media (max-width: 640px) {
                    padding: 0 1em;
               }
               .sticky_details {
                    position: sticky;
                    top: 60px;
                    background-color: #fff;
                    padding-bottom: 0.5em;
               }
               .product {
                    &_brand,
                    &_name {
                         font-size: 20px;
                    }
                    &_brand {
                         font-weight: 600;
                         margin-bottom: 10px;
                    }
                    &_name {
                         font-weight: 400;
                         margin: 0;
                         margin-bottom: 1em;
                    }
                    &_attributes {
                         .attr_name {
                              font-size: 16px;
                              font-weight: 600;
                              font-family: 'Roboto Condensed';
                              text-transform: uppercase;
                              margin-bottom: 7px;
                         }

                         .attr_box_container {
                              display: flex;
                              gap: 0.5em;
                         }
                    }
                    &_price {
                         margin-top: 2em;
                         .price_label {
                              font-family: 'Roboto Condensed';
                              text-transform: uppercase;
                              font-weight: 700;
                              font-size: 16px;
                              margin-bottom: 10px;
                         }
                         .price {
                              margin: 0;
                              font-weight: 700;
                              font-size: 20px;
                         }
                    }
               }
               .add_to_cart_btn {
                    height: 52px;
                    width: 100%;
                    color: #fff;
                    background-color: ${(props) => props.theme.primary};
                    border: none;
                    text-transform: uppercase;
                    font-size: 16px;
                    font-weight: 500;
                    margin: 2em 0;
                    cursor: pointer;
               }
               .out_of_stock_msg {
                    color: #8d8f9a;
                    text-transform: uppercase;
               }
               .product_description {
                    font-family: 'Roboto';
                    font-weight: 300;
                    font-size: 16px;

                    h1 {
                         font-size: 1.5em;
                    }
                    h2 {
                         font-size: 1.25em;
                    }
               }
          }
     }
`;

type InputProp = {
     id: string;
};

type Variables = {
     id: string;
};

type Response = {
     product: Product | null;
};

type childDataProps = ChildDataProps<InputProp, Response, Variables>;

type Props = {
     currency: Currency;
     addToCart: Function;
};

type State = {
     currentPreviewIndex: number;
     selectedVariant: Variant;
};

class ProductPage extends Component<childDataProps & Props & RouteComponentProps, State> {
     state = {
          currentPreviewIndex: 0,
          selectedVariant: {},
     };

     componentDidUpdate(prevProps: childDataProps) {
          if (
               this.props.data.product &&
               prevProps.data.product?.id != this.props.data.product?.id
          ) {
               this.setState({
                    selectedVariant: getSelectedVariant(this.props.data.product),
               });
          }
     }

     componentDidMount() {
          if (this.props.data.product) {
               this.setState({
                    selectedVariant: getSelectedVariant(this.props.data.product),
               });
          }
     }

     isSelected = (attrName: string, id: string) => {
          if (Object.keys(this.state.selectedVariant).length) {
               return (this.state.selectedVariant as Variant)[attrName].id === id;
          }
     };

     onVariantChange = (attrName: string, variant: Attr) => {
          this.setState((prev) => ({
               ...prev,
               selectedVariant: {
                    ...prev.selectedVariant,
                    [attrName]: variant,
               },
          }));
     };

     onAddToCart = () => {
          this.props.addToCart({
               ...this.props.data.product,
               variant: this.state.selectedVariant,
               quantity: 1,
          });
     };

     render() {
          const {
               data: { product, loading, error },
               currency,
          } = this.props;

          if (loading) return <Loader />;

          if (error) {
               return <GraphqlErrorAlert error={error} />;
          }

          const currentPrice = getPrice(product?.prices, currency.symbol);
          const { currentPreviewIndex } = this.state;
          return product ? (
               <StyledDiv>
                    <div className="product_imgs">
                         <div className="product_thumbnails">
                              {product?.gallery.map((imgSrc, index) => (
                                   <img
                                        src={imgSrc}
                                        key={imgSrc}
                                        alt="product thumbnail"
                                        className="thumbnail"
                                        role={'button'}
                                        tabIndex={0}
                                        data-testid="thumbnail"
                                        onClick={() =>
                                             this.setState({ currentPreviewIndex: index })
                                        }
                                   />
                              ))}
                         </div>

                         <div className="product_main_img">
                              <img
                                   src={product?.gallery[currentPreviewIndex]}
                                   alt="product"
                                   data-testid="main_img"
                                   className="product_img"
                              />
                         </div>
                    </div>
                    <div className="product_details">
                         <div className="sticky_details">
                              <h1 className="product_brand">{product?.brand}</h1>
                              <h2 className="product_name">{product?.name}</h2>
                              <div className="product_attributes">
                                   {product?.attributes.map((attr) => (
                                        <div key={attr.id}>
                                             <h3 className="attr_name">{attr.name}:</h3>
                                             <Attribute
                                                  isSelected={this.isSelected}
                                                  attribute={attr}
                                                  onChange={this.onVariantChange}
                                             />
                                        </div>
                                   ))}
                              </div>
                              <div className="product_price">
                                   <h3 className="price_label">price:</h3>
                                   <h4 className="price">
                                        {currentPrice?.currency.symbol}
                                        {currentPrice?.amount}
                                   </h4>
                              </div>
                              {product?.inStock ? (
                                   <button
                                        onClick={this.onAddToCart}
                                        className="add_to_cart_btn"
                                   >
                                        add to cart
                                   </button>
                              ) : (
                                   <h4 className="out_of_stock_msg">out of stock</h4>
                              )}
                         </div>
                         <div className="product_description">
                              {parse(product.description)}
                         </div>
                    </div>
               </StyledDiv>
          ) : (
               <div>
                    <h1>Product not found</h1>
               </div>
          );
     }
}

type rootState = {
     currency: Currency;
};

const mapStateToProps = (state: rootState) => ({
     currency: state.currency,
});

const WrappedRouterComponent = withRouter(ProductPage);

const WrappedReduxComponent = connect(mapStateToProps, { addToCart })(
     WrappedRouterComponent
);

type Params = {
     id: string;
};

export default graphql<
     InputProp & RouteComponentProps,
     Response,
     Variables,
     childDataProps
>(GET_PRODUCT, {
     options: (props) => ({
          variables: {
               id: (props.match.params as Params).id,
          },
     }),
})(WrappedReduxComponent);
