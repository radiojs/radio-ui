import React from 'react';
import _ from 'lodash';
import { t } from '../../lib';

var ErrorMessages = function ErrorMessages(_ref) {
  var error = _ref.error;
  if (!error) return null;

  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    return React.createElement("div", {
      className: "ErrorMessages GraphQLError"
    }, error.graphQLErrors.map(function (_ref2, i) {
      var message = _ref2.message;
      return React.createElement("span", {
        key: i
      }, t(message));
    }));
  }

  if (!_.isEmpty(error.networkError)) {
    return React.createElement("div", {
      className: "ErrorMessages NetworkError"
    }, JSON.stringify(error.networkError));
  }

  return React.createElement("div", {
    className: "ErrorMessages"
  }, error.message);
};

export default ErrorMessages;