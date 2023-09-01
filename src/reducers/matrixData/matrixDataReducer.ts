import {
  INIT_MATRIX_VALUES,
  INIT_MATRIX_ROWS_IDS,
  ADD_NEW_ROW,
  DELETE_ROW,
} from "./matrixDataActions";

type deleteRowActionType = {
  type: "DELETE_ROW";
  payload: { id: string; index: number };
};

type actionType =
  | {
      type: "INIT_MATRIX_VALUES" | "INIT_MATRIX_ROWS_IDS" | "ADD_NEW_ROW";
      payload: { id: number | string; amount: number }[][] | string[] | string;
    }
  | deleteRowActionType;

const matrixParamsReducer = (
  state = { matrixValues: [], matrixRowsIds: [] },
  action: actionType,
) => {
  switch (action.type) {
    case INIT_MATRIX_VALUES:
      return {
        ...state,
        matrixValues: action.payload,
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
      };
    case DELETE_ROW: {
      const { index } = action.payload as { index: number };
      state.matrixValues.splice(index, 1);

      return {
        ...state,
        matrixRowsIds: state.matrixRowsIds.filter(
          (id) => id !== action.payload.id,
        ),
      };
    }
    default:
      return state;
  }
};

export default matrixParamsReducer;
