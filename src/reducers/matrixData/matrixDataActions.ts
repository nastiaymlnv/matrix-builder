export const INIT_MATRIX_VALUES = "INIT_MATRIX_VALUES";
export const INIT_MATRIX_ROWS_IDS = "INIT_MATRIX_ROWS_IDS";
export const ADD_NEW_ROW = "ADD_NEW_ROW";
export const DELETE_ROW = "DELETE_ROW";

export const initMatrixData = (
  value: { id: number | string; amount: number }[][],
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
  value: [{ id: number | string; amount: number }[][], string],
) => {
  return {
    type: ADD_NEW_ROW,
    payload: value,
  };
};

export const deleteRow = (value: { id: string; index: number }) => {
  return {
    type: DELETE_ROW,
    payload: value,
  };
};
