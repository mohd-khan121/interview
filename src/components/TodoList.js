import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, toggleTodoCompleted } from "../actions";
import "../App.css";

const TodoList = ({
  editMode,
  handleEdit,
  handleSaveEdit,
  inputData,
  description,
  setInputData,
  setDescription,
}) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.todoReducers.list);
  const darkMode = useSelector((state) => state.darkMode);

  const chunkArray = (arr, size) => {
    return arr.reduce((chunks, el, i) => {
      if (i % size === 0) {
        chunks.push([el]);
      } else {
        chunks[chunks.length - 1].push(el);
      }
      return chunks;
    }, []);
  };

  const chunkedList = chunkArray(list, 3);

  const [expanded, setExpanded] = useState({});

  const handleToggleExpand = (id) => {
    setExpanded((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const getFirstWords = (str, num) => {
    const words = str.split(" ");
    return words.slice(0, num).join(" ");
  };

  return (
    <div>
      {chunkedList.map((chunk, index) => (
        <div key={index} style={{ display: "flex", flexWrap: "wrap" }}>
          {chunk.map((elem) => (
            <div
              key={elem.id}
              className={`todo-card ${
                darkMode ? "dark-bg-light" : "light-bg"
              } ${editMode === elem.id ? "edit-mode" : ""} ${
                elem.completed ? "completed" : ""
              }`}
            >
              {editMode === elem.id ? (
                <>
                  <input
                    type="text"
                    value={inputData}
                    onChange={(event) => setInputData(event.target.value)}
                    className="edit-input"
                  />
                  <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className="edit-input"
                  />
                  <button
                    onClick={() => handleSaveEdit(elem.id)}
                    className={`button button-save ${
                      darkMode ? "dark-mode" : ""
                    }`}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <div className={`${darkMode ? "text-white" : "text-black"}`}>
                    <h3>{elem.title}</h3>
                  </div>
                  <div className={`${darkMode ? "text-white" : "text-black"}`}>
                    <p className="description">
                      {expanded[elem.id]
                        ? elem.description
                        : getFirstWords(elem.description, 10)}
                      {elem.description.length > 50 && (
                        <span
                          className="read-more"
                          onClick={() => handleToggleExpand(elem.id)}
                        >
                          {expanded[elem.id] ? " Read Less" : " Read More"}
                        </span>
                      )}
                    </p>{" "}
                  </div>

                  <div className="actions">
                    <button
                      onClick={() =>
                        handleEdit(elem.id, elem.title, elem.description)
                      }
                      className={`button button-edit ${
                        darkMode ? "dark-mode" : ""
                      }`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => dispatch(deleteTodo(elem.id))}
                      className={`button button-delete ${
                        darkMode ? "dark-mode" : ""
                      }`}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
              {!editMode && (
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={elem.completed}
                    onChange={() => dispatch(toggleTodoCompleted(elem.id))}
                    className="checkbox"
                  />
                  <p className={`${darkMode ? "text-white" : "text-black"}`}>
                    {elem.completed ? "Mark as not done" : "Mark as done"}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
