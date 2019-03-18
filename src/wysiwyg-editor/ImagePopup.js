import React from 'react';
import PropTypes from 'prop-types';
import validate from 'validate.js';

import Form from '../form/Form';
import Input from '../form/Input';
import Modal from '../modal/Modal';

class ImagePopup extends React.Component {
  constructor(props) {
    super(props);

    const { value } = props;

    this.state = {
      value: value || 'http://',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(name, value) {
    this.setState({ value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { onSubmit } = this.props;
    const { value } = this.state;

    // validate URL
    const result = validate({ url: value }, { url: { url: true }});
    if (result && result.url) {
      this.setState({ error: result.url[0] });
    } else {
      onSubmit(value);
    }
  }

  render() {
    const { show, guideMessage, onClose } = this.props;
    const { value } = this.state;

    return (
      <Modal
        show={show}
        onClose={onClose}
      >
        <p>{guideMessage}</p>
        <Form onSubmit={this.handleSubmit}>
          <Input
            name="url"
            value={value}
            autoFocus
            onChange={this.handleChange}
          />
        </Form>
      </Modal>
    );
  }
}

ImagePopup.propTypes = {
  show: PropTypes.bool,
  value: PropTypes.string,
  guideMessage: PropTypes.string,
  url: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

ImagePopup.defaultProps = {
  show: false,
  guideMessage: 'Input Image URL',
};

export default ImagePopup;
