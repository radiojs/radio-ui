import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const ErrorMessages = ({ errors }) => {

  if (typeof errors === 'string') {
    errors = [errors];
  }

  if (!errors || !errors.length === 0) return null;

  return (
    <ul className="ErrorMessages">
      {errors.map((error, i) => (
        <li key={i}>{error}</li>
      ))}
    </ul>
  );
};

ErrorMessages.propTypes = {
  errors: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ])
};

export default ErrorMessages;
