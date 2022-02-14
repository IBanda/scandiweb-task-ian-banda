import { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { graphql, ChildDataProps } from '@apollo/client/react/hoc';
import { Product } from '../utils/interfaces';
import { GET_CATEGORY } from '../graphql/queries';
import ProductCard from '../components/ProductCard';

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

class CategoryPage extends Component<childDateProps & Props> {
     componentDidUpdate(prevProps: Props) {
          if (prevProps.category != this.props.category) {
               this.props.data.refetch({
                    input: {
                         title: this.props.category,
                    },
               });
          }
     }
     render() {
          const {
               category,
               data: {
                    category: categoryData,
                    //   loading
               },
          } = this.props;

          return (
               <StyledDiv>
                    <h1 className="category_title">{category}</h1>
                    <div className="grid">
                         {categoryData?.products.map((product) => (
                              <ProductCard key={product.id} product={product} />
                         ))}
                    </div>
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

const GraphqlComponent = graphql<InputProps, Response, Variables, childDateProps & Props>(
     GET_CATEGORY
)(CategoryPage);

export default connect(mapStateToProps)(GraphqlComponent);
