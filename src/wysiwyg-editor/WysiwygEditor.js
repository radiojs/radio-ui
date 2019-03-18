import React from 'react';
import PropTypes from 'prop-types';
import {
  AtomicBlockUtils,
  CompositeDecorator,
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

import ActionBar from './ActionBar';
import LinkPopup from './LinkPopup';
import ImagePopup from './ImagePopup';
import VideoPopup from './VideoPopup';

class WysiwygEditor extends React.Component {
  constructor(props) {
    super(props);

    this.editor = React.createRef();

    const decorator = new CompositeDecorator([
      {
        component: ({ contentState, entityKey, children }) => {
          const { url } = contentState.getEntity(entityKey).getData();
          return (<a href={url}>{children}</a>);
        },
        strategy: (contentBlock, callback, contentState) => {
          contentBlock.findEntityRanges((character) => {
            const entityKey = character.getEntity();
            return (entityKey !== null &&
              contentState.getEntity(entityKey).getType() === 'LINK');
          }, callback);
        },
      },
      {
        component: ({ contentState, entityKey }) => {
          const { src } = contentState.getEntity(entityKey).getData();
          return (<img src={src} />);
        },
        strategy: (contentBlock, callback, contentState) => {
          contentBlock.findEntityRanges((character) => {
            const entityKey = character.getEntity();
            return (entityKey !== null &&
              contentState.getEntity(entityKey).getType() === 'IMAGE');
          }, callback);
        },
      },
      {
        component: ({ contentState, entityKey }) => {
          const { src } = contentState.getEntity(entityKey).getData();
          return (<video controls src={src} />);
        },
        strategy: (contentBlock, callback, contentState) => {
          contentBlock.findEntityRanges((character) => {
            const entityKey = character.getEntity();
            return (entityKey !== null &&
              contentState.getEntity(entityKey).getType() === 'VIDEO');
          }, callback);
        },
      },
    ]);

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
    const editorState = EditorState.createWithContent(contentState, decorator); 

    this.state = {
      name,
      editorState,
      linkUrl: null,
      imageUrl: null,
      videoUrl: null,
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

    const title = (rawContentState.blocks[0] && rawContentState.blocks[0].text);
    const content = stateToHTML(contentState);
    onChange(name, { title, content });
  }

  toggleLinkPopup() {
    const { editorState } = this.state;
    const selection = editorState.getSelection();

    // get Link URL on the current selection or on the caret position
    let linkUrl = null;
    if (selection.isCollapsed()) {

    } else {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        linkUrl = linkInstance.getData().url;
      }
    }

    if (selection.isCollapsed() && !linkUrl) {
      console.log('no selected text');
      return;
    } else {
      this.setState({
        linkUrl,
        showLinkPopup: !this.state.showLinkPopup,
      });
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
  handleLinkUrl(url) {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();

    if (url) {
      const contentStateWithEntity = contentState.createEntity(
        'LINK',
        'MUTABLE',
        { url },
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
        linkUrl: null,
        showLinkPopup: false,
      }, () => {
        setTimeout(() => this.editor.current.focus(), 0);
      });
    } else {

    }
  }

  handleImageUrl(url) {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();

    if (url) {
      const contentStateWithEntity = contentState.createEntity(
        'IMAGE',
        'MUTABLE',
        { src: url },
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
        imageUrl: null,
        showImagePopup: false,
      }, () => {
        setTimeout(() => this.editor.current.focus(), 0);
      });
    } else {

    }
  }

  handleVideoUrl(url) {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();

    if (url) {
      const contentStateWithEntity = contentState.createEntity(
        'VIDEO',
        'MUTABLE',
        { src: url },
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
    const { placeholder } = this.props;
    const {
      editorState,
      linkUrl,
      imageUrl,
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
        <ActionBar
          onInlineStyle={this.handleInlineStyle}
          onBlockType={this.handleBlockType}
          onLinkPopup={this.toggleLinkPopup}
          onImagePopup={this.toggleImagePopup}
          onVideoPopup={this.toggleVideoPopup}
        />
        <Editor
          ref={this.editor}
          editorState={editorState}
          placeholder={placeholder}
          blockRenderMap={DefaultDraftBlockRenderMap.merge(blockRenderMap)}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.handleChange}
        />
        <LinkPopup
          show={showLinkPopup}
          value={linkUrl}
          onSubmit={this.handleLinkUrl}
          onClose={this.toggleLinkPopup}
        />
        <ImagePopup
          show={showImagePopup}
          value={imageUrl}
          onSubmit={this.handleImageUrl}
          onClose={this.toggleImagePopup}
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
