// const canvasContainer = document.querySelector('.canvas-container');
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


import { subscribe } from "./event-bus";

export class Canvas {
  static instance;

  constructor(canvasElement){
    if(this.instance){
      return this.instance;
    }

    this.instance = this;
    this.canvas = canvasElement;
    this.context = this.canvas .getContext('2d');

    subscribe('canvas.init.image', (image) => this.initCanvasWithImage(image));
  }
  setSize(width, height) {

  }
  initCanvasWithImage(image) {
    image.onload = () => {
      this.canvas.width = image.naturalWidth;
      this.canvas.height = image.naturalHeight;
      this.context.drawImage(image, 0, 0);
    };
  }
}
