function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Layout from './Layout';

var withLayout = function withLayout(Component, options) {
  return function (props) {
    return React.createElement(Layout, _extends({}, props, options), React.createElement(Component, props));
  };
};

export default withLayout;