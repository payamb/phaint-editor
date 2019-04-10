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
    window.addEventListener('menu.action.close', (e) => this.closeMenu(e))
    window.addEventListener('click', (e) => this.closeMenu(e))
  }
  componentWillUnmount() {
    window.removeEventListener('resize', (e) => this.closeMenu(e));
  }
  render() {
    const toggleClass = this.state.active ? '' : 'hidden';
    return (
        <div className="relative z-50">
            <a onClick={(e) => this.toggleState(e)} className="px-4 py-2 lh-2 text-gray-100 hover:bg-gray-700">{this.props.name}</a>
            <div className={`mt-px w-48 text-sm text-gray-200 absolute leading-normal bg-gray-800 py-2 px-4 ${toggleClass}`}>
                <ul>
                    <li className="my-2"><a href="#">New</a></li>
                    <li className="my-2"><a href="#">Open</a></li>
                    <li className="my-2"><a href="#">Save</a></li>
                </ul>
            </div>
        </div>
    );
  }
}
