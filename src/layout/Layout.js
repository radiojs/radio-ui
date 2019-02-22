import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import SideBar from './SideBar';

const layouts = {
  empty(props) {
    const { showSideBar, children } = props;

    return (
      <div className={`Layout ${showSideBar ? 'sidebar-on' : ''}`.trim()}>
        <main>{children}</main>
      </div>
    );
  },

  simple(props) {
    const { headerRight, showSideBar, onBack, children } = props;

    return (
      <div className={`Layout simple ${showSideBar ? 'sidebar-on' : ''}`.trim()}>
        <Header {...props} right={headerRight} onBack={onBack} />
        <main>{children}</main>
      </div>
    )
  },


  general(props) {
    const { headerRight, showSideBar, menu, onToggleMenu, onBack, children } = props;

    return (
      <div className={`Layout general ${showSideBar ? 'sidebar-on' : ''}`.trim()}>
        <Header {...props} right={headerRight} onBack={onBack} />
        <SideBar menu={menu} onToggleMenu={onToggleMenu} />
        <main>{children}</main>
      </div>
    )
  }
};

class Layout extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showSideBar: false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ showSideBar: !this.state.showSideBar });
  }

  render() {
    const props = Object.assign({}, this.props, {
      showSideBar: this.state.showSideBar,
      onToggleMenu: this.toggleMenu,
    });

    return layouts[this.props.layout](props);
  }
}

Layout.propTypes = {
  layout: PropTypes.string,
};

Layout.defaultProps = {
  layout: 'general',
};

export default Layout;
