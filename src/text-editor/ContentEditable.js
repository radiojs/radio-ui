import React from 'react';
import PropTypes from 'prop-types';

class ContentEditable extends React.Component {

  constructor(props) {
    super(props);

    this.state = { html: ''};

    this.emitChange = this.emitChange.bind(this);
  }

  componentDidMount() {
    const { value, autoFocus } = this.props;
    this.setState({ html: value });

    if (autoFocus && this.element) {
      this.element.focus();
    } else {
      this.element.innerHTML = value;
    }
  }

  componentDidUpdate() {
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
  emitChange(e) {
    if (!this.element) return;

    const { name, onChange } = this.props;
    let html = this.element.innerHTML;

    if (!html) {
      html = '<p><br /></p>';
      this.element.innerHTML = html;
      const range = document.createRange();
      const sel = window.getSelection();
      range.setStart(this.element.childNodes[0], 1);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }

    if (onChange && html !== this.lastHtml) {
      e.target = { name, value: html };
      onChange(e);
    }

    this.lastHtml = html;
  }

  render() {
    const { tagName, className, disabled, onBlur, onKeyDown } = this.props;
    const { html } = this.state;

    return React.createElement(tagName, {
      ref: (c) => { this.element = c; },
      className: `ContentEditable ${className}`.trim(),
      dangerouslySetInnerHTML: { __html: html },
      contentEditable: !disabled,
      onInput: this.emitChange,
      onBlur: onBlur || this.emitChange,
      onKeyDown: onKeyDown || this.emitChange,
    });
  }
}

ContentEditable.propTypes = {
  name: PropTypes.string,
  tagName: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
};

ContentEditable.defaultProps = {
  tagName: 'div',
  className: '',
  disabled: false,
  autoFocus: false,
  placeholder: '',
};

export default ContentEditable;
