export class Draggable {
  constructor(element) {
    this.element = element;

    // this.element.addEventListener('dragstart', this.log);
    // this.element.addEventListener('dragenter', this.log);
    // this.element.addEventListener('dragover', this.log());
    // this.element.addEventListener('dragleave', this.log());
    // this.element.addEventListener('drop', this.log());
    this.element.addEventListener('dragend', event => this.handleDragEnd(event));
  }

  handleDragEnd(event) {
    const currentPosition = this.element.getBoundingClientRect();
    const targetPosition = {
      x: this.element.offsetLeft + event.offsetX,
      y: this.element.offsetTop + event.offsetY,
    };

    this.element.style.left = `${targetPosition.x}px`;
    this.element.style.top = `${targetPosition.y}px`;

    console.log(currentPosition, targetPosition);
  }

  log(e) {
    console.log(e);
  }
}
