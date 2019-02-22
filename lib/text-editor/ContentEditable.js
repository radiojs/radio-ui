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

var ContentEditable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ContentEditable, _React$Component);

  function ContentEditable(props) {
    var _this;

    _classCallCheck(this, ContentEditable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ContentEditable).call(this, props));
    _this.state = {
      html: ''
    };
    _this.emitChange = _this.emitChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ContentEditable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          value = _this$props.value,
          autoFocus = _this$props.autoFocus;
      this.setState({
        html: value
      });

      if (autoFocus && this.element) {
        this.element.focus();
      } else {
        this.element.innerHTML = value;
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.element && this.props.html !== this.element.innerHTML) {
        // Perhaps React (whose VDOM gets outdated because we often prevent
        // rerendering) did not update the DOM. So we update it manually now.
        this.element.innerHTML = this.props.html;
      }
    }
    /*
      componentWillReceiveProps(nextProps) {
        const { value } = nextProps;
        this.setState({ html: value });
      }
    
      shouldComponentUpdate(nextProps) {
        let { props, element } = this;
    
        console.log('props', props);
        console.log('nextProps', nextProps);
        // We need not rerender if the change of props simply reflects the user's edits.
        // Rerendering in this case would make the cursor/caret jump
    
        // Rerender if there is no element yet... (somehow?)
        if (!element) {
          return true;
        }
    
        // ...or if html really changed... (programmatically, not by user edit)
        if (nextProps.html !== element.innerHTML && nextProps.html !== props.html) {
          return true;
        }
    
        let optional = ['style', 'className', 'disabled', 'tagName'];
    
        // Handle additional properties
        return optional.some(name => props[name] !== nextProps[name]);
      }
    */

  }, {
    key: "emitChange",
    value: function emitChange(e) {
      if (!this.element) return;
      var _this$props2 = this.props,
          name = _this$props2.name,
          onChange = _this$props2.onChange;
      var html = this.element.innerHTML;

      if (!html) {
        html = '<p><br /></p>';
        this.element.innerHTML = html;
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(this.element.childNodes[0], 1);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        this.element.focus();
      }

      if (onChange && html !== this.lastHtml) {
        e.target = {
          name: name,
          value: html
        };
        onChange(e);
      }

      this.lastHtml = html;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          tagName = _this$props3.tagName,
          className = _this$props3.className,
          disabled = _this$props3.disabled,
          onBlur = _this$props3.onBlur,
          onKeyDown = _this$props3.onKeyDown;
      var html = this.state.html;
      return React.createElement(tagName, {
        ref: function ref(c) {
          _this2.element = c;
        },
        className: "ContentEditable ".concat(className).trim(),
        dangerouslySetInnerHTML: {
          __html: html
        },
        contentEditable: !disabled,
        onInput: this.emitChange,
        onBlur: onBlur || this.emitChange,
        onKeyDown: onKeyDown || this.emitChange
      });
    }
  }]);

  return ContentEditable;
}(React.Component);

ContentEditable.propTypes = {
  name: PropTypes.string,
  tagName: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func
};
ContentEditable.defaultProps = {
  tagName: 'div',
  className: '',
  disabled: false,
  autoFocus: true,
  placeholder: ''
};
export default ContentEditable;