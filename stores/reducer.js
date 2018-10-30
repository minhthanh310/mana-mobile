import { combineReducers } from "redux";
import common from "./common/reducer";

// Combines all reducers to a single reducer function
const reducers = combineReducers({
  common
});

export default reducers;
