import './scss/main.scss';
import { Draggable } from "./core/draggable";

const canvasContainer = document.querySelector('.canvas-container');

const draggableContainer = new Draggable(canvasContainer);
