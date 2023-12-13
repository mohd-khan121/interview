import { createStore, combineReducers } from "redux";
import todoReducers from "./reducer/todoReducers";

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

const store = createStore(rootReducer);

export default store;
