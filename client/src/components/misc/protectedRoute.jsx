/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectedRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route {...rest} render={(props) => (isAuthenticated ? <Component {...props} /> : null)} />
  );
}

ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default ProtectedRoute;
