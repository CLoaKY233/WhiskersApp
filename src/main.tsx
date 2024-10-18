import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./input.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 ease-in-out">
      <App />
    </div>
  </React.StrictMode>,
);
