export const INIT_MATRIX_ROWS = "INIT_MATRIX_ROWS";
export const INIT_MATRIX_COLS = "INIT_MATRIX_COLS";
export const INIT_MATRIX_CELLS = "INIT_MATRIX_CELLS";
export const INCREASE_ROW_AMOUNT = "INCREASE_ROW_AMOUNT";
export const DECREASE_ROW_AMOUNT = "DECREASE_ROW_AMOUNT";

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

export const increaseRowAmount = (value: number) => {
  return {
    type: INCREASE_ROW_AMOUNT,
    payload: value,
  };
};

export const decreaseRowAmount = (value: number) => {
  return {
    type: DECREASE_ROW_AMOUNT,
    payload: value,
  };
};
