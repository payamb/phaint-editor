import ResizeBicubic from "./resize-bicubic";

class CanvasWorker {
  onMessage(event) {
    const messageType = event.data.type;
    if (messageType in this) {
      this[messageType](event.data);
    }
  }

  static postMessage(data) {
    self.postMessage(data);
  }

  init(data) {
    this.canvas = data.params.canvas;
    this.context = this.canvas.getContext('2d');
  }

  initBlankCanvas(data) {
    this.canvas.width = data.params.width;
    this.canvas.height = data.params.height;
    this.context.fillStyle = '#fff';
    this.context.fillRect(0, 0, data.params.width, data.params.height);

    postMessage({
      type: 'setState',
      params: {
        initialized: true,
        image: null,
        width: data.width,
        height: data.height,
      },
    });
  }

  loadImage(data) {
    const blob = new Blob([new Uint8Array(data.params.image)]);

    createImageBitmap(blob).then((bitmap) => {
      this.canvas.width = bitmap.width;
      this.canvas.height = bitmap.height;
      this.context.drawImage(bitmap, 0, 0);

      postMessage({
        type: 'setState',
        params: {
          initialized: true,
          image: bitmap,
          width: bitmap.width,
          height: bitmap.height,
        },
      });
    });
  }

  resize(data) {
    const imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);

    const resize = new ResizeBicubic(imageData, data.params.width, data.params.height);
    const resizedPixelData = resize.resize();

    // this.canvas.width = data.params.width;
    // this.canvas.height = data.params.height;

    this.context.clearRect(0, 0, data.params.width, data.params.height);

    createImageBitmap(resizedPixelData).then((bitmap) => {
      this.context.drawImage(bitmap, 0, 0);
    }).catch((err) => {
      console.log(err.message);
    });

  }
}

const canvasWorker = new CanvasWorker();
self.onmessage = event => canvasWorker.onMessage(event);
