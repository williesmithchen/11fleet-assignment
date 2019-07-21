import { combineReducers } from "redux";
import restaurantsReducer from "./restaurantsReducer";
import favouritesReducer from "./favouritesReducer";
import filterReducer from './filterReducer';
import selectRestaurnat from './selectReducer';
import updateTypes from './updateTypesReducer';

export default combineReducers({
  restaurants: restaurantsReducer,
  filtered: filterReducer,
  favourites: favouritesReducer,
  selected: selectRestaurnat,
  types: updateTypes,
});
