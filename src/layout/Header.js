import React from 'react';
import PropTypes from 'prop-types';

import Button from '../form/Button';
import Icon from '../icon/Icon';

class Header extends React.Component {
  render() {
    const { title, backButton, right, onBack, onToggleMenu } = this.props;

    return (
      <header className="Header">
        <div className="title">{title}</div>
        <div className="left">{backButton ? (
          <Button className="icon" onClick={onBack}>
            <Icon name="back" />
          </Button>
        ) : (
          <Button className="icon" onClick={onToggleMenu}>
            <Icon name="menu" />
          </Button>
        )}</div>
        {right && (<div className="right">{right}</div>)}
      </header>
    )
  }
}

Header.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  right: PropTypes.element,
  backButton: PropTypes.bool,
};

export default Header;
