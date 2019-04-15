export default class ResizeBicubic {
  constructor(sourceData, targetWidth, targetHeight) {

    this.canvas = new OffscreenCanvas(targetWidth, targetHeight);
    this.context = this.canvas.getContext('2d');

    this.imageData = sourceData;
    this.targetWidth = targetWidth;
    this.targetHeight = targetHeight;
  }
  resize() {
    // N = width , M = Height
    // imageData = 1250000 in RGBA byte order

    const buffer = this.context.getImageData(0, 0, this.targetWidth, this.targetHeight);

    const scaleX = this.imageData.width / this.targetWidth;
    const scaleY = this.imageData.height / this.targetHeight;

    let targetPixel = 0;
    for (let x = 0; x <= this.targetWidth; x += 1) {
      for (let y = 0; y <= this.targetHeight; y += 1) {
        const computedX = Math.round(x * scaleX);
        const computedY = Math.round(y * scaleY);

        let sourcePixel = ((computedY * this.imageData.width) + computedX) * 4;

        buffer[targetPixel++] = this.imageData.data[sourcePixel++];
      }
    }

    return buffer;
  }
}
