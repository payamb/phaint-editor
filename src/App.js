import React from "react";
import {Dialogue} from "./core/component/dialogue";
import {Menu} from "./core/component/menu";
import {ToolBar} from "./core/component/toolbar";
import {EditorArea} from "./core/component/editor-container";

export class App extends React.Component {
  componentDidMount() {
    // window.addEventListener('keydown', (e) => this.handleKeyPress(e));
  }
  handleKeyPress(event) {
    if(event.isComposing && event.ctrlKey){
      e.preventDefault();
    }
  }
  render() {
    return (
      <div className="
    flex flex-col flex-no-wrap justify-center bg-white h-screen
     max-w-screen-xl mx-auto select-none leading-normal antialiased
     ">
        <Dialogue/>
        <Menu/>
        <ToolBar/>
        <EditorArea/>
      </div>
    );
  }
}
