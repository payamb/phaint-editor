import React from "react";
import { subscribe } from "../event-bus";
import {Canvas} from "../canvas";

export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
    };
  }
  componentDidMount() {
    window.canvas = new Canvas(
      document.querySelector('.canvas-element')
    );
  }
  render() {
      return (
        <div className="editor--main w-full flex-1 bg-gray-800">
          <div className="canvas-container inline-block relative border-gray-400">
            <canvas width="0" height="0" className="canvas-element"></canvas>
              </div>
          </div>
      );
  }
}
