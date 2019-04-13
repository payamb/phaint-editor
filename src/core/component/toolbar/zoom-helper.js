import React from "react";

export class ZoomHelper extends React.Component {
  render() {
    return (
      <div style={{ flexBasis: '20%'}} className="toolbar__item flex flex-col content-center align-baseline items-center py-2">
        <input className="w-12 h-8" type="range" min="0" max="20" defaultValue="10" id="zoom"></input>
        <label className="text-xs text-gray-400" htmlFor="zoom">Zoom</label>
      </div>
    );
  }
}
