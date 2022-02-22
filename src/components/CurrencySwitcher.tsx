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
               padding-left: 1.5em;
               padding-right: 0;
               width: 57px;
               position: relative;

               svg {
                    margin-top: 3px;
                    width: 7px;
                    height: 3px;
                    pointer-events: none;
                    position: absolute;
                    right: 11px;
               }
          }
          &.listitem_btn {
               font-size: 13px;
               padding: 0.1em 1.5em;
               width: 100%;
               &:hover {
                    background-color: ${(props) => props.theme.primary};
                    color: #fff;
               }
               &.selected {
                    background-color: #e2e0e0;
                    color: #000;
               }
          }
     }
     ul.dropdown_list {
          position: absolute;
          z-index: 3;
          top: 1.5em;
          list-style: none;
          padding: 0;
          margin: 0;
          width: 114px;
          padding: 1em 0;
          background-color: #fff;
          box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);

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
     .currency {
          &_symbol {
               margin-right: 5px;
               font-weight: 500;
               font-size: 15px;
          }
          &_label {
               font-size: 15px;
               font-weight: 500;
          }
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
                         data-testid="currency_btn"
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
                                             data-testid="currency_item_btn"
                                             onClick={() =>
                                                  onChangeCurrency(currencyItem)
                                             }
                                             className={`listitem_btn ${
                                                  currencyItem.label === currency.label
                                                       ? 'selected'
                                                       : ''
                                             }`}
                                        >
                                             <div className="currency_symbol">
                                                  {currencyItem.symbol}
                                             </div>
                                             <div className="currency_label">
                                                  {currencyItem.label}
                                             </div>
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

const WrappedGraphqlComponent = graphql<{}, Response, {}, childDataProps & Props>(
     GET_CURRENCIES
)(CurrencySwitcher);

export default connect(mapStateToProps, { changeCurrency })(WrappedGraphqlComponent);
