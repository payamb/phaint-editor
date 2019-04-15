import React from "react";
import { publish } from "../../event-bus";
import request from "../../request";

export class FileOpenUrlDialogue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };

    navigator.clipboard.readText().then(text => this.state.url = text);
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

    request({
        url: 'https://cors-anywhere.herokuapp.com/' + this.state.url,
        responseType: 'arraybuffer',
        onProgress: (event) => publish('file.load.progress', event)
      })
      .then(response => this.loadImage(response))
      .catch(err => console.log(err));
  }
  loadImage(response) {
    publish('canvas.init.image', response);
    publish('dialogue.close', {});
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{width: '30rem'}} className="text-sm-small">

        <div className="flex items-center mb-4">
          <div className="w-24">
            <label className="text-center h-8">
              URL:
            </label>
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <input name="url" type="text"
                     className="flex-1
                      border-0 shadow-inner h-8 bg-gray-700 rounded px-3"
                     value={this.state.url}
                     onChange={this.handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end text-sm-small mt-8">
          <div className="">
            <button className="button--success hover:bg-blue-800 h-8 align-middle block text-white px-4 rounded mx-2 shadow-inner">
              Open
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
