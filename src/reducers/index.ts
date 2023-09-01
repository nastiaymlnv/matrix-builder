import { combineReducers } from "redux";

import { matrixParamsReducer } from "./matrixDimension";
import { matrixDataReducer } from "./matrixData";

const reducers = combineReducers({
  matrixDimension: matrixParamsReducer,
  matrixData: matrixDataReducer,
});

export default reducers;
