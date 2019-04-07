import React from 'react';
import PropTypes from 'prop-types';
import {
  AtomicBlockUtils,
  convertFromRaw,
  convertToRaw,
  DefaultDraftBlockRenderMap,
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import Immutable from 'immutable';
import _ from 'lodash';

import EntityMappers from './EntityMappers';
import ActionBar from './ActionBar';
import LinkPopup from './LinkPopup';
import VideoPopup from './VideoPopup';

class WysiwygEditor extends React.Component {
  constructor(props) {
    super(props);

    this.editor = React.createRef();

    // set initial values
    const { name, value } = props;
    const rawValue = !_.isEmpty(value) ? value : {
      blocks: [{
        text: '',
        type: 'header-one',
      }, {
        text: '',
        type: 'unstyled',
      }],
      entityMap: [],
    };

    // initial format is the typeof { blocks: [...], entityMap: [...] }
    // it should be morphed to the type of { blocks: [...], entityMap: { 0: {}, 1: {}, ...}};
    // and the field '__typename' should be deleted
    const entityMapObject = {};
    if (rawValue.entityMap && rawValue.entityMap.length > 0) {
      rawValue.entityMap.forEach((doc, i) => {
        delete doc.data.__typename;
        entityMapObject[i] = doc;
      });
    }
    rawValue.entityMap = entityMapObject;

    const contentState = convertFromRaw(rawValue);
    const editorState = EditorState.createWithContent(contentState, EntityMappers); 

    this.state = {
      name,
      editorState,
      showLinkPopup: false,
      showImagePopup: false,
      showVideoPopup: false,
    };

    this.autoSaveHandle = null;
    this.saveContent = this.saveContent.bind(this);
    this.toggleLinkPopup = this.toggleLinkPopup.bind(this);
    this.toggleImagePopup = this.toggleImagePopup.bind(this);
    this.toggleVideoPopup = this.toggleVideoPopup.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInlineStyle = this.handleInlineStyle.bind(this);
    this.handleBlockType = this.handleBlockType.bind(this);
    this.handleLinkUrl = this.handleLinkUrl.bind(this);
    this.handleImageUrl = this.handleImageUrl.bind(this);
    this.handleVideoUrl = this.handleVideoUrl.bind(this);
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
    rawContentState.entityMap = Object.keys(rawContentState.entityMap).sort().map(i => rawContentState.entityMap[i]);

    const title = (rawContentState.blocks[0] && rawContentState.blocks[0].text);
    const content = rawContentState;

    onChange(name, { title, content });
  }

  toggleLinkPopup() {
    const { editorState } = this.state;
    const selection = editorState.getSelection();

    // get Link URL on the current selection or on the caret position
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
      if (linkKey) {
        const data = contentState.getEntity(linkKey).getData();
        this.setState({
          link: data,
          showLinkPopup: !this.state.showLinkPopup,
        });
      } else {
        this.setState({
          link: null,
          showLinkPopup: !this.state.showLinkPopup,
        });
      }
    }
  }

  toggleImagePopup() {
    this.setState({
      showImagePopup: !this.state.showImagePopup,
    });
  }

  toggleVideoPopup() {
    this.setState({
      showVideoPopup: !this.state.showVideoPopup,
    });
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

  /**
   * 링크를 삽입하거나 기존에 존재하는 링크를 삭제한다.
   * 삽입하는 경우는, url 값을 받아서 선택된 영역을 <a href="..."></a> 태그로 감싼다.
   * 
   * @param {*} url 
   */
  handleLinkUrl(url, target = '_self') {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();

    if (url) {
      const contentStateWithEntity = contentState.createEntity(
        'LINK',
        'MUTABLE',
        { url, target },
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithEntity,
      });
      const editorStateUpdated = RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      );

      this.setState({
        editorState: editorStateUpdated,
        link: null,
        showLinkPopup: false,
      }, () => {
        setTimeout(() => this.editor.current.focus(), 0);
      });
    }
  }

  handleImageUrl(e) {
    this.props.onImagePopup((url, className = '') => {
      const { editorState } = this.state;
      const contentState = editorState.getCurrentContent();
  
      const contentStateWithEntity = contentState.createEntity(
        'IMAGE',
        'MUTABLE',
        { url, className },
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithEntity,
      });
      const editorStateUpdated = AtomicBlockUtils.insertAtomicBlock(
        newEditorState,
        entityKey,
        ' ',
      );

      this.setState({
        editorState: editorStateUpdated,
        showImagePopup: false,
      }, () => {
        setTimeout(() => this.editor.current.focus(), 0);
      });
    });
  }

  handleVideoUrl(url, className = '') {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();

    if (url) {
      const contentStateWithEntity = contentState.createEntity(
        'VIDEO',
        'MUTABLE',
        { url, className },
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithEntity,
      });
      const editorStateUpdated = AtomicBlockUtils.insertAtomicBlock(
        newEditorState,
        entityKey,
        ' ',
      );

      this.setState({
        editorState: editorStateUpdated,
        videoUrl: null,
        showVideoPopup: false,
      }, () => {
        setTimeout(() => this.editor.current.focus(), 0);
      });
    } else {

    }
  }

  render() {
    const { placeholder, onImagePopup } = this.props;
    const {
      editorState,
      link,
      videoUrl,
      showLinkPopup,
      showImagePopup,
      showVideoPopup,
    } = this.state;

    const blockRenderMap = Immutable.Map({
      'unstyled': {
        element: 'div',
        aliasedElements: ['p'],
        className: 'unstyled',
      },
     });

    return (
      <div className="WysiwygEditor">
        <Editor
          ref={this.editor}
          editorState={editorState}
          placeholder={placeholder}
          blockRenderMap={DefaultDraftBlockRenderMap.merge(blockRenderMap)}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.handleChange}
        />
        <ActionBar
          onInlineStyle={this.handleInlineStyle}
          onBlockType={this.handleBlockType}
          onLinkPopup={this.toggleLinkPopup}
          onImagePopup={this.handleImageUrl}
          onVideoPopup={this.toggleVideoPopup}
        />
        <LinkPopup
          key={showLinkPopup}
          show={showLinkPopup}
          value={link}
          onSubmit={this.handleLinkUrl}
          onClose={this.toggleLinkPopup}
        />
        <VideoPopup
          show={showVideoPopup}
          value={videoUrl}
          onSubmit={this.handleVideoUrl}
          onClose={this.toggleVideoPopup}
        />
      </div>
    );
  }
}

WysiwygEditor.propTypes = {
  name: PropTypes.string,
  value: PropTypes.object,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  autoSave: PropTypes.number,
  onImagePopup: PropTypes.func,
};

WysiwygEditor.defaultProps = {
  name: 'editor',
  value: {},
  autoFocus: false,
  autoSave: 3000,
};

export default WysiwygEditor;
