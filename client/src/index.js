import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CurrentUserProvider } from "./CurrentUserContext";
//HIGHEST LEVEL USES PROVIDER TO WRAP

ReactDOM.render(
  <CurrentUserProvider>
    <App />
  </CurrentUserProvider>,
  document.getElementById("root")
);
