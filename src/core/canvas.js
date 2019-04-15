import {subscribe, publish} from "./event-bus";
import ResizeBicubic from "./worker/resize-bicubic";

export class Canvas {
  static instance;

  constructor(canvasElement) {
    if(this.instance){
      return this.instance;
    }

    this.instance = this;
    this.canvas = canvasElement;

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

    this.bindWorker();
    this.registerListeners();
    this.selectionTool();
  }

  bindWorker() {
    this.canvasWorker = new Worker('worker/canvas-worker.js');
    this.canvasWorker.addEventListener('message', ev => this.serviceWorkerHandler(ev));

    let offscreen = this.canvas.transferControlToOffscreen();
    this.canvasWorker.postMessage({
      type: 'init',
      params: {
        canvas: offscreen
      }
    }, [offscreen]);
  }
  registerListeners() {
    subscribe('canvas.new.init', (data) => this.initBlankCanvas(data));
    subscribe('canvas.init.image', (image) => this.initCanvasWithImage(image));

    subscribe('canvas.edit.resize', (data) => this.resize(data));

    subscribe('canvas.meta.zoom', (scaleFactor) => this.setZoom(scaleFactor));
    subscribe('canvas.export', (data) => this.export(data));
  }

  serviceWorkerHandler(event) {
    if (event.data.type === 'setState') {
      Object.assign(this.state, event.data.params);
    }
    if (event.data.type === 'render') {
      this.context.transferFromImageBitmap(event.data.params.bitmap);
    }
  }
  initBlankCanvas(data) {
    this.canvasWorker.postMessage({
      type: 'initBlankCanvas',
      params: {
        width: data.width,
        height: data.height,
      }
    });
  }
  initCanvasWithImage(image) {
    this.canvasWorker.postMessage({
      type: 'loadImage',
      params: {
        image: image,
      }
    });
  }
  resize(data) {
    this.canvasWorker.postMessage({
      type: 'resize',
      params: {
        algo: 'bicubic',
        width: data.width,
        height: data.height,
      }
    });
  }
  export(data) {
    window.location.href = this.canvas.toDataURL('image/jpeg', 1.0)
      .replace('image/jpeg', "image/octet-stream");
  }
  setZoom(scaleFactor) {
    // this.context.scale(scaleFactor, scaleFactor);
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
