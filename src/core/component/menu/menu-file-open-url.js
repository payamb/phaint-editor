import React from "react";
import { publish } from "../../event-bus";
import { FileOpenUrlDialogue } from "../dialogue/open-url-file-dialogue";

export class MenuFileOpenUrl extends React.Component {
  handleClick() {
    publish('dialogue.open', {
      title: 'Open URL',
      component: FileOpenUrlDialogue
    });
  }
  render() {
    const isApiAvailable = !('fetch' in window) ? 'hidden' : '';
    return (
      <a onClick={() => this.handleClick()} className={`hover:bg-gray-800 block px-2 py-1 ${isApiAvailable}`}>Open URL</a>
    );
  }
}
