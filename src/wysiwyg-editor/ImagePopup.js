import React from 'react';
import PropTypes from 'prop-types';
import validate from 'validate.js';

import FileButton from '../form/FileButton';
import Form from '../form/Form';
import Input from '../form/Input';
import Modal from '../modal/Modal';
import Tabs from '../tab/Tabs';

class ImagePopup extends React.Component {
  constructor(props) {
    super(props);

    const { value } = props;

    this.state = {
      activeTab: 'link',
      value: value || 'http://',
    };

    this.tabs = [{
      id: 'link',
      name: 'Link',
      active: true,
    }, {
      id: 'upload',
      name: 'Upload',
    }];

    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeTab(id) {
    this.setState({ activeTab: id });
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
    const { show, guideMessage, Upload, onClose } = this.props;
    const { activeTab, value } = this.state;

    return (
      <Modal
        show={show}
        title="Insert image"
        onClose={onClose}
      >
        <Tabs tabs={this.tabs} onChange={this.handleChangeTab} />
        <Tabs.Container id="link" active={activeTab === 'link'}>
          <p>{guideMessage}</p>
          <Form onSubmit={this.handleSubmit}>
            <Input
              name="url"
              value={value}
              autoFocus
              onChange={this.handleChange}
            />
          </Form>
        </Tabs.Container>
        <Tabs.Container id="upload" active={activeTab === 'upload'}>
          <Upload />
        </Tabs.Container>
      </Modal>
    );
  }
}

ImagePopup.propTypes = {
  show: PropTypes.bool,
  value: PropTypes.string,
  guideMessage: PropTypes.string,
  url: PropTypes.string,
  uploadCallback: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

ImagePopup.defaultProps = {
  show: false,
  guideMessage: 'Input Image URL',
};

export default ImagePopup;
