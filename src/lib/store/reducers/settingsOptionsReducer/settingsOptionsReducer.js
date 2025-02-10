// reducers/settingsOptionsReducer.js

// Define action types as constants
const ACTION_TYPES = {
    TOGGLE_OPTION: "TOGGLE_OPTION",
    SET_OPTIONS: "SET_OPTIONS",
    SET_THEME: "SET_THEME",
    SET_ACCENT_COLOR: "SET_ACCENT_COLOR",
    SET_SIDEBAR_VISIBLE: "SET_SIDEBAR_VISIBLE",
    SET_SIZE_SHOW: "SET_SIZE_SHOW",
    SET_MULTI_SELECT: "SET_MULTI_SELECT",
    SET_RESIZEABLE_OPTIONS: "SET_RESIZEABLE_OPTIONS",
    RESET_SETTINGS: "RESET_SETTINGS",
  };
  
  // Initial state
  const initialState = Object.freeze({
    resizeableOptions: { horizontal: true, vertical: true, both: false },
    sizeShow: true,
    multipleSelection: true,
    accentColor: "turquoise",
    theme: "system",
    sidebarVisible: true,
  });
  
  // Utility function to update state dynamically
  const handleStateUpdate = (state, key, value) => ({
    ...state,
    [key]: value,
  });
  
  // Reducer function using a dictionary-based approach
  const settingsOptionsReducer = (state = initialState, action) => {
    const handlers = {
      [ACTION_TYPES.TOGGLE_OPTION]: () =>
        handleStateUpdate(state, action.payload, !state[action.payload]),
  
      [ACTION_TYPES.SET_OPTIONS]: () => ({
        ...state,
        ...action.payload,
      }),
  
      [ACTION_TYPES.SET_THEME]: () =>
        handleStateUpdate(state, "theme", action.payload),
  
      [ACTION_TYPES.SET_ACCENT_COLOR]: () =>
        handleStateUpdate(state, "accentColor", action.payload),
  
      [ACTION_TYPES.SET_SIZE_SHOW]: () =>
        handleStateUpdate(state, "sizeShow", action.payload),
  
      [ACTION_TYPES.SET_SIDEBAR_VISIBLE]: () =>
        handleStateUpdate(state, "sidebarVisible", action.payload),
  
      [ACTION_TYPES.SET_MULTI_SELECT]: () =>
        handleStateUpdate(state, "multipleSelection", action.payload),
  
      [ACTION_TYPES.SET_RESIZEABLE_OPTIONS]: () =>
        handleStateUpdate(state, "resizeableOptions", action.payload),
  
      [ACTION_TYPES.RESET_SETTINGS]: () => {
        localStorage.removeItem("settingsOptions");
        return initialState;
      },
    };
  
    return handlers[action.type] ? handlers[action.type]() : state;
  };
  
  // Action creators
  const createAction = (type) => (payload) => ({ type, payload });
  
  export const toggleOption = createAction(ACTION_TYPES.TOGGLE_OPTION);
  export const setOptions = createAction(ACTION_TYPES.SET_OPTIONS);
  export const setTheme = createAction(ACTION_TYPES.SET_THEME);
  export const setAccentColor = createAction(ACTION_TYPES.SET_ACCENT_COLOR);
  export const setSidebarVisible = createAction(ACTION_TYPES.SET_SIDEBAR_VISIBLE);
  export const setSizeShow = createAction(ACTION_TYPES.SET_SIZE_SHOW);
  export const setMultiSelect = createAction(ACTION_TYPES.SET_MULTI_SELECT);
  export const setResizeableOptions = createAction(ACTION_TYPES.SET_RESIZEABLE_OPTIONS);
  export const resetSettings = () => {
    localStorage.removeItem("settingsOptions");
    return { type: ACTION_TYPES.RESET_SETTINGS };
  };
  
  // Accent Colors
  export const accentColors = [
    { name: "Turquoise", value: "turquoise" },
    { name: "Blue", value: "blue" },
    { name: "Green", value: "green" },
    { name: "Purple", value: "purple" },
    { name: "Orange", value: "orange" },
  ];
  
  export default settingsOptionsReducer;
  