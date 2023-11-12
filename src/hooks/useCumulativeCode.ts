import { useAppSelector } from "./useTypedSelectorAndDispatch";

export const useCumulativeCode = (cellId: string) => {
  return useAppSelector((state) => {
    const { cellsArray, orderArray } = state.cells;

    const dataToDisplay = orderArray.map((id) => {
      return cellsArray.filter((item) => item.id === id);
    });
    const orderDataToDisplay = [];
    for (let i = 0; i < dataToDisplay.length; i++) {
      orderDataToDisplay.push(dataToDisplay[i][0]);
    }

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
    const showFuncNoop = "var show = () => {}";
    const cumulativeCode = [];
    for (let c of orderDataToDisplay) {
      if (c.type === "code") {
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
  }).join("\n");
};
