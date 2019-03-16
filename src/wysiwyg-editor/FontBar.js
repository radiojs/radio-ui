import React from 'react';
import PropTypes from 'prop-types';

import ToolBar from '../toolbar/ToolBar';

class FontBar extends React.Component {
  render() {
    const { show, onClick } = this.props;

    return (
      <ToolBar className="FontBar float" show={show}>
        <div className="link" onClick={(e)=>{ onClick(e, 'header-one'); }}>
          <h1>h1</h1>
        </div>
        <div className="link" onClick={(e)=>{ onClick(e, 'header-two'); }}>
          <h2>h2</h2>
        </div>
        <div className="link" onClick={(e)=>{ onClick(e, 'header-three'); }}>
          <h3>h3</h3>
        </div>
        <div className="link" onClick={(e)=>{ onClick(e, 'header-four'); }}>
          <h4>h4</h4>
        </div>
        <div className="link" onClick={(e)=>{ onClick(e, 'header-five'); }}>
          <h5>h5</h5>
        </div>
        <div className="link" onClick={(e)=>{ onClick(e, 'header-six'); }}>
          <h6>h6</h6>
        </div>
        <div className="link" onClick={(e)=>{ onClick(e, 'unstyled'); }}>
          <p>paragraph</p>
        </div>
      </ToolBar>
    )
  }
}

FontBar.propTypes = {
  show: PropTypes.bool,
  onClick: PropTypes.func,
};

FontBar.defaultProps = {
  show: false,
};

export default FontBar;
