import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.input = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.input.current.focus();
    }
  }

  handleChange(e) {
    const { name, onChange } = this.props;
    const value = e.target.value;

    onChange && onChange(name, value);
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
    const { label, type, name, value, placeholder, errors } = this.props;
    const className = `form-control ${errors && errors.length > 0 ? 'error' : ''}`.trim();

    return (
      <div className={className}>
        {label && (<label>{label}</label>)}
        <input
          ref={this.input}
          className="Input"
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        {this.renderErrors(errors)}
      </div>
    );
  }
}

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  autoFocus: false,
};

export default Input;
