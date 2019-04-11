import React from "react";
import icon from "./../../../asset/icon/toolbox/toolbox-move-tool.svg";
import InlineSVG from "react-inlinesvg";

export class MoveTool extends React.Component {
  render() {
    return (
      <div className="toolbox__item hover:bg-gray-600 shadow p-2">
        <InlineSVG src={icon} />
      </div>
    );
  }
}
