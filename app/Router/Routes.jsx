import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Index from './Index';
import Login from './Login';
import Register from './Register';

const Routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Index} />
        <Route path="auth/login" component={Login} />
        <Route path="auth/register" component={Register} />
    </Route>
);

export default Routes;