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

type increaseCellAmountActionType = {
  type: "INCREASE_CELL_AMOUNT";
  payload: {rowNum: number, cellIndex: number};
};

type actionType =
  | {
      type: "INIT_MATRIX_VALUES" | "INIT_MATRIX_ROWS_IDS" | "ADD_NEW_ROW";
      payload: { id: string; amount: number }[][]
    }
  | deleteRowActionType
  | increaseCellAmountActionType;

const initialState = {
  matrixValues: [] as { amount: number }[][],
  matrixRowsIds: [] as string[],
  matrixRowsSum: [] as number[],
  matrixColsSum: [] as number[],
  matrixColsAvg: [] as number[],
};

const matrixParamsReducer = ( state = initialState, action: actionType) => {
  switch (action.type) {
    case INIT_MATRIX_VALUES:{
      const [matrixValues, rowsSums, colsSums, colsAvg] = action.payload;

      return {
        ...state,
        matrixValues: matrixValues,
        matrixRowsSum: rowsSums,
        matrixColsSum: colsSums,
        matrixColsAvg: colsAvg
      }
    }
    case INIT_MATRIX_ROWS_IDS:
      return {
        ...state,
        matrixRowsIds: action.payload,
      };
    case ADD_NEW_ROW: { 
      const [newRow, rowId, rowSum, newColsSum, newColsAvg] = action.payload;

      return {
        ...state,
        matrixValues: [...state.matrixValues, ...newRow],
        matrixRowsIds: [...state.matrixRowsIds, rowId],
        matrixRowsSum: [...state.matrixRowsSum, rowSum],
        matrixColsSum: newColsSum,
        matrixColsAvg: newColsAvg,
      }
    }
    case DELETE_ROW: {
      const { id, index, newColsSum, newColsAvg } = action.payload;
      state.matrixValues.splice(index, 1);
      state.matrixRowsSum.splice(index, 1);

      return {
        ...state,
        matrixRowsIds: state.matrixRowsIds.filter(
          (currId) => currId !== id,
        ),
        matrixColsSum: newColsSum,
        matrixColsAvg: newColsAvg,
      };
    }
    case INCREASE_CELL_AMOUNT: {
      const {rowNum, cellIndex} = action.payload;
      const newState = { ...state };

      newState.matrixValues[rowNum][cellIndex].amount += 1;
      newState.matrixRowsSum[rowNum] += 1;
      newState.matrixColsSum[cellIndex] += 1;
      newState.matrixColsAvg[cellIndex] = Math.round(newState.matrixColsSum[cellIndex] / newState.matrixValues.length);

      return newState;
    }
    default:
      return state;
  }
};

export default matrixParamsReducer;
