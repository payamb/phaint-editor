import './scss/main.scss';
// import { Draggable } from "./core/draggable";
//
// const canvasContainer = document.querySelector('.canvas-container');
// const draggableContainer = new Draggable(canvasContainer);
//
// const canvas = document.querySelector('.canvas-element');
// const context = canvas.getContext('2d');
//
// const image = new Image();
// image.src = 'https://ichef.bbci.co.uk/news/660/cpsprodpb/CCAB/production/_106359325_trainticket.gif';
// image.onload = () => {
//   console.log(image.naturalWidth);
//   canvas.width = image.naturalWidth;
//   canvas.height = image.naturalHeight;
//   context.drawImage(image, 0, 0);
// };
//
// function addSelector() {
//   const selector = document.createElement('div');
//
//   selector.style.position = 'absolute';
//   selector.style.background = 'rgba(0, 0, 255, 0.1)';
//   selector.style.border = '1px solid rgba(0, 0, 255, 0.45)';
//   selector.style.display = 'none';
//   selector.style.pointerEvents = 'none';
//
//   canvasContainer.appendChild(selector);
//
//
//   return selector;
// }
//
// canvasContainer.addEventListener('mousedown', (e) => {
//   const selector = addSelector();
//   selector.style.display = 'block';
// });

import React from "react";
import ReactDOM from "react-dom";
import {Menu} from "./core/component/menu";
import {ToolBar} from "./core/component/toolbar";
import {EditorArea} from "./core/component/editor-container";
import {Dialogue} from "./core/component/dialogue";

ReactDOM.render(
    <div className="
    flex flex-col flex-no-wrap justify-center bg-white h-screen
     max-w-screen-xl mx-auto select-none leading-normal
     ">
        <Dialogue/>
        <Menu/>
        <ToolBar/>
        <EditorArea/>
    </div>
    , document.getElementById("app"));
