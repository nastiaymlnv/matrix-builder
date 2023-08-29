import {
    SET_MATRIX_ROWS,
    SET_MATRIX_COLS,
    SET_MATRIX_CELLS,
} from "./matrixDimensionActions";

type actionType = {
    type: "SET_MATRIX_COLS" | "SET_MATRIX_ROWS" | "SET_MATRIX_CELLS";
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
        case SET_MATRIX_COLS:
        return {
            matrixDimension: {
            ...state.matrixDimension,
            cols: action.payload,
            },
        };
        case SET_MATRIX_ROWS:
        return {
            matrixDimension: {
            ...state.matrixDimension,
            rows: action.payload,
            },
        };
        case SET_MATRIX_CELLS:
        return {
            matrixDimension: {
            ...state.matrixDimension,
            cells: action.payload,
            },
        };
        default:
        return state;
    }
};

export default matrixParamsReducer;
