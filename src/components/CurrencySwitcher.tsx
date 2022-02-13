import { Component } from 'react';
import styled from 'styled-components';
import { graphql, ChildDataProps } from '@apollo/client/react/hoc';
import { GET_CURRENCIES } from '../graphql/queries';
import { LineAngleDownIcon, LineAngleUpIcon } from './Icon';

type Currency = {
     label: string;
     symbol: string;
};

type Response = {
     currencies: Currency[];
};
const StyledDiv = styled.div`
     position: relative;
     button {
          display: flex;
          align-items: center;
          background-color: transparent;
          cursor: pointer;
          border: none;
          &.currency_dropdown_btn {
               padding-left: 1em;
               svg {
                    margin-top: 4px;
                    width: 7px;
               }
          }
          &.listitem_btn {
               font-size: 13px;
               padding: 0.1em 1em;
               width: 100%;
          }
     }
     ul.dropdown_list {
          position: absolute;
          top: 1.5em;
          list-style: none;
          padding: 0;
          margin: 0;
          width: 90px;
          padding: 1em 0;
          box-shadow: 1px 1px 9px 2px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          align-items: stretch;
          li {
               margin-bottom: 0.5em;
               &:last-child {
                    margin-bottom: 0;
               }
          }
     }
     .currency_symbol {
          margin-right: 5px;
          font-weight: 500;
          font-size: 13px;
     }
`;

type childDataProps = ChildDataProps<{}, Response>;

class CurrencySwitcher extends Component<childDataProps, { isOpen: boolean }> {
     state = {
          isOpen: false,
     };

     onClick = (e: Event) => {
          if (!(e.target as HTMLElement).closest('#currency_dropdown')) {
               this.setState({
                    isOpen: false,
               });
          }
     };

     componentDidMount() {
          window.addEventListener('click', this.onClick);
     }

     componentWillUnmount() {
          window.removeEventListener('click', this.onClick);
     }

     render() {
          const {
               data: { currencies },
          } = this.props;
          return (
               <StyledDiv id="currency_dropdown">
                    <button
                         className="currency_dropdown_btn"
                         onClick={() =>
                              this.setState((prev) => ({
                                   isOpen: !prev.isOpen,
                              }))
                         }
                    >
                         <div className="currency_symbol">$</div>
                         {this.state.isOpen ? <LineAngleUpIcon /> : <LineAngleDownIcon />}
                    </button>

                    {this.state.isOpen ? (
                         <ul className="dropdown_list" role={'listbox'}>
                              {currencies?.map((currency) => (
                                   <li
                                        key={currency.symbol}
                                        aria-selected={false}
                                        role="option"
                                   >
                                        <button className="listitem_btn">
                                             <div className="currency_symbol">
                                                  {currency.symbol}
                                             </div>
                                             <div>{currency.label}</div>
                                        </button>
                                   </li>
                              ))}
                         </ul>
                    ) : null}
               </StyledDiv>
          );
     }
}

export default graphql<{}, Response, {}, childDataProps>(GET_CURRENCIES)(
     CurrencySwitcher
);
