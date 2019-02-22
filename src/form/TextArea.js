import React from 'react';
import PropTypes from 'prop-types';

class TextArea extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  handleChange(e) {
    const { name, onChange } = this.props;
    const value = e.target.value;

    onChange(name, value);
  }

  handleFocus(e) {
    const { name, onFocus } = this.props;

    onFocus && onFocus(name);
  }

  handleBlur(e) {
    const { name, onBlur } = this.props;

    onBlur && onBlur(name);
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
    const { label, name, value, errors } = this.props;
    const className = `form-control ${errors && errors.length > 0 ? 'error' : ''}`.trim();

    return (
      <div className={className}>
        <label>{label}</label>
        <textarea
          className="TextArea"
          name={name}
          value={value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        {this.renderErrors(errors)}
      </div>
    );
  }
}

TextArea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

TextArea.defaultProps = {
  type: 'text',
};

export default TextArea;
