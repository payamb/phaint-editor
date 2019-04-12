import React from "react";
import {Draggable} from "../draggable";

export class Dialogue extends React.Component {
  componentDidMount() {
      const draggableDialogue = new Draggable(document.querySelector('.dialogue'));
  }
  render() {
    return (
        <div className="h-screen w-full absolute flex items-start justify-center z-50">
        <div className="dialogue absolute bg-gray-300 text-sm rounded shadow-lg mt-12 max-w-md max-h-full overflow-hidden">
          <div className="bg-gray-800 py-2 px-3 text-white">
            <div className="">Title</div>
          </div>
          <div className="p-4">
            <p>Ready to get started? Keep scrolling to see some great components.</p>
          </div>
          <div className="flex justify-center">
            <button className="flex-no-shrink text-white py-2 px-4 rounded bg-teal hover:bg-teal-dark">Let's Go</button>
          </div>
        </div>
      </div>
    );
  }
}
