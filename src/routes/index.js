import React from 'react';
import { Route, withRouter, Switch,Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';

import TopNav from 'Containers/TopNav'
import Sidebar from 'Containers/Sidebar';
import BottomBar from 'Containers/BottomBar';

import Survey from './survey';
import MyMap from './mymap';
import Dashboard from './dashboard';
import Settings from './settings';
import UserProfile from './userprofile';

import Test from './test';

import styles from './styles.scss';

const MainApp = ({ match, history }) => {

	return (
		<div className={ styles.root }>
			<div className={ styles.sidebar }>
				<Sidebar/> 
			</div>
			<div className={ styles.bottombar }>
				<BottomBar/> 
			</div>
			<div className={ styles.container }>
				<div className={styles.topbar }>
					<TopNav history={ history } />
				</div>
				<div className={ styles.main }>
					<Switch>
						<Route path={`${match.url}/test`} component={Test} />
						<Route path={`${match.url}/about-me`} component={Survey} />
						<Route path={`${match.url}/my-map`} component={MyMap} />
						<Route path={`${match.url}/settings`} component={Settings} />
						<Route path={`${match.url}/dashboard`} component={Dashboard} />
						<Route path={`${match.url}/me`} component={UserProfile} />
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
