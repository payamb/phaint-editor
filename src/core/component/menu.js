import React from "react";
import {MenuItem} from "./menu-item";
import {MenuFileNew} from "./menu/menu-file-new";
import {MenuFileOpen} from "./menu/menu-file-open";
import {MenuFileOpenUrl} from "./menu/menu-file-open-url";

export class Menu extends React.Component {
    render() {
        return (
            <div className="border-t-4 border-gray-500 bg-gray-800 w-full pl-12 py-1 text-sm-small
              text-gray-400 leading-relaxed flex flex-grow-0 items-start">
                <MenuItem name="File">
                  <MenuFileNew />
                  <MenuFileOpen />
                  <MenuFileOpenUrl />
                </MenuItem>
                <MenuItem name="Edit"/>
                <MenuItem name="Image"/>
                <MenuItem name="Filter"/>
                <MenuItem name="Help"/>
            </div>
        );
    }
}
