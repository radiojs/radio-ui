import React from 'react';
import PropTypes from 'prop-types';

class TabContainer extends React.Component {
  render() {
    const { id, active, children } = this.props;

    return (
      <div
        id={id}
        className={`TabContainer ${active ? 'active' : ''}`.trim()}
      >{children}</div>
    )
  }
}

TabContainer.propTypes = {
  id: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

TabContainer.defaultProps = {
  active: false,
};

export default TabContainer;
