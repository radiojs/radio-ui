import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, id) {
    e.preventDefaul();
    this.props.onClick(id);
  }

  render() {
    const { menu } = this.props;

    return (
      <div className="Dropdown">
        <ul>
          {menu && menu.map(item => (
            <li
              to={item.link}
              onClick={(e) => { this.handleClick(item.id); }}
            >{item.text}</li>
          ))}
        </ul>
      </div>
    );
  }
}

Dropdown.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    link: PropTypes.string,
  })),
};

Dropdown.defaultProps = {
  menu: [],
};

export default Dropdown;
