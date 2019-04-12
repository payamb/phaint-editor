export class Draggable {
  constructor(element) {
    this.element = element;

    this.position = {
      positionX: 0,
      positionY: 0,
    };

    window.addEventListener('mouseup', () => this.handleMouseUp(), false);
    this.element.addEventListener('mousedown', e => this.handleMouseDown(e), false);
  }

  handleMouseMove(event) {
    console.log('yo mousemove');
    const x = event.clientX - this.position.positionX;
    const y = event.clientY - this.position.positionY;

    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
  }

  handleMouseDown(event) {
    console.log('yo mousedown');
    this.position.positionX = event.clientX - this.element.offsetLeft;
    this.position.positionY = event.clientY - this.element.offsetTop;

    window.addEventListener('mousemove', e => this.handleMouseMove(e), true);
  }

  handleMouseUp() {
    window.removeEventListener('mousemove', e => this.handleMouseMove(e), true);
  }
}
