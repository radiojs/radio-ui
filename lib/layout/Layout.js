function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import SideBar from './SideBar';
var layouts = {
  empty: function empty(props) {
    var showSideBar = props.showSideBar,
        children = props.children;
    return React.createElement("div", {
      className: "Layout ".concat(showSideBar ? 'sidebar-on' : '').trim()
    }, React.createElement("main", null, children));
  },
  simple: function simple(props) {
    var headerRight = props.headerRight,
        showSideBar = props.showSideBar,
        onBack = props.onBack,
        children = props.children;
    return React.createElement("div", {
      className: "Layout simple ".concat(showSideBar ? 'sidebar-on' : '').trim()
    }, React.createElement(Header, _extends({}, props, {
      right: headerRight,
      onBack: onBack
    })), React.createElement("main", null, children));
  },
  general: function general(props) {
    var headerRight = props.headerRight,
        showSideBar = props.showSideBar,
        menu = props.menu,
        onToggleMenu = props.onToggleMenu,
        onBack = props.onBack,
        children = props.children;
    return React.createElement("div", {
      className: "Layout general ".concat(showSideBar ? 'sidebar-on' : '').trim()
    }, React.createElement(Header, _extends({}, props, {
      right: headerRight,
      onBack: onBack
    })), React.createElement(SideBar, {
      menu: menu,
      onToggleMenu: onToggleMenu
    }), React.createElement("main", null, children));
  }
};

var Layout =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Layout, _React$Component);

  function Layout(props) {
    var _this;

    _classCallCheck(this, Layout);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Layout).call(this, props));
    _this.state = {
      showSideBar: false
    };
    _this.toggleMenu = _this.toggleMenu.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Layout, [{
    key: "toggleMenu",
    value: function toggleMenu() {
      this.setState({
        showSideBar: !this.state.showSideBar
      });
    }
  }, {
    key: "render",
    value: function render() {
      var props = Object.assign({}, this.props, {
        showSideBar: this.state.showSideBar,
        onToggleMenu: this.toggleMenu
      });
      return layouts[this.props.layout](props);
    }
  }]);

  return Layout;
}(React.Component);

Layout.propTypes = {
  layout: PropTypes.string
};
Layout.defaultProps = {
  layout: 'general'
};
export default Layout;