import { combineReducers } from "redux";
import { drivesReducer } from "./drivesReducer";
import { mapReducer } from "./mapReducer";

export const rootReducer = combineReducers({
  drives: drivesReducer,
  map: mapReducer
});
