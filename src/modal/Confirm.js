import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import { t } from '../../lib';
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
    const { show, message } = this.props;

    if (!show) return null;

    return (
      <ReactModal
        className="Modal"
        overlayClassName="ModalOverlay"
        isOpen={show}
      >
        <header></header>
        <main>
          <p className="message">{message}</p>
        </main>
        <footer>
          <Button onClick={this.handleNo}>{t('no')}</Button>
          <Button className="primary" onClick={this.handleYes}>{t('yes')}</Button>
        </footer>
      </ReactModal>
    )
  }
}

Confirm.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
};

Confirm.defaultProps = {
  show: true,
};

export default Confirm;
