import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import Button from '../form/Button';

class Confirm extends React.Component {

  constructor(props) {
    super(props);

    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleYes() {
    const { onAnswer } = this.props;
    onAnswer && onAnswer(true);
  }

  handleNo() {
    const { onAnswer } = this.props;
    onAnswer && onAnswer(false);
  }

  handleClick(e, i) {
    e.preventDefault();
    
    const { onAnswer } = this.props;
    onAnswer && onAnswer(i);
  }

  render() {
    const { show, message, buttons, appElementId } = this.props;

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
          {buttons.map((button, i) => (
            <Button
              key={i}
              className={button.style}
              onClick={ (e) => { this.handleClick(e, i); } }
            >{button.title}</Button>
          ))}
        </footer>
      </ReactModal>
    )
  }
}

Confirm.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.object),
  appElementId: PropTypes.string,
};

Confirm.defaultProps = {
  show: true,
  buttons: [{
    title: 'No',
  }, {
    title: 'Yes',
    style: 'primary',
  }],
  appElementId: 'root',
};

export default Confirm;
