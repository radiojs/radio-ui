import React from 'react';
import PropTypes from 'prop-types';

class ToolBar extends React.Component {

  render() {
    const { className, show, children } = this.props;

    if (!show) return null;

    return (
      <div className={`ToolBar ${className}`.trim()}>{children}</div>
    )
  }
}

ToolBar.propTypes = {
  className: PropTypes.string,
  show: PropTypes.bool,
};

ToolBar.defaultProps = {
  className: '',
  show: false,
};

export default ToolBar;
