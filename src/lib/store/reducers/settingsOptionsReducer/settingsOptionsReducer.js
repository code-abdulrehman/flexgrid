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
  SET_SELECTED_ITEM: "SET_SELECTED_ITEM",
  INITIAL_TOTAL_ITEMS: "INITIAL_TOTAL_ITEMS",
  RESET_SETTINGS: "RESET_SETTINGS",
  SELECTED_ITEM: "SELECTED_ITEM",
  SHOW_ITEMS_NAME: "SHOW_ITEMS_NAME",
  SET_SHOW_NAME: "SET_SHOW_NAME",
  SET_SUB_ITEMS_ALLOWED: "SET_SUB_ITEMS_ALLOWED",
};

// Initial state (we add a new property 'subItems' to track whether sub-items are allowed)
const initialState = Object.freeze({
  resizeableOptions: { horizontal: true, vertical: true, both: false },
  sizeShow: true,
  accentColor: "turquoise",
  theme: "system",
  showItemsName: true,
  sidebarVisible: true,
  selectedItem: [],
  multipleSelection: true,
  initialTotalItems: 4,
  subItemsAllowed: false, // default: sub-items are NOT allowed
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

    [ACTION_TYPES.SET_SELECTED_ITEM]: () =>
      handleStateUpdate(state, "selectedItem", action.payload),

    [ACTION_TYPES.INITIAL_TOTAL_ITEMS]: () =>
      handleStateUpdate(state, "initialTotalItems", action.payload),

    [ACTION_TYPES.SELECTED_ITEM]: () =>
      handleStateUpdate(state, "selectedItem", action.payload),

    [ACTION_TYPES.SHOW_ITEMS_NAME]: () =>
      handleStateUpdate(state, "showItemsName", action.payload),

    [ACTION_TYPES.SET_SHOW_NAME]: () =>
      handleStateUpdate(state, "showItemsName", action.payload),

    [ACTION_TYPES.SET_SUB_ITEMS_ALLOWED]: () =>
      handleStateUpdate(state, "subItemsAllowed", action.payload),
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
export const setSubItemsAllowed = createAction(ACTION_TYPES.SET_SUB_ITEMS_ALLOWED);
export const setResizeableOptions = createAction(
  ACTION_TYPES.SET_RESIZEABLE_OPTIONS
);
export const setSelectedItem = createAction(ACTION_TYPES.SET_SELECTED_ITEM);
export const initialTotalItems = createAction(ACTION_TYPES.INITIAL_TOTAL_ITEMS);
export const selectedItem = createAction(ACTION_TYPES.SELECTED_ITEM);
export const showItemsName = createAction(ACTION_TYPES.SHOW_ITEMS_NAME);
export const setShowName = createAction(ACTION_TYPES.SET_SHOW_NAME);


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
