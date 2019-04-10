import React from "react";

export class Editor extends React.Component {
    render() {
        return (
            <div className="editor--main flex-1 bg-gray-200">
                <div className="canvas-container inline-block relative bg-white border-gray-400 shadow">
                    <canvas width="450" height="450" className="canvas-element"></canvas>
                </div>
            </div>
        );
    }
}