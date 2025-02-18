// reducers/index.js
import { combineReducers } from "redux";
import settingsOptionsReducer from "./settingsOptionsReducer/settingsOptionsReducer";
import outputCodeReducer from "./outputCodeReducer/outputCodeReducer";

const rootReducer = combineReducers({
  settingsOptions: settingsOptionsReducer,
  outputCode: outputCodeReducer
});

export default rootReducer;
