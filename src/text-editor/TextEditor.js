import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../form/Button';
import Icon from '../icon/Icon';
import ToolBar from '../toolbar/ToolBar';
import ContentEditable from './ContentEditable';

class TextEditor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selection: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleActionBold = this.handleActionBold.bind(this);
    this.handleActionItalic = this.handleActionItalic.bind(this);
    this.handleActionUnderlined = this.handleActionUnderlined.bind(this);
    this.handleActionLink = this.handleActionLink.bind(this);
    this.handleActionTextSize = this.handleActionTextSize.bind(this);
    this.handleActionBlockQuote = this.handleActionBlockQuote.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  handleChange(e) {
    const { name, onChange } = this.props;
    const { value } = e.target;

    onChange(name, value);
  }

  handleSelectChange(e) {
    console.log('event', e);
    const current = this.state.selection;

    let selection = window.getSelection();
    if (selection) {
      if (selection.type === 'Range') {
        const selectedString = selection.toString();
        if (selectedString !== (current && current.toString())) {
          this.setState({ selection });
          if (selectedString && selectedString.length > 0) {
          
          }
        }  
        console.log('selection type', selection.type);
      } else {
        this.setState({ selection: null });
        console.log('selection type', selection.type);
      }
      console.log('selection', selection);
    } else {
      console.log('selection empty');
    }

  }

  handleActionBold(e) {

  }

  handleActionItalic(e) {

  }

  handleActionUnderlined(e) {

  }

  handleActionLink(e) {

  }

  handleActionTextSize(e) {

  }

  handleActionBlockQuote(e) {

  }
  
  renderErrors(errors) {
    if (!errors) return null;

    return (
      <p className="error">
        {errors.map((error, i) => (
          <span key={i}>{error}</span>
        ))}
      </p>
    );
  }

  render() {
    const {
      className,
      label,
      value,
      errors,
      autoFocus,
      onBlur,
    } = this.props;
    const { selection } = this.state;

    return (
      <div className={`form-control TextEditor ${className} ${errors ? 'error' : ''}`}>
        {label && <label>{label}</label>}
        <ContentEditable
          html={value}
          autoFocus={autoFocus}
          onChange={this.handleChange}
          onBlur={onBlur}
          onSelectChange={this.handleSelectChange}
        />
        {this.renderErrors(errors)}
        <ToolBar show={!!selection}>
          <Button className="icon" onClick={this.handleActionBold}>
            <Icon name="bold" />
          </Button>
          <Button className="icon" onClick={this.handleActionItalic}>
            <Icon name="italic" />
          </Button>
          <Button className="icon" onClick={this.handleActionUnderlined}>
            <Icon name="underlined" />
          </Button>
          <Button className="icon" onClick={this.handleActionLink}>
            <Icon name="link" />
          </Button>
          <Button className="icon" onClick={this.handleActionTextSize}>
            <Icon name="textSize" />
          </Button>
          <Button className="icon" onClick={this.handleActionBlockQuote}>
            <Icon name="blockquote" />
          </Button>
        </ToolBar>
      </div>
    );
  }
}

TextEditor.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
  help: PropTypes.string,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

TextEditor.defaultProps = {
  className: '',
  value: '',
  placeholder: '',
  errors: null,
  help: null,
  disabled: false,
  autoComplete: false,
  autoFocus: true,
};

export default TextEditor;
