import React from 'react';
import PropTypes from 'prop-types';
import { MdClear } from 'react-icons/md';

class Icon extends React.Component {
  constructor(props) {
    super(props);

    if (props.icons) {
      Icon.icons = props.icons;
    }
  }

  render() {
    const { name } = this.props;
    const Component = Icon.icons[name];

    return Component && <Component {...this.props} />;
  }
}

Icon.icons = { close: MdClear };

Icon.propTypes = {
  icons: PropTypes.object,
};

export default Icon;
