function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentEditable from './ContentEditable';

var TextEditor =
/*#__PURE__*/
function (_Component) {
  _inherits(TextEditor, _Component);

  function TextEditor(props) {
    var _this;

    _classCallCheck(this, TextEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TextEditor).call(this, props));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.renderErrors = _this.renderErrors.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TextEditor, [{
    key: "handleChange",
    value: function handleChange(e) {
      var _this$props = this.props,
          name = _this$props.name,
          onChange = _this$props.onChange;
      var value = e.target.value;
      onChange(name, value);
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
      var _this$props2 = this.props,
          className = _this$props2.className,
          label = _this$props2.label,
          value = _this$props2.value,
          errors = _this$props2.errors,
          onBlur = _this$props2.onBlur;
      return React.createElement("div", {
        className: "form-control ".concat(className, " ").concat(errors ? 'error' : '')
      }, label && React.createElement("label", null, label), React.createElement(ContentEditable, {
        html: value,
        onChange: this.handleChange,
        onBlur: onBlur
      }), this.renderErrors(errors));
    }
  }]);

  return TextEditor;
}(Component);

TextEditor.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
  help: PropTypes.string,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};
TextEditor.defaultProps = {
  className: '',
  value: '',
  placeholder: '',
  errors: null,
  help: null,
  disabled: false,
  autoComplete: false,
  autoFocus: true
};
export default TextEditor;