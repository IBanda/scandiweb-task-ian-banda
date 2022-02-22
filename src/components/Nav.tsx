import { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { changeCategory } from '../store/actions';
import type { Theme } from '../GlobalStyles';
import { graphql, ChildDataProps } from '@apollo/client/react/hoc';
import { GET_CATEGORIES } from '../graphql/queries';
import { Category } from '../utils/interfaces';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

const StyledNav = styled('nav')<{ theme: Theme }>`
     height: 100%;
     ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          gap: 1em;
          height: inherit;
          button {
               text-transform: uppercase;
               font-weight: 400;
               background-color: transparent;
               border: none;
               cursor: pointer;
               height: 100%;
               position: relative;

               &.active {
                    color: ${(props) => props.theme.primary};
                    font-weight: 600;
                    &::after {
                         content: '';
                         position: absolute;
                         height: 2px;
                         bottom: 0;
                         width: 100%;
                         left: 0;
                         background-color: ${(props) => props.theme.primary};
                    }
               }
          }
     }
`;

type Props = {
     changeCategory: Function;
     category: string;
};

type Response = {
     categories: Category[];
};
type childDataProps = ChildDataProps<{}, Response, {}>;

class Nav extends Component<Props & childDataProps & RouteComponentProps> {
     render() {
          const {
               data: { categories },
          } = this.props;
          const params = new URLSearchParams(this.props.location.search);
          const selectedCategory = params.get('cat');

          return (
               <StyledNav>
                    <ul>
                         {categories?.map((category, index) => (
                              <li key={category.name}>
                                   <Link
                                        to={`${
                                             index === 0 ? '' : `/?cat=${category.name}`
                                        }`}
                                   >
                                        <button
                                             className={`${
                                                  selectedCategory
                                                       ? selectedCategory ===
                                                         category.name
                                                            ? 'active'
                                                            : ''
                                                       : index === 0
                                                       ? 'active'
                                                       : ''
                                             }`}
                                             onClick={() =>
                                                  this.props.changeCategory(category.name)
                                             }
                                        >
                                             {category.name}
                                        </button>
                                   </Link>
                              </li>
                         ))}
                    </ul>
               </StyledNav>
          );
     }
}

type RootState = {
     category: string;
};

const mapStateToProps = (state: RootState) => ({
     category: state.category,
});

const WrappedRouterComponent = withRouter(Nav);
const WrappedReduxComponent = connect(mapStateToProps, { changeCategory })(
     WrappedRouterComponent
);
export default graphql<{}, Response, {}, childDataProps & Props>(GET_CATEGORIES)(
     WrappedReduxComponent
);
