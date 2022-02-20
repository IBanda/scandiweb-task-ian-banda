import { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { graphql, ChildDataProps } from '@apollo/client/react/hoc';
import { Product } from '../utils/interfaces';
import { GET_CATEGORY } from '../graphql/queries';
import ProductCard from '../components/ProductCard';
import { Loader } from '../components/Loader';

const StyledDiv = styled.div`
     h1.category_title {
          font-weight: 300;
          text-transform: capitalize;
          margin-bottom: 2em;
          font-size: 42px;
     }
     .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4em 2em;

          @media (max-width: 1024px) {
               grid-template-columns: repeat(2, 1fr);
          }
          @media (max-width: 540px) {
               grid-template-columns: 1fr;
          }
     }
     .pagination {
          display: flex;
          justify-content: center;
          gap: 1em;
          margin: 2em auto;
          button {
               background-color: ${(props) => props.theme.primary};
               width: 40px;
               height: 40px;
               border: none;
               color: #fff;
               cursor: pointer;
          }
     }
`;

type InputProps = {
     input?: {
          title?: string;
     };
};

type Response = {
     category: { products: Product[] };
};

type Variables = {
     input: {
          title?: string;
     };
};

type childDateProps = ChildDataProps<InputProps, Response, Variables>;

type Props = {
     category: string;
};

type State = {
     page: number;
};

class CategoryPage extends Component<childDateProps & Props, State> {
     state = {
          page: 1,
     };
     componentDidUpdate(prevProps: Props) {
          if (prevProps.category != this.props.category) {
               this.props.data.refetch({
                    input: {
                         title: this.props.category,
                    },
               });
               this.setState({ page: 1 });
          }
     }
     render() {
          const {
               category,
               data: { category: categoryData, loading },
          } = this.props;

          if (loading) return <Loader />;

          const products = categoryData?.products;
          const pageSize = 6;
          const pages = products ? Math.ceil(products.length / pageSize) : 0;
          const startFrom = this.state.page - 1;
          const paginatedData = products?.slice(
               startFrom * pageSize,
               this.state.page * pageSize
          );
          const showPagination = products ? pageSize < products.length : false;
          return (
               <StyledDiv>
                    <h1 className="category_title">{category}</h1>
                    <div className="grid">
                         {paginatedData?.map((product) => (
                              <ProductCard key={product.id} product={product} />
                         ))}
                    </div>
                    {showPagination && (
                         <div className="pagination">
                              <button
                                   disabled={this.state.page === 1}
                                   onClick={() =>
                                        this.setState((prev) => ({
                                             page: prev.page - 1,
                                        }))
                                   }
                              >
                                   &larr;
                              </button>
                              {Array(pages)
                                   .fill(0)
                                   .map((page, index) => (
                                        <button
                                             key={index}
                                             onClick={() =>
                                                  this.setState({ page: index + 1 })
                                             }
                                        >
                                             {index + 1}
                                        </button>
                                   ))}
                              <button
                                   disabled={this.state.page === pages}
                                   onClick={() =>
                                        this.setState((prev) => ({ page: prev.page + 1 }))
                                   }
                              >
                                   &rarr;
                              </button>
                         </div>
                    )}
               </StyledDiv>
          );
     }
}

type rootState = {
     category: string;
};

const mapStateToProps = (state: rootState) => ({
     category: state.category,
});

const WrappedGraphqlComponent = graphql<
     InputProps & Props,
     Response,
     Variables,
     childDateProps
>(GET_CATEGORY, {
     options: (props) => ({
          variables: {
               input: {
                    title: props.category,
               },
          },
     }),
})(CategoryPage);

export default connect(mapStateToProps)(WrappedGraphqlComponent);
