import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, toggleTodoCompleted } from "../actions";

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

  return (
    <div className="mt-4">
      {chunkedList.map((chunk, index) => (
        <div key={index} className="flex overflow-x-auto">
          {chunk.map((elem) => (
            <div
              key={elem.id}
              className={`flex-shrink-0 flex-grow-0 w-64 m-4 p-4 border rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 ${
                editMode === elem.id ? "bg-yellow-200" : ""
              } ${
                elem.completed
                  ? "bg-gray-300"
                  : darkMode
                  ? "bg-gray-800 text-white"
                  : "bg-white text-black"
              }`}
            >
              {editMode === elem.id ? (
                <>
                  <input
                    type="text"
                    value={inputData}
                    onChange={(event) => setInputData(event.target.value)}
                    className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 ${
                      darkMode
                        ? "text-white bg-gray-800"
                        : "text-black bg-white"
                    }`}
                  />
                  <input
                    type="text"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className={`w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 ${
                      darkMode
                        ? "text-white bg-gray-800"
                        : "text-black bg-white"
                    }`}
                  />
                  <button
                    className={`mt-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out`}
                    onClick={() => handleSaveEdit(elem.id)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <h3
                    className={`text-lg font-semibold ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    {elem.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {elem.description}
                  </p>
                  <div className="flex mt-2">
                    <button
                      className={`flex-1 px-2 py-1 rounded-md hover:bg-yellow-600 transition duration-300 ease-in-out ${
                        darkMode
                          ? "bg-gray-700 text-white"
                          : "bg-yellow-500 text-white"
                      }`}
                      onClick={() =>
                        handleEdit(elem.id, elem.title, elem.description)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className={`flex-1 px-2 py-1 ml-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out ${
                        darkMode
                          ? "bg-red-700 text-white"
                          : "bg-red-500 text-white"
                      }`}
                      onClick={() => dispatch(deleteTodo(elem.id))}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
              <input
                type="checkbox"
                checked={elem.completed}
                onChange={() => dispatch(toggleTodoCompleted(elem.id))}
                className="mt-2"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
