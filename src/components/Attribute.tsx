import { Component, SyntheticEvent } from 'react';
import styled from 'styled-components';
import { AttributeSet } from '../utils/interfaces';

const StyledDiv = styled.div`
     display: flex;
     gap: 0.5em;

     .attr_box {
          height: 45px;
          width: 63px;
          border: 1px solid #1d1f22;
          font-size: 14px;
          text-align: center;
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 400;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          .attr_btn {
               position: absolute;
               top: 0;
               left: 0;
               margin: 0;
               opacity: 0;
               height: 100%;
               width: 100%;
               z-index: 1;
               cursor: pointer;
          }
          &.selected {
               background-color: #1d1f22;
               color: #fff;
          }
          &.swatch_box.selected {
               outline: 3px double #1d1f22;
               border-color: transparent;
               box-shadow: 0 0 0 0.1rem #ccc;
          }
     }
`;

type Props = {
     attribute: AttributeSet | undefined;
     isSelected: (attrName: string, itemId: string) => boolean | undefined;
     onChange?: Function;
};

type State = {
     attrName: string;
     attr: Attribute;
     value: string;
};

export default class Attribute extends Component<Props, State> {
     state = {
          attrName: '',
          attr: {} as Attribute,
          value: '',
     };

     componentDidUpdate(_: unknown, prevState: State) {
          const { attrName, attr } = this.state;
          if (prevState.value != this.state.value) {
               this.props.onChange?.(attrName, attr);
          }
     }

     onInputChange = (
          e: SyntheticEvent<HTMLInputElement>,
          attrName: string,
          attr: Attribute
     ) => {
          this.setState({ value: (e.target as HTMLInputElement).value, attrName, attr });
     };
     render() {
          const { attribute, isSelected } = this.props;
          const isSwatch = attribute?.type === 'swatch';
          return (
               <StyledDiv className="attr_box_container">
                    {attribute?.items.map((item) => (
                         <div
                              key={item.id}
                              className={`attr_box ${
                                   attribute.type === 'swatch' ? 'swatch_box' : ''
                              }
                                                       ${
                                                            isSelected(
                                                                 attribute.name,
                                                                 item.id
                                                            )
                                                                 ? 'selected'
                                                                 : ''
                                                       }
                                                       `}
                              style={{
                                   ...(isSwatch
                                        ? {
                                               backgroundColor: item.value,
                                          }
                                        : null),
                              }}
                         >
                              <input
                                   type={'radio'}
                                   value={item.value}
                                   name={attribute.name}
                                   onChange={(e) =>
                                        this.onInputChange(
                                             e,
                                             attribute.name,
                                             item as unknown as Attribute
                                        )
                                   }
                                   className="attr_btn"
                              />
                              {isSwatch ? null : (
                                   <span className="attr_text">{item.displayValue}</span>
                              )}
                         </div>
                    ))}
               </StyledDiv>
          );
     }
}
