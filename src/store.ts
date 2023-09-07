import { legacy_createStore } from "redux";

import reducers from "./reducers";

const getInitialStore = () => {
  return {
    matrixDimension: {
      cols: 1,
      rows: 1,
      cells: 1,
    },
    matrixData: {
      matrixValues: [],
      matrixRowsIds: [],
      matrixRowsSum: [],
      matrixColsSum: [],
      matrixColsAvg: []
    },
  };
};

export const store = legacy_createStore(reducers, getInitialStore());
store.subscribe(() => console.log(store.getState())); // to remove
