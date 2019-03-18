import React from 'react';
import PropTypes from 'prop-types';

import Separator from './Separator';

const ToolBar = React.forwardRef((props, ref) => {
  const { className, show, children } = props;

  if (!show) return null;

  return (
    <div ref={ref} className={`ToolBar ${className}`.trim()}>{children}</div>
  );
});

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
