import React from "react";
import icon from "../../../asset/icon/toolbar/rotate.svg";
import InlineSVG from "react-inlinesvg";

export class RotateHelper extends React.Component {
  render() {
    return (
      <div className="toolbar__item flex flex-col content-center align-baseline items-center py-2 mr-4">
        <button id="rotate" type="button" className="p-2 shadow rounded border-gray-600 bg-gray-600 border-1 ">
          <InlineSVG src={icon} />
        </button>
        <label className="text-xs text-gray-400" htmlFor="rotate">Rotate</label>
      </div>
    );
  }
}
