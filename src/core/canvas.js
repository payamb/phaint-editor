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


import {subscribe, publish} from "./event-bus";

export class Canvas {
  static instance;

  constructor(canvasElement){
    if(this.instance){
      return this.instance;
    }

    this.instance = this;
    this.canvas = canvasElement;
    this.context = this.canvas .getContext('2d');

    this.state = {
      width: 0,
      height: 0,
      scale: 1,
      image: null,
    };

    this.state = new Proxy(this.state, {
      set(target, property, value) {
        publish('canvas.state.updated', {[property]: value});
        return Reflect.set(target, property, value);
      },
    });

    this.registerListeners();
  }

  registerListeners() {
    subscribe('canvas.init.image', (image) => this.initCanvasWithImage(image));
    subscribe('canvas.meta.zoom', (scaleFactor) => this.setZoom(scaleFactor));
  }
  setSize(width, height) {

  }

  setZoom(scaleFactor) {
    this.context.scale(scaleFactor, scaleFactor);
  }
  initCanvasWithImage(image) {
    image.onload = () => {
      this.canvas.width = image.naturalWidth;
      this.canvas.height = image.naturalHeight;
      this.context.drawImage(image, 0, 0);

      Object.assign(this.state, {
        image: image,
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    };
  }
}
