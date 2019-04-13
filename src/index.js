import './scss/main.scss';
import React from "react";
import ReactDOM from "react-dom";
import {App} from "./App";
import { Canvas } from "./core/canvas";

window.canvas = {
  state: {}
};

ReactDOM.render(
      <App />
    , document.getElementById("app"));
