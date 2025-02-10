// localStorage.js
export const loadState = () => {
    try {
      const serializedState = localStorage.getItem("state");
      if (serializedState === null) return undefined; // No saved state
      return JSON.parse(serializedState);
    } catch (error) {
      console.error("Error loading state from localStorage:", error);
      return undefined;
    }
  };
  
  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("state", serializedState);
    } catch (error) {
      console.error("Error saving state to localStorage:", error);
    }
  };
  