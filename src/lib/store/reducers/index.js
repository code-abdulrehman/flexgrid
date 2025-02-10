// reducers/index.js
import { combineReducers } from "redux";
import settingsOptionsReducer from "./settingsOptionsReducer/settingsOptionsReducer";


const rootReducer = combineReducers({
  settingsOptions: settingsOptionsReducer
});

export default rootReducer;
