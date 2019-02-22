import React from 'react';

import { Menu } from '../../components';

class MenuBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { show, menu, onClick } = this.props;

    if (!show) return null;

    return (
      <div className="MenuBar" onClick={(e) => { onClick(e); }}>
        <Menu menu={menu} onClick={onClick} />
      </div>
    )
  }
}

export default MenuBar;
