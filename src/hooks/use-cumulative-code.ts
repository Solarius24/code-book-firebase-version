// @ts-nocheck
import { useAppSelector } from "./useTypedSelectorAndDispatch";

export const useCumulativeCode = (cellId: string) => {
  return useAppSelector((state) => {
    const {cellsArray} = state.cells;
    // const orderedCells = cellsArray.map((id) =>id.cellData);
    // console.log(orderedCells)

    const showFunc = `
    import _React from 'react';
    import _ReactDOM from 'react-dom';
    var show = (value) => {
      const root = document.querySelector('#root');

      if (typeof value === 'object') {
        if (value.$$typeof && value.props) {
          _ReactDOM.render(value, root);
        } else {
          root.innerHTML = JSON.stringify(value);
        }
      } else {
        root.innerHTML = value;
      }
    };
  `;
    const showFuncNoop = 'var show = () => {}';
    const cumulativeCode = [];
    for (let c of cellsArray) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoop);
        }
        cumulativeCode.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return cumulativeCode;
  }).join('\n');

};
