import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo } from "../actions";
import TodoList from "./TodoList";
import "../App.css";

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [description, setDescription] = useState("");
  const [editMode, setEditMode] = useState(null);
  const darkMode = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();

  const handleEdit = (id, title, desc) => {
    setEditMode(id);
    setInputData(title);
    setDescription(desc);
  };

  const handleSaveEdit = (id) => {
    dispatch(editTodo(id, inputData, description));
    setEditMode(null);
    setInputData("");
    setDescription("");
  };

  return (
    <div className={`todo-container ${darkMode ? "dark-bg" : "light-bg"}`}>
      <div className={`${darkMode ? "text-white" : "text-black"}`}>
        <h1 className="text-2xl font-bold">To-Do List</h1>
      </div>
      <div className="">
        <input
          type="text"
          placeholder="Title"
          className={`input-field ${darkMode ? "dark-mode" : ""}`}
          style={{ width: "500px", marginBottom: "20px", padding: "10px" }}
          value={inputData}
          onChange={(event) => setInputData(event.target.value)}
        />
      </div>
      <div className="">
        <textarea
          placeholder="Description"
          className={`input-field ${darkMode ? "dark-mode" : ""}`}
          style={{ width: "500px", marginBottom: "20px", padding: "10px" }}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <div className="">
        <button
          className={`button button-green`}
          onClick={() => {
            if (inputData.trim() !== "") {
              dispatch(addTodo(inputData, description));
              setInputData("");
              setDescription("");
            } else {
              alert("Title is required");
            }
          }}
        >
          Add Task
        </button>
      </div>
      <div className="mt-4 w-full">
        <TodoList
          editMode={editMode}
          handleEdit={handleEdit}
          handleSaveEdit={handleSaveEdit}
          inputData={inputData}
          description={description}
          setInputData={setInputData}
          setDescription={setDescription}
        />
      </div>
    </div>
  );
};

export default Todo;
