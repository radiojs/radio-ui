function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import Button from '../form/Button';
import Icon from '../icon/Icon';

var Modal =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal(props) {
    var _this;

    _classCallCheck(this, Modal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Modal).call(this, props));
    _this.handleClose = _this.handleClose.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Modal, [{
    key: "handleClose",
    value: function handleClose() {
      var onClose = this.props.onClose;
      onClose && onClose();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          show = _this$props.show,
          title = _this$props.title,
          children = _this$props.children;
      if (!show) return null;
      return React.createElement(ReactModal, {
        className: "Modal full ".concat(className).trim(),
        overlayClassName: "ModalOverlay",
        isOpen: show
      }, React.createElement("header", null, React.createElement("div", {
        className: "title"
      }, title), React.createElement("div", {
        className: "right"
      }, React.createElement(Button, {
        className: "icon",
        onClick: this.handleClose
      }, React.createElement(Icon, {
        name: "close"
      })))), React.createElement("main", null, children));
    }
  }]);

  return Modal;
}(React.Component);

Modal.propTypes = {
  className: PropTypes.string,
  show: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func
};
Modal.defaultProps = {
  className: '',
  show: true,
  title: ''
};
export default Modal;