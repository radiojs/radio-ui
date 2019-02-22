import React from 'react';
import { withRouter } from 'react-router-dom';

import Menu from './Menu';

const MenuContainer = withRouter(({ menu, onClick, history }) => {
  return (
    <Menu
      menu={menu}
      onClick={(e, menuItem) => {
        history.replace(menuItem.link);
        onClick(menuItem);
      }}
    />
  );
});

export default MenuContainer;
