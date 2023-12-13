import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo } from "../actions";
import TodoList from "./TodoList";

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [description, setDescription] = useState("");
  const [editMode, setEditMode] = useState(null);
  const list = useSelector((state) => state.todoReducers.list);
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
    <div
      className={`flex flex-col items-center p-4 ${
        darkMode ? "bg-gray-800" : "bg-gray-100"
      } rounded`}
    >
      <div
        className={`text-center mb-4 ${darkMode ? "text-white" : "text-black"}`}
      >
        <h1 className="text-2xl font-bold">To-Do List</h1>
      </div>
      <div className="mb-4 w-full">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 text-black bg-white"
          value={inputData}
          onChange={(event) => setInputData(event.target.value)}
        />
      </div>
      <div className="mb-4 w-full">
        <textarea
          placeholder="Description"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 text-black bg-white"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <div className="text-center">
        <button
          className="py-2 px-4 bg-green-500 text-white rounded-full transition duration-300 ease-in-out hover:bg-green-600"
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
