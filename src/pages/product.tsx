import { ChildDataProps, graphql } from '@apollo/client/react/hoc';
import { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { GET_PRODUCT } from '../graphql/queries';
import { Currency, Product } from '../utils/interfaces';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const StyledDiv = styled.div``;

type InputProp = {
     id: string;
};

type Variables = {
     id: string;
};

type Response = {
     product: Product;
};

type childDataProps = ChildDataProps<InputProp, Response, Variables>;

type Props = {
     currency: Currency;
};

class ProductPage extends Component<childDataProps & Props & RouteComponentProps> {
     render() {
          return <StyledDiv></StyledDiv>;
     }
}

type rootState = {
     currency: Currency;
};

const mapStateToProps = (state: rootState) => ({
     currency: state.currency,
});

const ComponentWithRouting = withRouter(ProductPage);

const ConnectedComponent = connect(mapStateToProps)(ComponentWithRouting);

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
})(ConnectedComponent);
