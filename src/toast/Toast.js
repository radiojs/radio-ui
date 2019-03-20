import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../icon/Icon';
import Button from '../form/Button';

class Toast extends React.Component {
  componentDidMount() {
    const { _id, closeAt, onClose } = this.props;

    setTimeout(() => {
      onClose(_id);
    }, closeAt);
  }

  render() {
    const { _id, message, icon, close, children, onClose } = this.props;

    return (
      <div className="Toast">
        {icon && <Icon name={icon} />}
        {message && <p>{message}</p>}
        {children}
        {close && (
          <Button onClick={() => { onClose(_id); }}>
            <Icon name="close" />
          </Button>
        )}
      </div>
    )
  }
}

Toast.propTypes = {
  icon: PropTypes.string,
  message: PropTypes.string,
  close: PropTypes.bool,
  closeAt: PropTypes.number,
  onClose: PropTypes.func,
};

Toast.defaultProps = {
  close: false,
  closeAt: 3000,
};

export default Toast;
