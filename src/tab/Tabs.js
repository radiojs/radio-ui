import React from 'react';
import PropTypes from 'prop-types';

import Tab from './Tab';
import TabContainer from './TabContainer';

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    const { tabs } = props;
    this.state = { tabs };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, id) {
    const { onChange } = this.props;
    const { tabs } = this.state;

    const updated = tabs.map((doc) => {
      if (doc.id === id) {
        doc.active = true;
      } else {
        doc.active = false;
      }
      return doc;
    });

    this.setState({ tabs: updated });
    onChange && onChange(id);
  }

  render() {
    const { tabs } = this.state;

    return (
      <div className="Tabs">
        {tabs.map(item => (
          <Tab key={item.id} {...item} onClick={this.handleClick} />
        ))}
      </div>
    );
  }
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object),
};

Tabs.defaultProps = {
  tabs: [],
};

Tabs.Container = TabContainer;

export default Tabs;
