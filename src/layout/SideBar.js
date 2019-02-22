import React from 'react';

import MenuContainer from '../menu/MenuContainer';

class SideBar extends React.Component {

  constructor(props) {
    super(props);

    this.handleClickDimmer = this.handleClickDimmer.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleClickDimmer(e) {
    e.stopPropagation();
    this.props.onToggleMenu();
  }

  handleMenuClick() {
    this.props.onToggleMenu();
  }

  render() {
    const { menu } = this.props;

    return (
      <div className="SideBar">
        <div className="dimmer" onClick={this.handleClickDimmer} />
        <main onClick={this.handleClick}>
          <MenuContainer menu={menu} onClick={this.handleMenuClick}/>
        </main>
      </div>
    )
  }
}

export default SideBar;
