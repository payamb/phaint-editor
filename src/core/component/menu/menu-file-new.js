import React from "react";

export class MenuFileNew extends React.Component {
  handleClick(event) {

  }
  render() {
    return (
      <a onClick={(e) => this.handleClick(e)} className="hover:bg-gray-800 block px-2 py-1" href="#">New</a>
    );
  }
}
