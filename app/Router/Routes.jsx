import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Index from './Index';
import Login from './Login';

const Routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Index} />
        <Route path="auth/login" component={Login} />
    </Route>
);

export default Routes;