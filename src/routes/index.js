import React, { Component } from 'react';
import { Route, withRouter, Switch,Redirect } from 'react-router-dom';

import TopNav from 'Containers/TopNav'
import Sidebar from 'Containers/Sidebar';

import Survey from './survey';
import MyMap from './mymap';
import Dashboard from './dashboard';

import { connect } from 'react-redux';

import "Assets/css/custom/main.css";
import 'Assets/css/custom/survey.css';
import "Assets/css/custom/dashboard.css";

class MainApp extends Component {

	render() {
		const { match, containerClassnames} = this.props;
		console.log(match.url);
		return (
			<div id="app-container" className={containerClassnames}>
				<TopNav history={this.props.history} />
				<Sidebar/>
				<main>
					<div className="container-fluid">
						<Switch>
							{/* <Route path={`${match.url}/survey`} component={Survey} /> */}
							<Route path={`${match.url}/about-me`} component={Survey} />
							<Route path={`${match.url}/my-map`} component={MyMap} />
								
							{/* <Route path={`${match.url}/welcome`}>
								<Redirect to="/coming-soon" />
							</Route>
							
							</Route>
							<Route path={`${match.url}/project-map`}>
								<Redirect to="/coming-soon" />
							</Route> */}
							
							<Route path={`${match.url}/dashboard`} component={Dashboard} />
								
							<Redirect to="/error" />
						</Switch>
					</div>
				</main>
			</div>
		);
	}
}
const mapStateToProps = ({ menu }) => {
	const { containerClassnames} = menu;
	return { containerClassnames };
  }
  
  export default withRouter(connect(mapStateToProps, {})(MainApp));