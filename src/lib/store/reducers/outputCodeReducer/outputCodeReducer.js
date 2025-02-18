// outputCodeReducer.js
const initialState = Object.freeze({
    totalItems: 0,
    totalSubItems: 0,
    totalSubContainers: 0,
    totalContainers: 0,
    selectedItem: [],
    selectedSubItem: [],
    selectedSubContainer: [],
    selectedContainer: [],
    // Changed from an array to an object for consistency.
    outputCode: {
      container: {
        name: "container",
        type: "",
        css: "",
        tailwind: "",
      },
      subContainer: {
        name: "subContainer",
        type: "",
        css: "",
        tailwind: "",
      },
      items: [
        {
          name: "item",
          type: "",
          css: "",
          tailwind: "",
        },
      ],
      subItems: [
        {
          name: "subItem",
          type: "",
          css: "",
          tailwind: "",
        },
      ],
    },
  });
  
  const ACTION_TYPES = {
    SET_OUTPUT_CODE: "SET_OUTPUT_CODE",
    SET_TOTAL_ITEMS: "SET_TOTAL_ITEMS",
    SET_TOTAL_SUB_ITEMS: "SET_TOTAL_SUB_ITEMS",
    SET_TOTAL_SUB_CONTAINERS: "SET_TOTAL_SUB_CONTAINERS",
    SET_TOTAL_CONTAINERS: "SET_TOTAL_CONTAINERS",
    SET_SELECTED_ITEM: "SET_SELECTED_ITEM",
    SET_SELECTED_SUB_ITEM: "SET_SELECTED_SUB_ITEM",
    SET_SELECTED_SUB_CONTAINER: "SET_SELECTED_SUB_CONTAINER",
    SET_SELECTED_CONTAINER: "SET_SELECTED_CONTAINER",
    RESET_OUTPUT_CODE: "RESET_OUTPUT_CODE",
  };
  
  const createAction = (type) => (payload) => ({ type, payload });
  
  const outputCodeReducer = (state = initialState, action) => {
    switch (action.type) {
      case ACTION_TYPES.SET_OUTPUT_CODE:
        return { ...state, outputCode: action.payload };
      case ACTION_TYPES.SET_TOTAL_ITEMS:
        return { ...state, totalItems: action.payload };
      case ACTION_TYPES.SET_TOTAL_SUB_ITEMS:
        return { ...state, totalSubItems: action.payload };
      case ACTION_TYPES.SET_TOTAL_SUB_CONTAINERS:
        return { ...state, totalSubContainers: action.payload };
      case ACTION_TYPES.SET_TOTAL_CONTAINERS:
        return { ...state, totalContainers: action.payload };
      case ACTION_TYPES.SET_SELECTED_ITEM:
        return { ...state, selectedItem: action.payload };
      case ACTION_TYPES.SET_SELECTED_SUB_ITEM:
        return { ...state, selectedSubItem: action.payload };
      case ACTION_TYPES.SET_SELECTED_SUB_CONTAINER:
        return { ...state, selectedSubContainer: action.payload };
      case ACTION_TYPES.SET_SELECTED_CONTAINER:
        return { ...state, selectedContainer: action.payload };
      case ACTION_TYPES.RESET_OUTPUT_CODE:
        return initialState;
      default:
        return state;
    }
  };
  
  export const setOutputCode = createAction(ACTION_TYPES.SET_OUTPUT_CODE);
  export const setTotalItems = createAction(ACTION_TYPES.SET_TOTAL_ITEMS);
  export const setTotalSubItems = createAction(ACTION_TYPES.SET_TOTAL_SUB_ITEMS);
  export const setTotalSubContainers = createAction(ACTION_TYPES.SET_TOTAL_SUB_CONTAINERS);
  export const setTotalContainers = createAction(ACTION_TYPES.SET_TOTAL_CONTAINERS);
  export const setSelectedItem = createAction(ACTION_TYPES.SET_SELECTED_ITEM);
  export const setSelectedSubItem = createAction(ACTION_TYPES.SET_SELECTED_SUB_ITEM);
  export const setSelectedSubContainer = createAction(ACTION_TYPES.SET_SELECTED_SUB_CONTAINER);
  export const setSelectedContainer = createAction(ACTION_TYPES.SET_SELECTED_CONTAINER);
  export const resetOutputCode = createAction(ACTION_TYPES.RESET_OUTPUT_CODE);
  
  console.log(outputCodeReducer(initialState, setOutputCode([])));
  
  export default outputCodeReducer;
  