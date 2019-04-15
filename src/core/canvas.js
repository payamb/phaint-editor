//

//
// canvasContainer.addEventListener('mousedown', (e) => {
//   const selector = addSelector();
//   selector.style.display = 'block';
// });


import {subscribe, publish} from "./event-bus";
import ResizeBicubic from "./worker/resize-bicubic";

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
      initialized: false,
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
    this.selectionTool();
  }

  registerListeners() {
    subscribe('canvas.new.init', (data) => this.initBlankCanvas(data));
    subscribe('canvas.init.image', (image) => this.initCanvasWithImage(image));

    subscribe('canvas.edit.resize', (data) => this.resize(data));

    subscribe('canvas.meta.zoom', (scaleFactor) => this.setZoom(scaleFactor));
    subscribe('canvas.export', (data) => this.export(data));
  }

  initBlankCanvas(data) {
    this.canvas.width = data.width;
    this.canvas.height = data.height;

    this.context.fillStyle = '#fff';
    this.context.fillRect(0, 0, data.width, data.height);

    Object.assign(this.state, {
      initialized: true,
      image: null,
      width: data.width,
      height: data.height,
    });
  }
  initCanvasWithImage(image) {
    image.onload = () => {
      this.canvas.width = image.naturalWidth;
      this.canvas.height = image.naturalHeight;
      this.context.drawImage(image, 0, 0);

      Object.assign(this.state, {
        initialized: true,
        image: image,
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    };
  }
  resize(data) {
      const imageData = this.context.getImageData(0, 0, this.state.width, this.state.height);

      const resize = new ResizeBicubic(imageData, data.width, data.height);
      const resizedPixelData = resize.resize();

      this.canvas.width = data.width;
      this.canvas.height = data.height;

      console.log(resizedPixelData);
      this.context.putImageData(resizedPixelData, 0, 0);

  }
  export(data) {
    window.location.href = this.canvas.toDataURL('image/jpeg', 1.0).replace('image/jpeg', "image/octet-stream");
  }
  setSize(width, height) {

  }
  setZoom(scaleFactor) {
    this.context.scale(scaleFactor, scaleFactor);
  }
  selectionTool() {
    const addSelector = () => {
      const selector = document.createElement('div');
      selector.classList.add('selection');
      document.querySelector('.canvas-container').appendChild(selector);

      return selector;
    };

    const selector = addSelector();
    let x1, x2, y1, y2 = 0;

    const calc = () => {
      let x3 = Math.min(x1, x2);
      let x4 = Math.max(x1, x2);
      let y3 = Math.min(y1, y2);
      let y4 = Math.max(y1, y2);

      selector.style.left = x3 + 'px';
      selector.style.top = y3 + 'px';

      selector.style.width = x4 - x3 + 'px';
      selector.style.height = y4 - y3 + 'px';
    };

    const spawnSelection = (e) => {
      e.preventDefault();
      selector.style.display = 'block';
      selector.style.left = 0;
      selector.style.top = 0;

      selector.style.width = 0;
      selector.style.height = 0;

      x1 = e.layerX;
      y1 = e.layerY;
      calc();
    };

    const resizeSelection = (e) => {
      x2 = e.layerX;
      y2 = e.layerY;
      calc();
    };

    this.canvas.addEventListener('mousedown', (e) => {
      x1, x2, y1, y2 = 0;

      spawnSelection(e);
      this.canvas.addEventListener('mousemove', resizeSelection);
    });

    this.canvas.addEventListener('mouseup', (e) => {
      this.canvas.removeEventListener('mousemove', resizeSelection);
    });
  }
}
