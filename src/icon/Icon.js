import React from 'react';
import PropTypes from 'prop-types';
import {
  MdClear,
  MdCode,
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatUnderlined,
  MdImage,
  MdLink,
  MdTextFields,
  MdVideocam,
} from 'react-icons/md';

class Icon extends React.Component {
  constructor(props) {
    super(props);

    if (props.icons) {
      Icon.icons = Object.assign({}, Icon.icons, props.icons);
    }
  }

  render() {
    const { name } = this.props;
    const Component = Icon.icons[name];
    
    return Component ? <Component {...this.props} /> : null;
  }
}

Icon.icons = { 
  close: MdClear,
  code: MdCode,
  blockquote: MdFormatQuote,
  bold: MdFormatBold,
  italic: MdFormatItalic,
  orderedlist: MdFormatListNumbered,
  underlined: MdFormatUnderlined,
  unorderedlist: MdFormatListBulleted,
  fontsize: MdTextFields,
  link: MdLink,
  image: MdImage,
  video: MdVideocam,
};

Icon.propTypes = {
  icons: PropTypes.object,
};

export default Icon;
