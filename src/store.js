import { createStore, combineReducers } from "redux";
import todoReducers from "./reducer/todoReducers";

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("todoState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("todoState", serializedState);
  } catch (err) {
    // Handle errors here
  }
};

const darkModeReducer = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      return !state;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  todoReducers,
  darkMode: darkModeReducer,
});

const store = createStore(
  rootReducer,
  loadState() // Load initial state from localStorage
);

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
