/**
 * label, error message 등을 보여주는 기능을 포함한 input control 컴포넌트
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

class CheckBox extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.renderHelp = this.renderHelp.bind(this);
  }

  handleChange(e) {
    const { name, onChange } = this.props;
    const { checked } = e.target;

    onChange(name, checked);
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

  render() {
    const {
      className,
      text,
      name,
      value,
      checked,
      errors,
      help,
    } = this.props;

    return (
      <div className={`form-control ${className}`.trim()}>
        <div className={`CheckBox ${errors ? 'error' : ''}`.trim()}>
          <label>
            <input
              type="checkbox"
              name={name}
              value={value}
              checked={checked}
              onChange={this.handleChange}
            />
            <em className="fa fa-check" />{text}
          </label>
        </div>
        {this.renderErrors(errors)}
        {this.renderHelp(help)}
      </div>
    );
  }
}

CheckBox.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  help: PropTypes.string,
};

CheckBox.defaultProps = {
  className: '',
  text: '',
  value: '',
  checked: false,
  errors: null,
  help: null,
};

export default CheckBox;
