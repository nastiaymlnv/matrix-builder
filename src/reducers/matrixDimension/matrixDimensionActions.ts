export const SET_MATRIX_ROWS = "SET_MATRIX_ROWS";
export const SET_MATRIX_COLS = "SET_MATRIX_COLS";
export const SET_MATRIX_CELLS = "SET_MATRIX_CELLS";

export const setColumnsAmount = (value: number) => {
  return {
    type: SET_MATRIX_COLS,
    payload: value,
  };
};

export const setRowsAmount = (value: number) => {
  return {
    type: SET_MATRIX_ROWS,
    payload: value,
  };
};

export const setCellsAmount = (value: number) => {
  return {
    type: SET_MATRIX_CELLS,
    payload: value,
  };
};
