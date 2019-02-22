import React from 'react';
import PropTypes from 'prop-types';

class Box extends React.Component {
  render() {
    const { className, color, children } = this.props;
    return (
      <div className={`Box ${color} ${className}`.trim()}>{children}</div>
    );
  }
}

Box.propTypes = {
  className: PropTypes.string,  
};

Box.defaultProps = {
  className: '',
};

export default Box;
