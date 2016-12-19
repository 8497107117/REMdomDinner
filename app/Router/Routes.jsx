import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Index from './Index';

const Routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Index} />
    </Route>
);

export default Routes;