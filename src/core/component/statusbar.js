import React from "react";
import {subscribe} from "../event-bus";

export class StatusBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
      progress: 0,
    };
  }

  updateData(state) {
    this.setState(state);
  }
  updateProgress(event) {
    let progress = 0;
    if (event.lengthComputable) {
      progress = event.loaded / event.total * 100;

      this.setState({
        progress: progress
      });
    }
  }
  componentDidMount() {
    subscribe('canvas.state.updated', (state) => this.updateData(state));
    subscribe('file.load.progress', (event) => this.updateProgress(event));
  }

  render() {
    const progressActiveClass = (this.state.progress > 0 && this.state.progress < 100) ? 'opacity-100' : '';
    return (
      <div className="bg-gray-900 w-full text-xs py-1 px-8 text-gray-600 flex justify-between">
        <div>
          {this.state.width}x{this.state.height}
        </div>
        <div className="">
          <progress className={`shadow-inner bg-gray-500 ${progressActiveClass}`} max="100" value={this.state.progress}></progress>
        </div>
      </div>
    );
  }
}
