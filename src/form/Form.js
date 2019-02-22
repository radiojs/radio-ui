import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const { className, onSubmit, children } = this.props;

    return (
      <form
        className={`Form ${className}`.trim()}
        onSubmit={onSubmit}
      >
        {children}
      </form>
    );
  }
}

Form.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  className: '',
};

export default Form;
