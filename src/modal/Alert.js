import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import Button from '../form/Button';

class Alert extends React.Component {
  render() {
    const { show, message, buttonText, appElementId, onClose } = this.props;

    if (!show) return null;

    return (
      <ReactModal
        className="Modal"
        overlayClassName="ModalOverlay"
        isOpen={show}
        appElement={document.getElementById(appElementId)}
      >
        <header></header>
        <main>
          <p className="message">{message}</p>
        </main>
        <footer>
          <Button className="primary" onClick={onClose}>{buttonText}</Button>
        </footer>
      </ReactModal>
    )
  }
}

Alert.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
  buttonText: PropTypes.string,
  appElementId: PropTypes.string,
  onClose: PropTypes.func,
};

Alert.defaultProps = {
  show: true,
  buttonText: 'Ok',
  appElementId: 'root',
};

export default Alert;
