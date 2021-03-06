import React from "react";
import { publish } from "../../event-bus";

export class ResizeImageDialogue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.canvas.state.width,
      height: window.canvas.state.height,
      aspectRatio: window.canvas.state.width / window.canvas.state.height
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    publish('canvas.edit.resize', this.state);
    publish('dialogue.close', {});
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{width: '30rem'}} className="text-sm-small">

        <div className="flex items-center mb-2">
          <div className="w-24">
            <label className="text-center h-8">
              Width:
            </label>
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <input name="width" type="number"
                     className="flex-1
                      border-0 shadow-inner h-8 bg-gray-700 rounded px-3"
                     value={this.state.width}
                     onChange={this.handleInputChange}
              />
              <span
                className="px-3">
                Pixels
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="w-24">
            <label className="text-right h-8">
              Height:
            </label>
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <input name="height" type="number"
                     className="flex-1
                      border-0 shadow-inner h-8 bg-gray-700 rounded px-3"
                     value={this.state.height}
                     onChange={this.handleInputChange}
              />
              <span
                className="px-3">
                Pixels
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end text-sm-small">
          <div className="">
            <button className="button--success hover:bg-blue-800 h-8 align-middle block text-white px-4 rounded mx-2 shadow-inner">
              Resize
            </button>
          </div>
          <div className="">
            <button type="reset" onClick={() => publish('dialogue.close', {})} className="bg-gray-800 h-8 block hover:bg-gray-700 text-white px-4 rounded shadow-inner">
              Cancel
            </button>
          </div>
        </div>

      </form>
    );
  }
}
