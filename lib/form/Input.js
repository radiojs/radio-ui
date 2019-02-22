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

var Input =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input(props) {
    var _this;

    _classCallCheck(this, Input);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Input).call(this, props));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.handleFocus = _this.handleFocus.bind(_assertThisInitialized(_this));
    _this.handleBlur = _this.handleBlur.bind(_assertThisInitialized(_this));
    _this.renderErrors = _this.renderErrors.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Input, [{
    key: "handleChange",
    value: function handleChange(e) {
      var _this$props = this.props,
          name = _this$props.name,
          onChange = _this$props.onChange;
      var value = e.target.value;
      onChange && onChange(name, value);
    }
  }, {
    key: "handleFocus",
    value: function handleFocus(e) {
      var _this$props2 = this.props,
          name = _this$props2.name,
          onFocus = _this$props2.onFocus;
      onFocus && onFocus(name);
    }
  }, {
    key: "handleBlur",
    value: function handleBlur(e) {
      var _this$props3 = this.props,
          name = _this$props3.name,
          onBlur = _this$props3.onBlur;
      onBlur && onBlur(name);
    }
  }, {
    key: "renderErrors",
    value: function renderErrors(errors) {
      if (!errors) return null;
      return React.createElement("p", {
        className: "error"
      }, errors.map(function (error, i) {
        return React.createElement("span", {
          key: i
        }, error);
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          label = _this$props4.label,
          type = _this$props4.type,
          name = _this$props4.name,
          value = _this$props4.value,
          placeholder = _this$props4.placeholder,
          errors = _this$props4.errors;
      var className = "form-control ".concat(errors && errors.length > 0 ? 'error' : '').trim();
      return React.createElement("div", {
        className: className
      }, label && React.createElement("label", null, label), React.createElement("input", {
        className: "Input",
        type: type,
        name: name,
        value: value,
        placeholder: placeholder,
        onChange: this.handleChange,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur
      }), this.renderErrors(errors));
    }
  }]);

  return Input;
}(React.Component);

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};
Input.defaultProps = {
  type: 'text',
  placeholder: ''
};
export default Input;