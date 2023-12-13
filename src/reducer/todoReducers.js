const initialState = {
  list: [],
  darkMode: false,
};

const todoReducers = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      const { id, title, description } = action.payload;
      return {
        ...state,
        list: [
          ...state.list,
          {
            id,
            title,
            description,
          },
        ],
      };
    case "DELETE_TODO":
      const updatedList = state.list.filter((elem) => elem.id !== action.id);
      return {
        ...state,
        list: updatedList,
      };
    case "EDIT_TODO":
      const editedList = state.list.map((elem) =>
        elem.id === action.payload.id
          ? {
              ...elem,
              title: action.payload.title,
              description: action.payload.description,
            }
          : elem
      );
      return {
        ...state,
        list: editedList,
      };
    case "TOGGLE_DARK_MODE":
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
};

export default todoReducers;
