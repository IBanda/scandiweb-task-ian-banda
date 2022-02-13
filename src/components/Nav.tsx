import { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { changeCategory } from '../store/actions';
import type { Theme } from '../GlobalStyles';

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

const categories = ['all', 'clothes', 'tech'];

type Props = {
     changeCategory: Function;
     category: string;
};

class Nav extends Component<Props> {
     render() {
          const { category: selectedCategory, changeCategory: onCategoryChange } =
               this.props;
          return (
               <StyledNav>
                    <ul>
                         {categories.map((category) => (
                              <li key={category}>
                                   <button
                                        onClick={() => onCategoryChange(category)}
                                        className={`${
                                             selectedCategory === category ? 'active' : ''
                                        }`}
                                   >
                                        {category}
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

export default connect(mapStateToProps, { changeCategory })(Nav);
