import { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { changeCategory } from '../store/actions';
import type { Theme } from '../GlobalStyles';
import { graphql, ChildDataProps } from '@apollo/client/react/hoc';
import { GET_CATEGORIES } from '../graphql/queries';
import { Category } from '../utils/interfaces';

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

class Nav extends Component<Props & childDataProps> {
     render() {
          const {
               category: selectedCategory,
               changeCategory: onCategoryChange,
               data: { categories },
          } = this.props;
          return (
               <StyledNav>
                    <ul>
                         {categories?.map((category) => (
                              <li key={category.name}>
                                   <button
                                        onClick={() => onCategoryChange(category.name)}
                                        className={`${
                                             selectedCategory === category.name
                                                  ? 'active'
                                                  : ''
                                        }`}
                                   >
                                        {category.name}
                                   </button>
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

const WrappedGraphqlComponent = graphql<{}, Response, {}, childDataProps & Props>(
     GET_CATEGORIES
)(Nav);
export default connect(mapStateToProps, { changeCategory })(WrappedGraphqlComponent);
