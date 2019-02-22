import React from 'react';

import Layout from './Layout';

const withLayout = (Component, options) => (props => (
  <Layout {...props} {...options}>
    <Component {...props} />
  </Layout>
));

export default withLayout;
