import { combineReducers } from "redux";
import { drivesReducer } from "./drivesReducer";

export const rootReducer = combineReducers({
  drives: drivesReducer
});
