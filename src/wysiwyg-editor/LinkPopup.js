import React from 'react';
import PropTypes from 'prop-types';
import validate from 'validate.js';

import Button from '../form/Button';
import Form from '../form/Form';
import Input from '../form/Input';
import Modal from '../modal/Modal';

class LinkPopup extends React.Component {
  constructor(props) {
    super(props);
    
    const { url, target } = props.value || {};

    this.state = {
      url: url || 'http://',
      target: target || '_self',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(name, value) {
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { onSubmit } = this.props;
    const { url, target } = this.state;

    // validate URL
    const result = validate({ url }, { url: { url: true }});
    if (result && result.url) {
      this.setState({ error: result.url[0] });
    } else {
      onSubmit(url, target);
    }
  }

  render() {
    const { show, resource, onClose } = this.props;
    const { url, target } = this.state;

    return (
      <Modal
        show={show}
        title={resource && resource.title}
        onClose={onClose}
      >
        <p>{resource && resource.message}</p>
        <Form onSubmit={this.handleSubmit}>
          <Input
            name="url"
            value={url}
            autoFocus
            onChange={this.handleChange}
          />

          <Button type="submit">{resource && resource.button}</Button>
        </Form>
      </Modal>
    );
  }
}

LinkPopup.propTypes = {
  show: PropTypes.bool,
  url: PropTypes.string,
  target: PropTypes.string,
  resource: PropTypes.object,
  url: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

LinkPopup.defaultProps = {
  show: false,
  url: 'https://',
  target: '_self',
  resource: {
    title: 'Link URL',
    message: 'Input or edit the link URL',
    button: 'Submit',
  },
};

export default LinkPopup;
