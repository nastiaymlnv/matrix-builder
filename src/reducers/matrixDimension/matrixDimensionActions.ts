export const INIT_MATRIX_ROWS = "INIT_MATRIX_ROWS";
export const INIT_MATRIX_COLS = "INIT_MATRIX_COLS";
export const INIT_MATRIX_CELLS = "INIT_MATRIX_CELLS";

export const initColumnsAmount = (value: number) => {
  return {
    type: INIT_MATRIX_COLS,
    payload: value,
  };
};

export const initRowsAmount = (value: number) => {
  return {
    type: INIT_MATRIX_ROWS,
    payload: value,
  };
};

export const initCellsAmount = (value: number) => {
  return {
    type: INIT_MATRIX_CELLS,
    payload: value,
  };
};
