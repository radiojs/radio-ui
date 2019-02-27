import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import Button from '../form/Button';

class Confirm extends React.Component {

  constructor(props) {
    super(props);

    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
  }

  handleYes() {
    const { onAnswer } = this.props;
    onAnswer && onAnswer(true);
  }

  handleNo() {
    const { onAnswer } = this.props;
    onAnswer && onAnswer(false);
  }

  render() {
    const { show, message, appElementId } = this.props;

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
          <Button onClick={this.handleNo}>{'no'}</Button>
          <Button className="primary" onClick={this.handleYes}>{'yes'}</Button>
        </footer>
      </ReactModal>
    )
  }
}

Confirm.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
  appElementId: PropTypes.string,
};

Confirm.defaultProps = {
  show: true,
  appElementId: 'root',
};

export default Confirm;
