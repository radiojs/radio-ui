import React from 'react';
import PropTypes from 'prop-types';

import Form from '../form/Form';
import Input from '../form/Input';
import Modal from '../modal/Modal';

class LinkPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: props.url };
  }

  render() {
    const { show, onClose } = this.props;
    const { value } = this.state;

    return (
      <Modal
        show={show}
        onClose={onClose}
      >
        <Form>
          <Input
            name="url"
            value={value}
            autoFocus
          />
        </Form>
      </Modal>
    );
  }
}

LinkPopup.propTypes = {
  show: PropTypes.bool,
  url: PropTypes.string,
  onClose: PropTypes.func,
};

LinkPopup.defaultProps = {
  show: false,
};

export default LinkPopup;
