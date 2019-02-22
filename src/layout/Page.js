import React from 'react';
import PropTypes from 'prop-types';

class Page extends React.Component {
  render() {
    const { className, children } = this.props;
    return (
      <div className={`Page ${className}`.trim()}>{children}</div>
    );
  }
}

Page.propTypes = {
  className: PropTypes.string,
};

Page.defaultProps = {
  className: '',
};

export default Page;
