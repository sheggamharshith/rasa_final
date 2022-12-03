import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";

// context
import { UserProvider } from "./context/userContext";

ReactDOM.render(
  <>
    <UserProvider>
      <App />
    </UserProvider>

    <ToastContainer />
  </>,
  document.getElementById("root")
);

reportWebVitals();
