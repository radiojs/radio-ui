import React from 'react';
import PropTypes from 'prop-types';

class Tab extends React.Component {
  render() {
    const { id, name, active, onClick } = this.props;

    return (
      <div
        className={`Tab ${active ? 'active' : ''}`.trim()}
        onClick={(e) => { onClick(e, id); }}
      >{name}</div>
    );
  }
}

Tab.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

Tab.defaultProps = {
  active: false,
};

export default Tab;
