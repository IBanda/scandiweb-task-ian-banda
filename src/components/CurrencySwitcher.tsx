import { Component } from 'react';
import styled from 'styled-components';
import { graphql, ChildDataProps } from '@apollo/client/react/hoc';
import { GET_CURRENCIES } from '../graphql/queries';
import { LineAngleDownIcon, LineAngleUpIcon } from './Icon';
import { connect } from 'react-redux';
import { changeCurrency } from '../store/actions';

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
               padding-right: 0;
               width: 40px;
               svg {
                    margin-top: 3px;
                    width: 6px;
                    height: 7px;
                    pointer-events: none;
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
type Props = {
     currency: Currency;
     changeCurrency: Function;
};

class CurrencySwitcher extends Component<childDataProps & Props, { isOpen: boolean }> {
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
               currency,
               changeCurrency: onChangeCurrency,
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
                         <div className="currency_symbol">{currency.symbol}</div>
                         {this.state.isOpen ? <LineAngleUpIcon /> : <LineAngleDownIcon />}
                    </button>

                    {this.state.isOpen ? (
                         <ul className="dropdown_list" role={'listbox'}>
                              {currencies?.map((currencyItem) => (
                                   <li
                                        key={currencyItem.symbol}
                                        aria-selected={false}
                                        role="option"
                                   >
                                        <button
                                             onClick={() =>
                                                  onChangeCurrency(currencyItem)
                                             }
                                             className="listitem_btn"
                                        >
                                             <div className="currency_symbol">
                                                  {currencyItem.symbol}
                                             </div>
                                             <div>{currencyItem.label}</div>
                                        </button>
                                   </li>
                              ))}
                         </ul>
                    ) : null}
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

const ConnectedComponent = connect(mapStateToProps, { changeCurrency })(CurrencySwitcher);

export default graphql<{}, Response, {}, childDataProps & Props>(GET_CURRENCIES)(
     ConnectedComponent
);
