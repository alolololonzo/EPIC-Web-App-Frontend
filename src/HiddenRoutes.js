import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * The hidden routes prevent direct URL accessing.
 *
 * @author Charlotte McVicar
 * @version 1.0
 */

export const HiddenRoutes = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
)