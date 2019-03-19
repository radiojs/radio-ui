import React from 'react';
import PropTypes from 'prop-types';

import Button from '../form/Button';
import Icon from '../icon/Icon';
import ToolBar from '../toolbar/ToolBar';
import FontBar from './FontBar';

class ActionBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showFontBar: false,
    };

    this.toggleFontBar = this.toggleFontBar.bind(this);
  }

  toggleFontBar() {
    this.setState({ showFontBar: !this.state.showFontBar });
  }

  render() {
    const {
      onInlineStyle,
      onBlockType,
      onLinkPopup,
      onImagePopup,
      onVideoPopup,
    } = this.props;
    const { showFontBar } = this.state;

    return (
      <ToolBar className="ActionBar top" show={true}>
        <Button className="icon" onClick={(e)=>{ onInlineStyle(e, 'BOLD'); }}>
          <Icon name="bold" />
        </Button>
        <Button className="icon" onClick={(e)=>{ onInlineStyle(e, 'ITALIC'); }}>
          <Icon name="italic" />
        </Button>
        <Button className="icon" onClick={(e)=>{ onInlineStyle(e, 'UNDERLINE'); }}>
          <Icon name="underlined" />
        </Button>
        <Button className="icon" onClick={(e)=>{ onInlineStyle(e, 'CODE'); }}>
          <Icon name="code" />
        </Button>
        <ToolBar.Separator />
        <Button className="icon" onClick={this.toggleFontBar}>
          <Icon name="fontsize" />
          <FontBar
            show={showFontBar}
            onClick={onBlockType}
            onClose={this.toggleFontBar}
          />
        </Button>
        <ToolBar.Separator />
        <Button className="icon" onClick={(e)=>{ onBlockType(e, 'blockquote'); }}>
          <Icon name="blockquote" />
        </Button>
        <Button className="icon" onClick={(e)=>{ onBlockType(e, 'unordered-list-item'); }}>
          <Icon name="unorderedlist" />
        </Button>
        <Button className="icon" onClick={(e)=>{ onBlockType(e, 'ordered-list-item'); }}>
          <Icon name="orderedlist" />
        </Button>
        <Button className="icon" onClick={(e)=>{ onBlockType(e, 'code-block'); }}>
          <Icon name="code" />
        </Button>
        <ToolBar.Separator />
        <Button className="icon" onClick={onLinkPopup}>
          <Icon name="link" />
        </Button>
        <Button className="icon" onClick={onImagePopup}>
          <Icon name="image" />
        </Button>
        {/*
        <Button className="icon" onClick={onVideoPopup}>
          <Icon name="video" />
        </Button>
        */}
      </ToolBar>
    );
  }
}

ActionBar.propTypes = {
  onInlineStyle: PropTypes.func,
  onBlockType: PropTypes.func,
  onLinkPopup: PropTypes.func,
};

export default ActionBar;
