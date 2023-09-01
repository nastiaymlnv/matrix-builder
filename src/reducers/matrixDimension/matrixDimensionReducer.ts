import {
  INIT_MATRIX_ROWS,
  INIT_MATRIX_COLS,
  INIT_MATRIX_CELLS,
} from "./matrixDimensionActions";

type actionType = {
  type: "INIT_MATRIX_COLS" | "INIT_MATRIX_ROWS" | "INIT_MATRIX_CELLS";
  payload: number;
};

const initialState = {
  matrixDimension: {
    cols: 0,
    rows: 0,
    cells: 0,
  },
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
    default:
      return state;
  }
};

export default matrixParamsReducer;
