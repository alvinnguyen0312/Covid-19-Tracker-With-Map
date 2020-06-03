import { combineReducers } from "redux";
import { reportReducer } from "./reportReducer";

export const rootReducer = combineReducers({
  reports: reportReducer
});
