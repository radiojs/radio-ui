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
import { t } from '../../lib';
import Button from '../form/Button';

var Confirm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Confirm, _React$Component);

  function Confirm(props) {
    var _this;

    _classCallCheck(this, Confirm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Confirm).call(this, props));
    _this.handleYes = _this.handleYes.bind(_assertThisInitialized(_this));
    _this.handleNo = _this.handleNo.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Confirm, [{
    key: "handleYes",
    value: function handleYes() {
      var onAnswer = this.props.onAnswer;
      onAnswer && onAnswer(true);
    }
  }, {
    key: "handleNo",
    value: function handleNo() {
      var onAnswer = this.props.onAnswer;
      onAnswer && onAnswer(false);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          show = _this$props.show,
          message = _this$props.message;
      if (!show) return null;
      return React.createElement(ReactModal, {
        className: "Modal",
        overlayClassName: "ModalOverlay",
        isOpen: show
      }, React.createElement("header", null), React.createElement("main", null, React.createElement("p", {
        className: "message"
      }, message)), React.createElement("footer", null, React.createElement(Button, {
        onClick: this.handleNo
      }, t('no')), React.createElement(Button, {
        className: "primary",
        onClick: this.handleYes
      }, t('yes'))));
    }
  }]);

  return Confirm;
}(React.Component);

Confirm.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string
};
Confirm.defaultProps = {
  show: true
};
export default Confirm;