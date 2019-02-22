import React from 'react';
import PropTypes from 'prop-types';

class List extends React.Component {
  render() {
    const {
      className,
      listEmpty,
      listEmptyMessage,
      children,
    } = this.props;

    return (
      <ul className={`List ${className}`.trim()}>
        {listEmpty ? (
          <li className="list-empty-message">{listEmptyMessage}</li>
        ) : children}
      </ul>
    );
  }
}

List.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  listEmpty: PropTypes.bool,
  listEmptyMessage: PropTypes.string,
};

List.defaultProps = {
  className: '',
  listEmpty: false,
  listEmptyMessage: 'List empty',
};

List.Item = ({ children }) => (<li>{children}</li>);

export default List;
