import React from "react";
import {publish, subscribe} from "../../event-bus";
import {ExportFileDialogue} from "../dialogue/export-file-dialogue";

export class MenuFileExport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: false
    };
  }

  updateData(state) {
    if (state.hasOwnProperty('initialized')) {
      this.setState({
        enabled: state.initialized
      });
    }
  }

  componentDidMount() {
    subscribe('canvas.state.updated', (state) => this.updateData(state));
  }

  handleClick() {
    publish('dialogue.open', {
      title: 'Export',
      component: ExportFileDialogue
    });
  }

  render() {
    const isEnabled = this.state.enabled ? '' : 'cursor-not-allowed opacity-50';
    return (
      <a onClick={() => this.handleClick()} className={`hover:bg-gray-800 block px-2 py-1 ${isEnabled}`}>Export</a>
    );
  }
}
