import React from 'react';
import PropTypes from 'prop-types';

class ToolBar extends React.Component {

  render() {
    const { show, children } = this.props;

    if (!show) return null;

    return (
      <div className="ToolBar">{children}</div>
    )
  }
}

ToolBar.propTypes = {
  show: PropTypes.bool,
};

ToolBar.defaultProps = {
  show: false,
};

export default ToolBar;
