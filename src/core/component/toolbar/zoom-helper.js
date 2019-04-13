import React from "react";
import {publish} from "../../event-bus";

export class ZoomHelper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 10,
      scale: 1
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;

    this.setState({
      zoom: target.value,
      scale: target.value + -9
    });

    publish('canvas.meta.zoom', target.value + -9);
  }
  render() {
    return (
      <div style={{ flexBasis: '20%'}} className="toolbar__item flex flex-col content-center align-baseline items-center py-2">
        <input className="w-12 h-8" type="range" min="0" max="20"
               value={this.state.zoom}
               onChange={this.handleInputChange}
        ></input>
        <label className="text-xs text-gray-400" htmlFor="zoom">Zoom</label>
      </div>
    );
  }
}
