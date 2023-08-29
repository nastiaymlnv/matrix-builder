import { legacy_createStore } from "redux";

import { matrixParamsReducer } from "./reducers/matrixDimension";

const getInitialStore = () => {
  return {
    matrixDimension: {
      cols: 1,
      rows: 1,
      cells: 1,
    },
  };
};

export const store = legacy_createStore(matrixParamsReducer, getInitialStore());
store.subscribe(() => console.log(store.getState())); // to remove
