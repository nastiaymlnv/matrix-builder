import {
  INIT_MATRIX_VALUES,
  INIT_MATRIX_ROWS_IDS,
  ADD_NEW_ROW,
  DELETE_ROW,
  INCREASE_CELL_AMOUNT
} from "./matrixDataActions";

type deleteRowActionType = {
  type: "DELETE_ROW";
  payload: { id: string; index: number, newColsSum: number[], newColsAvg: number[] };
};

type actionType =
  | {
      type: "INIT_MATRIX_VALUES" | "INIT_MATRIX_ROWS_IDS" | "ADD_NEW_ROW" | "INCREASE_CELL_AMOUNT";
      payload: { id: number | string; amount: number }[][] 
      | string[] 
      | string 
      | number[]
    }
  | deleteRowActionType;

const matrixParamsReducer = (
  state = { 
    matrixValues: [], 
    matrixRowsIds: [], 
    matrixRowsSum: [], 
    matrixColsSum: [], 
    matrixColsAvg: [] 
  },
  action: actionType,
) => {
  switch (action.type) {
    case INIT_MATRIX_VALUES:
      return {
        ...state,
        matrixValues: action.payload[0],
        matrixRowsSum: action.payload[1],
        matrixColsSum: action.payload[2],
        matrixColsAvg: action.payload[3]
      };
    case INIT_MATRIX_ROWS_IDS:
      return {
        ...state,
        matrixRowsIds: action.payload,
      };
    case ADD_NEW_ROW: 
      return {
        ...state,
        matrixValues: [...state.matrixValues, ...action.payload[0]],
        matrixRowsIds: [...state.matrixRowsIds, action.payload[1]],
        matrixRowsSum: [...state.matrixRowsSum, action.payload[2]],
        matrixColsSum: action.payload[3],
        matrixColsAvg: action.payload[4],
      };
    case DELETE_ROW: {
      const { index } = action.payload as { index: number };
      state.matrixValues.splice(index, 1);
      state.matrixRowsSum.splice(index, 1);

      return {
        ...state,
        matrixRowsIds: state.matrixRowsIds.filter(
          (id) => id !== action.payload.id,
        ),
        matrixColsSum: action.payload.newColsSum,
        matrixColsAvg: action.payload.newColsAvg,
      };
    }
    case INCREASE_CELL_AMOUNT:
      {
      const currRow = action.payload[0] ;
      const currCell = action.payload[1];
      const newState = { ...state };

      newState.matrixValues[currRow][currCell].amount += 1;
      newState.matrixRowsSum[currRow] += 1;
      newState.matrixColsSum[currCell] += 1;
      newState.matrixColsAvg[currCell] = Math.round(newState.matrixColsSum[currCell] / newState.matrixValues.length);

      return newState;
    }
    default:
      return state;
  }
};

export default matrixParamsReducer;
