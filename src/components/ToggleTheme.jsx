// import React from "react";
// import { useTheme } from "../context/ThemeContext";
// import "./../ToggleTheme.css"

// const ThemeToggle = () => {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <button
//       onClick={toggleTheme}
//       aria-label="Toggle Dark Mode"
//       className="theme-toggle"
//       data-dark-mode={theme === "dark"}
//     >
//       <div className="switch">
//         <div className="insetcover">
//         <div className="clouds"></div>
//           <div className="sun-moon sun"></div>
//           <div className="sun-moon moon"></div>
//           <div className="stars"></div>
//         </div>
//         <div className="shadow-overlay"></div>
//       </div>
//     </button>
//   );
// };

// export default ThemeToggle;




import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="text-gray-700 border border-gray-300 dark:border-none bg-white dark:text-white  p-2 rounded-full dark:bg-gray-700 cursor-pointer"
    >
      {theme === "dark" ? (
        <Sun size={22} />
      ) : (
        <Moon size={22} />
      )}
    </button>
  );
};

export default ThemeToggle;
