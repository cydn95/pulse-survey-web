import React from 'react';
import { Route, withRouter, Switch,Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

import TopNav from 'Containers/TopNav'
import Sidebar from 'Containers/Sidebar';

import Survey from './survey';
import MyMap from './mymap';
import Dashboard from './dashboard';
import Settings from './settings';

import Test from './test';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		width: '100vw',
		minHeight: '100vh',
		flexFlow: 'row wrap'
	},

	sidebar: {
		width: 224,
		height: '100vh'
	},

	container: {
		flex: 1
	},

	topbar: {
		width: '100%',
		height: 79
	},

	main: {
		width: '100%',
		minHeight: 'calc(100% - 79px)'
	}
}));

const MainApp = ({ match, history }) => {
	const classes = useStyles();

	return (
		<div className={ classes.root }>
			<div className={ classes.sidebar }>
				<Sidebar/> 
			</div>
			<div className={ classes.container }>
				<div className={classes.topbar }>
					<TopNav history={ history } />
				</div>
				<div className={ classes.main }>
					<Switch>
						<Route path={`${match.url}/test`} component={Test} />
						<Route path={`${match.url}/about-me`} component={Survey} />
						<Route path={`${match.url}/my-map`} component={MyMap} />
						<Route path={`${match.url}/settings`} component={Settings} />
						<Route path={`${match.url}/dashboard`} component={Dashboard} />
						<Redirect to="/error" />
					</Switch>
				</div>
			</div>
		</div>
	);
};

MainApp.propTypes = {
	match: PropTypes.object,
	history: PropTypes.object
};

export default withRouter(MainApp);
