import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export const PublicRoute = ({ isLogged, component: Component, ...rest }) => {
    const lastPath = localStorage.getItem('path') || '/';

    return (
        <Route {...rest} component={(props) => (isLogged ? <Redirect to={lastPath} /> : <Component {...props} />)} />
    );
};

PublicRoute.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,
};
