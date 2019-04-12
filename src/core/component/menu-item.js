import React from "react";

export class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }
  toggleState(event) {
    event.preventDefault();

    if (!this.state.active) {
      const event = new Event('menu.action.close');
      window.dispatchEvent(event);
    }

    this.setState({
      active: !this.state.active
    });
  }
  closeMenu(event) {
    if (event.type === 'menu.action.close' || event.clientY > 40) {
      this.setState({
        active: false
      });
    }
  }
  componentDidMount() {
    window.addEventListener('menu.action.close', (e) => this.closeMenu(e));
    window.addEventListener('click', (e) => this.closeMenu(e));
  }
  componentWillUnmount() {
    window.removeEventListener('resize', (e) => this.closeMenu(e));
  }
  render() {
    const subMenuActiveClass = this.state.active ? '' : 'hidden';
    const menuActiveClass = this.state.active ? 'bg-gray-900' : '';

    return (
        <div className="relative z-50 my-1">
            <a onClick={(e) => this.toggleState(e)} className={`px-4 py-2 leading-none hover:bg-gray-700 ${menuActiveClass}`}>
              {this.props.name}
            </a>
            <div className={`mt-2 w-48 shadow-lg text-gray-200 absolute leading-normal bg-gray-900 py-1 px-1 font-light ${subMenuActiveClass}`}>
                <ul>
                  {this.props.children}
                </ul>
            </div>
        </div>
    );
  }
}
