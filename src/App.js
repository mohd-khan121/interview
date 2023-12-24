import React from "react";
import Todo from "./components/todo";
import { useSelector } from "react-redux";
import DarkModeToggle from "./components/DarkModeToggle";

const App = () => {
  const darkMode = useSelector((state) => state.darkMode);

  return (
    <div className={`${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
      <div className={` ${darkMode ? "dark" : ""}`}>
        <DarkModeToggle />
        <Todo />
      </div>
    </div>
  );
};

export default App;
