import React from 'react';

import MenuItem from './MenuItem';

class Menu extends React.Component {
  render() {
    const { menu, onClick } = this.props;

    if (!menu || menu.length === 0) return null;

    return (
      <ul className="Menu">
        {menu.map(item => (
          <MenuItem key={item.id} item={item} onClick={onClick} />
        ))}
      </ul>
    )
  }
}

Menu.Item = MenuItem;

export default Menu;
