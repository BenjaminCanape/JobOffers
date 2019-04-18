import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./App";
import Routes from "./Routes";

//Main Layout and route definition
ReactDOM.render(
  <div>
    <App />
    <Routes />
  </div>,
  document.getElementById("root")
);
registerServiceWorker();
