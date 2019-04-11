import React from "react";
import { ZoomHelper } from "./toolbar/zoom-helper";
import {RotateHelper} from "./toolbar/rotate-helper";

export class ToolBar extends React.Component {
    render() {
        return (
            <div className="toolbar bg-gray-700 shadow-inner border-gray-800 border-b-2 flex flex-grow-0 items-start pl-2 w-full">
              <ZoomHelper />
              <RotateHelper />
              <RotateHelper />
              <RotateHelper />
              <RotateHelper />
            </div>
        );
    }
}
