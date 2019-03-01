/**
 * label, error message 등을 보여주는 기능을 포함한 input control 컴포넌트
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

class Radio extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.renderHelp = this.renderHelp.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return (this.props.name !== nextProps.name
      || this.props.value !== nextProps.value
      || this.props.options !== nextProps.options
      || this.props.errors !== nextProps.errors
    );
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.props.onChange(name, value);
  }

  renderErrors(errors) {
    return null;
  }

  renderHelp(help) {
    if (! help) return null;

    return (
      <span className="help-block m-b-none">{help}</span>
    );
  }

  renderOptions(name, value, options, inline) {
    const className = `${inline ? 'radio-inline' : 'radio'} c-radio`;
    return options && options.map(item => (
      <label key={item.value} className={className}>
        <input
          type="radio"
          id={`${name}_${item.value}`}
          name={name}
          value={item.value}
          checked={item.value == value}
          onChange={this.handleChange}
        />
        <em className="fa fa-circle" />
        {item.name}
      </label>
    ));
  }

  render() {
    const {
      label,
      name,
      value,
      className,
      errors,
      help,
      options,
      onChange,
      inline,
    } = this.props;

    return (
      <div className={`radio-group ${errors && errors.length > 0 ? 'error' : ''} ${className}`}>
        {label ? <h4>{label}</h4> : null}
        {this.renderOptions(name, value, options, inline, onChange)}
        {this.renderErrors(errors)}
        {this.renderHelp(help)}
      </div>
    );
  }
}

Radio.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  help: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })).isRequired,
  inline: PropTypes.bool,
};

Radio.defaultProps = {
  className: '',
  value: null,
  errors: null,
  help: null,
  inline: true,
};

export default Radio;
