import React from "react";
import { publish } from "../../event-bus";
import {ResizeImageDialogue} from "../dialogue/resize-image-dialogue";

export class MenuImageResize extends React.Component {
  handleClick() {
    publish('dialogue.open', {
      title: 'Resize Image',
      component: ResizeImageDialogue
    });
  }
  render() {
    return (
      <a onClick={() => this.handleClick()} className="hover:bg-gray-800 block px-2 py-1">Resize</a>
    );
  }
}
