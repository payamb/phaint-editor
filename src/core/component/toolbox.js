import React from "react";
import { MoveTool } from "./toolbox/move-tool";
import {SelectTool} from "./toolbox/select-tool";

export class ToolBox extends React.Component {
    render() {
        return (
            <div className="toolbox bg-gray-700 shadow-inner h-full w-16">
                <MoveTool />
                <SelectTool />
            </div>
        );
    }
}
