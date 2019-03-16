import React from 'react';
import PropTypes from 'prop-types';
import {
  ContentState,
  convertFromHTML,
  convertFromRaw,
  convertToRaw,
  DefaultDraftBlockRenderMap,
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import Immutable from 'immutable';

import Button from '../form/Button';
import Icon from '../icon/Icon';
import ToolBar from '../toolbar/ToolBar';

class WysiwygEditor extends React.Component {
  constructor(props) {
    super(props);

    this.editor = React.createRef();

    // set initial values
    const { name, value } = props;
    let { contentBlocks, entityMap } = convertFromHTML(value);
    const contentState = contentBlocks ? 
      ContentState.createFromBlockArray(contentBlocks, entityMap) :
      convertFromRaw({
        blocks: [{
          text: '',
          type: 'header-one',
        }, {
          text: '',
          type: 'unstyled',
        }],
        entityMap: {},
      });
    const editorState = EditorState.createWithContent(contentState); 

    this.state = {
      name,
      editorState,
      showFontBar: false,
    };

    this.autoSaveHandle = null;
    this.saveContent = this.saveContent.bind(this);
    this.toggleFontBar = this.toggleFontBar.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInlineStyle = this.handleInlineStyle.bind(this);
    this.handleBlockType = this.handleBlockType.bind(this);
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
    const title = (rawContentState.blocks[0] && rawContentState.blocks[0].text);
    const content = stateToHTML(contentState);
    onChange(name, { title, content });
  }

  toggleFontBar() {
    this.setState({ showFontBar: !this.state.showFontBar });
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

  /**
   * 선택된 영역을 지정한 스타일로 변경한다.
   * 
   * @param {*} style : 'BOLD', 'ITALIC', 'UNDERLINE'
   */
  handleInlineStyle(e, style) {
    this.handleChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
  }

  handleBlockType(e, type) {
    this.handleChange(RichUtils.toggleBlockType(this.state.editorState, type));
  }

  render() {
    const { placeholder } = this.props;
    const { editorState, showFontBar } = this.state;

    const blockRenderMap = Immutable.Map({
      'unstyled': {
        element: 'div',
        aliasedElements: ['p'],
        className: 'unstyled',
      },
     });

    return (
      <div className="WysiwygEditor">
        <ToolBar className="top" show={true}>
          <Button className="icon" onClick={(e)=>{ this.handleInlineStyle(e, 'BOLD'); }}>
            <Icon name="bold" />
          </Button>
          <Button className="icon" onClick={(e)=>{ this.handleInlineStyle(e, 'ITALIC'); }}>
            <Icon name="italic" />
          </Button>
          <Button className="icon" onClick={(e)=>{ this.handleInlineStyle(e, 'UNDERLINE'); }}>
            <Icon name="underlined" />
          </Button>
          <Button className="icon" onClick={this.toggleFontBar}>
            <Icon name="fontsize" />
            <ToolBar className="FontBar float" show={showFontBar}>
              <Button onClick={(e)=>{ this.handleBlockType(e, 'header-one'); }}>
                <h1>h1</h1>
              </Button>
              <Button onClick={(e)=>{ this.handleBlockType(e, 'header-two'); }}>
                <h2>h2</h2>
              </Button>
              <Button onClick={(e)=>{ this.handleBlockType(e, 'header-three'); }}>
                <h3>h3</h3>
              </Button>
              <Button onClick={(e)=>{ this.handleBlockType(e, 'header-four'); }}>
                <h4>h4</h4>
              </Button>
              <Button onClick={(e)=>{ this.handleBlockType(e, 'header-five'); }}>
                <h5>h5</h5>
              </Button>
              <Button onClick={(e)=>{ this.handleBlockType(e, 'header-six'); }}>
                <h6>h6</h6>
              </Button>
              <Button onClick={(e)=>{ this.handleBlockType(e, 'unstyled'); }}>
                <p>paragraph</p>
              </Button>
            </ToolBar>
          </Button>
          <Button className="icon" onClick={(e)=>{ this.handleBlockType(e, 'blockquote'); }}>
            <Icon name="blockquote" />
          </Button>
          <Button className="icon" onClick={(e)=>{ this.handleBlockType(e, 'unordered-list-item'); }}>
            <Icon name="unorderedlist" />
          </Button>
          <Button className="icon" onClick={(e)=>{ this.handleBlockType(e, 'ordered-list-item'); }}>
            <Icon name="orderedlist" />
          </Button>
          <Button className="icon" onClick={(e)=>{ this.handleBlockType(e, 'code-block'); }}>
            <Icon name="code" />
          </Button>
        </ToolBar>
        <Editor
          ref={this.editor}
          editorState={editorState}
          placeholder={placeholder}
          blockRenderMap={DefaultDraftBlockRenderMap.merge(blockRenderMap)}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

WysiwygEditor.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
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
