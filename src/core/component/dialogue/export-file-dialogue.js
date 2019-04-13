import React from "react";
import {publish} from "../../event-bus";

export class ExportFileDialogue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      format: 'jpg',
      quality: 90,
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

    publish('canvas.export', this.state);
    publish('dialogue.close', {});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{width: '28rem'}} className="text-sm-small">
        <div className="flex justify-between">

          <div className="flex items-center mb-4">
            <div className="w-16">
              <label className="text-center h-8">
                Format:
              </label>
            </div>
            <select name="format"
                    className="flex-1
                  border-0 shadow-inner h-8 bg-gray-700 rounded px-3"
                    value={this.state.format}
                    onChange={this.handleInputChange}
            >
              <option value="jepg">JPEG</option>
              <option value="png">PNG</option>
              <option value="webp">WebP</option>
            </select>
          </div>
          <div className="flex items-center mb-4 ml-4">
            <div className="w-16">
              <label className="text-right h-8">
                Quality:
              </label>
            </div>
            <input name="quality" type="number"
                   className="
                  border-0 shadow-inner w-auto h-8 bg-gray-700 rounded px-3"
                   value={this.state.quality}
                   onChange={this.handleInputChange}
            />
          </div>

        </div>

        <div className="flex flex items-center justify-end text-sm-small mt-8">
          <div className="">
            <button
              className="button--success hover:bg-blue-800 h-8 align-middle block text-white px-4 rounded mx-2 shadow-inner">
              Export
            </button>
          </div>
          <div className="">
            <button type="reset" onClick={() => publish('dialogue.close', {})}
                    className="bg-gray-800 h-8 block hover:bg-gray-700 text-white px-4 rounded shadow-inner">
              Cancel
            </button>
          </div>
        </div>

      </form>
    );
  }
}
