import React from 'react';
import { withRouter } from 'react-router-dom';
import Menu from './Menu';
var MenuContainer = withRouter(function (_ref) {
  var menu = _ref.menu,
      _onClick = _ref.onClick,
      history = _ref.history;
  return React.createElement(Menu, {
    menu: menu,
    onClick: function onClick(e, menuItem) {
      history.replace(menuItem.link);

      _onClick(menuItem);
    }
  });
});
export default MenuContainer;