import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { type, className, disabled, onClick, children } = this.props;

    return (
      <button
        type={type}
        className={`Button ${className}`.trim()}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  className: '',
  disabled: '',
};

export default Button;
