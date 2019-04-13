import React from "react";
import { Draggable } from "../draggable";
import { subscribe } from "../event-bus";

export class Dialogue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      component: null,
      title: ''
    };
  }
  dialogueTakeOver(data) {
    this.setState({
      active: true,
      title: data.title,
      component: data.component
    });
  }
  closeDialogue() {
    this.setState({
      active: false
    });
  }
  componentDidMount() {
    const draggableDialogue = new Draggable(
      document.querySelector('.dialogue__header'),
      document.querySelector('.dialogue'),
    );
    subscribe('dialogue.open', (data) => this.dialogueTakeOver(data));
    subscribe('dialogue.close', () => this.closeDialogue());
  }
  render() {
    const isActive = this.state.active ? '' : 'hidden';
    const ComponentName = this.state.component;
    return (
        <div className={`h-screen w-full absolute flex items-start justify-center z-50 ${isActive}`}>
        <div className="dialogue absolute text-sm rounded shadow-lg mt-12 max-w-lg max-h-full overflow-hidden">
          <div className="dialogue__header bg-gray-900 text-gray-500 flex justify-between">
            <div className="py-2 px-6">{this.state.title}</div>
            <div onClick={() => this.closeDialogue()} className="close py-2 px-6">X</div>
          </div>
          <div className="p-6 bg-gray-800 text-gray-400 shadow-inner">
            {this.state.component !== null ? (
              <ComponentName />
            ) : ('')}

          </div>
          <div className="flex justify-center bg-gray-800">
            <div className="flex-no-shrink text-white py-1 px-4 rounded bg-teal" />
          </div>
        </div>
      </div>
    );
  }
}
