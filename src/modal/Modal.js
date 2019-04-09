import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import Button from '../form/Button';
import Icon from '../icon/Icon';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    const { onClose } = this.props;
    onClose && onClose();
  }

  render() {
    const { className, appElementId, show, title, full, children } = this.props;

    if (!show) return null;

    return (
      <ReactModal
        className={`Modal ${full ? 'full' : ''} ${className}`.trim()}
        overlayClassName="ModalOverlay"
        isOpen={show}
        appElement={document.getElementById(appElementId)}
      >
        <header>
          <div className="title">{title}</div>
          <div className="right">
            <Button className="icon" onClick={this.handleClose}>
              <Icon name="close" />
            </Button>
          </div>
        </header>
        <main>
          {children}
        </main>
      </ReactModal>
    )
  }
}

Modal.propTypes = {
  className: PropTypes.string,
  appElementId: PropTypes.string,
  show: PropTypes.bool,
  title: PropTypes.string,
  full: PropTypes.bool,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  className: '',
  appElementId: 'root',
  show: true,
  title: '',
  full: false,
};

export default Modal;
