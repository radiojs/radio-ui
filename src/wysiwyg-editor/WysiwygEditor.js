import React from 'react';
import PropTypes from 'prop-types';
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  DefaultDraftBlockRenderMap,
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Immutable from 'immutable';

import Button from '../form/Button';
import Icon from '../icon/Icon';
import ToolBar from '../toolbar/ToolBar';

class WysiwygEditor extends React.Component {
  constructor(props) {
    super(props);

    this.editor = React.createRef();

    const { name, value } = props;
    let  editorState;
    const { contentBlocks, entityMap } = convertFromHTML(value);
    if (contentBlocks) {
      const state = ContentState.createFromBlockArray(contentBlocks, entityMap);
      editorState = EditorState.createWithContent(state); 
    } else {
      editorState = EditorState.createEmpty();
    }

    this.state = { name, editorState };

    this.autoSaveHandle = null;
    this.saveContent = this.saveContent.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleActionBold = this.handleActionBold.bind(this);
    this.handleActionItalic = this.handleActionItalic.bind(this);
    this.handleActionUnderlined = this.handleActionUnderlined.bind(this);
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.editor.current.focus();
    }
  }

  componentWillUnmount() {
    if (this.autoSaveHandle) {
      clearTimeout(this.autoSaveHandle);
      this.autoSaveHandle = null;
      this.saveContent();
    }
  }

  saveContent(state) {
    const { onChange } = this.props;
    const { editorState, name } = this.state;

    const contentState = state ?
      state.getCurrentContent() : editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const value = draftToHtml(rawContentState);
    onChange(name, value);
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.handleChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  handleChange(state) {
    this.setState({ editorState: state });

    const { autoSave } = this.props;

    if (autoSave > 0) {
      if (this.autoSaveHandle) {
        clearTimeout(this.autoSaveHandle);
        this.autoSaveHandle = null;
      }
  
      this.autoSaveHandle = setTimeout(() => {
        this.saveContent(state);
      }, this.props.autoSave);
    } else {
      this.saveContent(state);
    }
  }

  handleActionBold() {
    this.handleChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  handleActionItalic() {
    this.handleChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }

  handleActionUnderlined() {
    this.handleChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  render() {
    const { editorState } = this.state;

    const blockRenderMap = Immutable.Map({ 'unstyled': { element: 'p' } });

    return (
      <div className="WysiwygEditor">
        <Editor
          ref={this.editor}
          editorState={editorState}
          blockRenderMap={DefaultDraftBlockRenderMap.merge(blockRenderMap)}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.handleChange}
        />
        <ToolBar show={true}>
          <Button className="icon" onClick={this.handleActionBold}>
            <Icon name="bold" />
          </Button>
          <Button className="icon" onClick={this.handleActionItalic}>
            <Icon name="italic" />
          </Button>
          <Button className="icon" onClick={this.handleActionUnderlined}>
            <Icon name="underlined" />
          </Button>
        </ToolBar>
      </div>
    );
  }
}

WysiwygEditor.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  autoFocus: PropTypes.bool,
  autoSave: PropTypes.number,
};

WysiwygEditor.defaultProps = {
  name: 'editor',
  value: '',
  autoFocus: false,
  autoSave: 3000,
};

export default WysiwygEditor;
