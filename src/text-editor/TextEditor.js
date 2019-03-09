import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ContentEditable from './ContentEditable';

class TextEditor extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  handleChange(e) {
    const { name, onChange } = this.props;
    const { value } = e.target;

    onChange(name, value);
  }

  renderErrors(errors) {
    if (!errors) return null;

    return (
      <p className="error">
        {errors.map((error, i) => (
          <span key={i}>{error}</span>
        ))}
      </p>
    );
  }

  render() {
    const {
      className,
      label,
      value,
      errors,
      autoFocus,
      onBlur,
    } = this.props;

    return (
      <div className={`form-control ${className} ${errors ? 'error' : ''}`}>
        {label && <label>{label}</label>}
        <ContentEditable
          html={value}
          autoFocus
          onChange={this.handleChange}
          onBlur={onBlur}
        />
        {this.renderErrors(errors)}
      </div>
    );
  }
}

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
  onBlur: PropTypes.func,
};

TextEditor.defaultProps = {
  className: '',
  value: '',
  placeholder: '',
  errors: null,
  help: null,
  disabled: false,
  autoComplete: false,
  autoFocus: true,
};

export default TextEditor;
