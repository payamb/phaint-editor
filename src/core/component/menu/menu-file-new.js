import React from "react";
import { publish } from "../../event-bus";
import { FileNewDialogue } from "../dialogue/new-file-dialogue";

export class MenuFileNew extends React.Component {
  handleClick() {
    publish('dialogue.open', {
      title: 'New file',
      component: FileNewDialogue
    });
  }
  render() {
    return (
      <a onClick={() => this.handleClick()} className="hover:bg-gray-800 block px-2 py-1" href="#">New</a>
    );
  }
}
