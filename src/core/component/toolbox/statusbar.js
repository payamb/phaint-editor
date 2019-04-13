import React from "react";
import {subscribe} from "../../event-bus";

export class StatusBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
    };
  }

  updateData(state) {
    this.setState(state);
  }

  componentDidMount() {
    subscribe('canvas.state.updated', (state) => this.updateData(state));
  }

  render() {
    return (
      <div className="bg-gray-900 w-full text-xs py-1 px-8 text-gray-600 flex justify-between">
        <div>
          {this.state.width}x{this.state.height}
        </div>
        <div className="">
          <progress className="shadow-inner bg-gray-500" max="100" value="80"></progress>
        </div>
      </div>
    );
  }
}
