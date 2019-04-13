export class Draggable {
  constructor(elementHandle, elementBody) {
    this.elementHandle = elementHandle;
    this.elementBody = elementBody;
    this.position = {
      x: 0,
      y: 0,
    };

    window.addEventListener('mouseup', () => this.handleMouseUp(), false);
    this.elementHandle.addEventListener('mousedown', e => this.handleMouseDown(e), false);
    this.mouseMoveEventHandler = e => this.handleMouseMove(e);
  }

  handleMouseMove(event) {
    const x = event.clientX - this.position.x;
    const y = event.clientY - this.position.y - 40;

    this.elementBody.style.left = `${x}px`;
    this.elementBody.style.top = `${y}px`;
  }

  handleMouseDown(event) {
    this.position.x = event.clientX - this.elementBody.offsetLeft;
    this.position.y = event.clientY - this.elementBody.offsetTop;

    window.addEventListener('mousemove', this.mouseMoveEventHandler, true);
  }

  handleMouseUp() {
    window.removeEventListener('mousemove', this.mouseMoveEventHandler, true);
  }
}
