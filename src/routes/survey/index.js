import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import start from './start';

import "Assets/css/custom/main.css";
import 'Assets/css/custom/survey.css';
import "Assets/css/custom/dashboard.css";

export default ({ match }) => (
	<Switch>
		<Redirect exact from={`${match.url}/`} to={`${match.url}/start`} />
		<Route path={`${match.url}/start`} component={start} />
		<Redirect to="/error" />
	</Switch>
);