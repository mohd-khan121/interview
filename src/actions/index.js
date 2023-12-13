export const addTodo = (title, description) => {
  return {
    type: "ADD_TODO",
    payload: {
      id: new Date().getTime().toString(),
      title,
      description,
    },
  };
};

export const deleteTodo = (id) => {
  return {
    type: "DELETE_TODO",
    id,
  };
};

export const editTodo = (id, title, description) => {
  return {
    type: "EDIT_TODO",
    payload: {
      id,
      title,
      description,
    },
  };
};

// Added action for toggling dark mode
export const toggleDarkMode = () => {
  return {
    type: "TOGGLE_DARK_MODE",
  };
};
