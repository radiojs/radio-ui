import React from 'react';
import PropTypes from 'prop-types';

import Separator from './Separator';

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

ToolBar.Separator = Separator;

export default ToolBar;
