import React from "react";
import {ToolBox} from "./toolbox";
import {Editor} from "./editor";
import {Properties} from "./properties";

export class EditorArea extends React.Component {
    render() {
        return (
            <div className="flex flex-1 relative w-full h-full z-0">
                <ToolBox/>
                <Editor/>
                <Properties/>
            </div>
        );
    }
}