import React from 'react';
import PropTypes from 'prop-types';
import {
  MdClear,
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
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

    console.log('icons', Icon.icons);
    
    return Component ? <Component {...this.props} /> : null;
  }
}

Icon.icons = { 
  close: MdClear,
  bold: MdFormatBold,
  italic: MdFormatItalic,
  underlined: MdFormatUnderlined,
};

Icon.propTypes = {
  icons: PropTypes.object,
};

export default Icon;
