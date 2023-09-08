export const INIT_MATRIX_VALUES = "INIT_MATRIX_VALUES";
export const INIT_MATRIX_ROWS_IDS = "INIT_MATRIX_ROWS_IDS";
export const ADD_NEW_ROW = "ADD_NEW_ROW";
export const DELETE_ROW = "DELETE_ROW";
export const INCREASE_CELL_AMOUNT = "INCREASE_CELL_AMOUNT";

export const initMatrixData = (
  value: [
    { id: number | string; amount: number }[][],
    number[],
    number[],
    number[],
  ],
) => {
  return {
    type: INIT_MATRIX_VALUES,
    payload: value,
  };
};

export const initMatrixRowsIds = (value: string[]) => {
  return {
    type: INIT_MATRIX_ROWS_IDS,
    payload: value,
  };
};

export const addNewRow = (
  value: [
    { id: number | string; amount: number }[][],
    string,
    number,
    number[],
    number[],
  ],
) => {
  return {
    type: ADD_NEW_ROW,
    payload: value,
  };
};

export const deleteRow = (value: {
  id: string;
  index: number;
  newColsSum: number[];
  newColsAvg: number[];
}) => {
  return {
    type: DELETE_ROW,
    payload: value,
  };
};

export const increaseCellAmount = (value: {
  rowNum: number;
  cellIndex: number;
}) => {
  return {
    type: INCREASE_CELL_AMOUNT,
    payload: value,
  };
};
