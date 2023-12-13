import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../actions";

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id="darkModeToggle"
        checked={darkMode}
        onChange={() => dispatch(toggleDarkMode())}
        className="mr-2"
      />
      <label htmlFor="darkModeToggle">Dark Mode</label>
    </div>
  );
};

export default DarkModeToggle;
