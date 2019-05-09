import { combineReducers } from "redux";
import { drivesReducer } from "./drivesReducer";
import { mapReducer } from "./mapReducer";
import { favoritesReducer } from "./favoritesReducer";
import { photosReducer } from "./photosReducer";

export const rootReducer = combineReducers({
  drives: drivesReducer,
  favorites: favoritesReducer,
  map: mapReducer,
  photos: photosReducer
});
