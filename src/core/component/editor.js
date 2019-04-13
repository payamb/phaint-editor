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
  initCanvas(data) {
    this.setState({
      width: data.width,
      height: data.height,
    });
  }
  componentDidMount() {
    subscribe('canvas.new.init', (data) => this.initCanvas(data));

    window.canvas = new Canvas(
      document.querySelector('.canvas-element')
    );
  }
  render() {
      return (
        <div className="editor--main w-full flex-1 bg-gray-800">
              <div className="canvas-container inline-block relative bg-white border-gray-400">
                <canvas width={this.state.width} height={this.state.height} className="canvas-element"></canvas>
              </div>
          </div>
      );
  }
}
