// store.js
import { createStore } from "redux";
import rootReducer from "./reducers";
import { loadState, saveState } from "../utils/useLocalStorage";
import throttle from "lodash/throttle";

// Load state from localStorage
const persistedState = loadState();

const store = createStore(rootReducer, persistedState);

// Save state to localStorage when updates occur (at most once per second)
store.subscribe(
  throttle(() => {
    saveState({
      settingsOptions: store.getState().settingsOptions
    });
  }, 1000)
);

export default store;
