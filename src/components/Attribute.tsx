import { Component } from 'react';
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

export default class Attribute extends Component<Props> {
     render() {
          const { attribute, isSelected, onChange } = this.props;
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
                              <button
                                   className="attr_btn"
                                   onClick={() => onChange?.(attribute.name, item)}
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
