import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../actions";

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);

  return (
    <div className={`${darkMode ? "dark-bg" : "light-bg"}`}>
      <input
        type="checkbox"
        id="darkModeToggle"
        checked={darkMode}
        onChange={() => dispatch(toggleDarkMode())}
      />
      <label
        htmlFor="darkModeToggle"
        className={`${darkMode ? "text-white" : "text-black"}`}
      >
        Dark Mode
      </label>
    </div>
  );
};

export default DarkModeToggle;
