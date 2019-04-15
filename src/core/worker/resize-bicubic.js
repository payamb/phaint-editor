export default class ResizeBicubic {
  constructor(sourceData, targetWidth, targetHeight) {
    this.sourceData = sourceData;
    this.targetWidth = targetWidth;
    this.targetHeight = targetHeight;
  }

  resize() {
    // N = width , M = Height
    // imageData = 1250000 in RGBA byte order

    const buf = new ArrayBuffer(this.sourceData.data.length);
    const buf8 = new Uint8ClampedArray(buf);
    const data = new Uint32Array(buf);

    // for (let y = 0; y < this.sourceData.height; y += 1) {
    //   for (let x = 0; x < this.sourceData.width; x += 1) {
    //     const computedX = Math.round(x * scaleX);
    //     const computedY = Math.round(y * scaleY);
    //
    //     const index = (x + y * this.sourceData.width) * 4;
    //
    //     data[index] = this.sourceData.data[index];
    //     data[index + 1] = this.sourceData.data[index + 1];
    //     data[index + 2] = this.sourceData.data[index + 2];
    //     data[index + 3] = this.sourceData.data[index + 3];
    //   }
    // }

    for (let i = 0; i <= this.sourceData.data.length; i += 4) {
      buf8[i] = this.sourceData.data[i];
      buf8[i + 1] = this.sourceData.data[i + 1];
      buf8[i + 2] = this.sourceData.data[i + 3];
      buf8[i + 3] = this.sourceData.data[i + 2];
    }

    return new ImageData(buf8, this.sourceData.width, this.sourceData.height);
  }
}
