import React from 'react';
import _ from 'lodash';

import { t } from '../../lib';

const ErrorMessages = ({ error }) => {
  if (!error) return null;

  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    return (
      <div className="ErrorMessages GraphQLError">
        {error.graphQLErrors.map(({ message }, i) => (
          <span key={i}>{t(message)}</span>
        ))}
      </div>
    );
  }

  if (!_.isEmpty(error.networkError)) {
    return <div className="ErrorMessages NetworkError">{JSON.stringify(error.networkError)}</div>
  }

  return <div className="ErrorMessages">{error.message}</div>;
};

export default ErrorMessages;
