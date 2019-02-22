import React from 'react';
import PropTypes from 'prop-types';

class MenuItem extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { item, onClick } = this.props;

    e.stopPropagation();

    onClick(e, item)
  }

  render() {
    const { item } = this.props;

    return (
      <li className="menu-item" onClick={this.handleClick}>
        <p>{item.text}</p>
      </li>
    )
  }
}

MenuItem.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string,
  replace: PropTypes.bool,
};

MenuItem.defaultProps = {
  text: '',
  link: '.',
  replace: false,
};

export default MenuItem;
