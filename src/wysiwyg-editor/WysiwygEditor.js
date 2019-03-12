import React from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, RichUtils } from 'draft-js';

import Button from '../form/Button';
import Icon from '../icon/Icon';
import ToolBar from '../toolbar/ToolBar';

class WysiwygEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };

    this.onChange = (editorState) => { this.setState({ editorState }); };
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleActionBold = this.handleActionBold.bind(this);
    this.handleActionItalic = this.handleActionItalic.bind(this);
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  handleActionBold() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  handleActionItalic() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }

  render() {
    const { editorState } = this.state;

    return (
      <div className="WysiwygEditor">
        <Editor
          editorState={editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
        />
        <ToolBar show={true}>
          <Button className="icon" onClick={this.handleActionBold}>
            <Icon name="bold" />
          </Button>
          <Button className="icon" onClick={this.handleActionItalic}>
            <Icon name="italic" />
          </Button>
        </ToolBar>
      </div>
    );
  }
}

export default WysiwygEditor;
