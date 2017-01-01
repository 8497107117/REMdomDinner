import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';

import Routes from './Router/Routes';

import 'normalize.css/normalize';
import '../assets/css/index';

render(<Router routes={Routes} history={hashHistory} />, document.getElementById('app'));