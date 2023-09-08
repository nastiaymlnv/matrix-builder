import {
  INIT_MATRIX_ROWS,
  INIT_MATRIX_COLS,
  INIT_MATRIX_CELLS,
  INCREASE_ROW_AMOUNT,
  DECREASE_ROW_AMOUNT,
} from "./matrixDimensionActions";

type actionType = {
  type:
    | "INIT_MATRIX_COLS"
    | "INIT_MATRIX_ROWS"
    | "INIT_MATRIX_CELLS"
    | "INCREASE_ROW_AMOUNT"
    | "DECREASE_ROW_AMOUNT";
  payload: number;
};

const initialState = {
  cols: 0,
  rows: 0,
  cells: 0,
};

const matrixParamsReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case INIT_MATRIX_COLS:
      return {
        ...state,
        cols: action.payload,
      };
    case INIT_MATRIX_ROWS:
      return {
        ...state,
        rows: action.payload,
      };
    case INIT_MATRIX_CELLS:
      return {
        ...state,
        cells: action.payload,
      };
    case INCREASE_ROW_AMOUNT:
    case DECREASE_ROW_AMOUNT:
      return {
        ...state,
        rows: action.payload,
      };
    default:
      return state;
  }
};

export default matrixParamsReducer;
