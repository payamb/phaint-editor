import React from "react";
import {Dialogue} from "./core/component/dialogue";
import {Menu} from "./core/component/menu";
import {ToolBar} from "./core/component/toolbar";
import {EditorArea} from "./core/component/editor-container";
import {publish} from "./core/event-bus";
import request from "./core/request";

export class App extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', (e) => this.handleKeyPress(e));
  }
  handleKeyPress(event) {
    if(event.isComposing && event.ctrlKey){
      e.preventDefault();
    }

    switch (event.code) {
      case 'KeyF':
        request({
          url: 'https://ichef.bbci.co.uk/news/660/cpsprodpb/1665F/production/_106434719_d049f5e1-32a1-404d-9a3e-23ad83e2b729.jpg',
          responseType: 'arraybuffer',
          onProgress: (event) => publish('file.load.progress', event)
        })
          .then(response => {
            publish('canvas.init.image', response);
          })
          .catch(err => console.log(err));
        break;
      case 'KeyD':
        publish('canvas.edit.resize', {
          width: 660,
          height: 371
        });
        break;
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
