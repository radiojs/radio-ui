import React from 'react';
import PropTypes from 'prop-types';
import MoonLoader from 'react-spinners/MoonLoader';
import BarLoader from 'react-spinners/BarLoader';

const spinners = {
  bar: (
    <div className="Spinner bar">
      <BarLoader size={100} sizeUnit={'%'} />
    </div>
  ),

  moon: (
    <div className="Spinner bar">
      <MoonLoader size={30} />
    </div>
  ),
};

class Spinner extends React.Component {
  render() {
    return spinners[this.props.style];
  }
}

Spinner.propTypes = {
  style: PropTypes.oneOf(['bar', 'moon']),
};

Spinner.defaultProps = {
  style: 'moon',
};

export default Spinner;
