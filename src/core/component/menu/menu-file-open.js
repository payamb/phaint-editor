import React from "react";

export class MenuFileOpen extends React.Component {
  render() {
    const isApiAvailable = 'cursor-not-allowed opacity-50';
    return (
      <a className={`hover:bg-gray-800 block px-2 py-1 ${isApiAvailable}`} href="#">Open</a>
    );
  }
}
