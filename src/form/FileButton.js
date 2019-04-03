import React from 'react';
import PropTypes from 'prop-types';

class FileButton extends React.Component {
  render() {
    const { name, children, onChange } = this.props;

    return (
      <div className="FileButton">
        <label htmlFor="file">{children}</label>
        <input type="file" id="file" name={name} onChange={onChange} />
      </div>
    )
  }
}

FileButton.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
};

export default FileButton;
