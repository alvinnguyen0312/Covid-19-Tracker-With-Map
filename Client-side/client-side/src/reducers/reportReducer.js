import { ACTION_TYPES } from "../actions/actionTypes";
const initialState = {
  data: [],
  summary: []
};

export const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_SUMMARY_REPORT:
      return {
        ...state,
        summary: action.payload
      };
    case ACTION_TYPES.FETCH_DETAILED_REPORT:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};
