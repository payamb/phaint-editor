import React from "react";
import {MenuItem} from "./menu-item";

export class Menu extends React.Component {
    render() {
        return (
            <div className="bg-gray-800 w-full h-10 pl-4 py-2 text-sm leading-relaxed flex flex-grow-0 items-start">
                <MenuItem name="File"/>
                <MenuItem name="Edit"/>
            </div>
        );
    }
}