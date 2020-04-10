import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { defaultStartPath } from 'Constants/defaultValues'

import AppLocale from '../lang';
import MainRoute from 'Routes';
import login from 'Routes/login'
import register from 'Routes/register'
import error from 'Routes/error'
import coming from 'Routes/coming'
import forgotPassword from 'Routes/forgot-password'

// Invited
import SetPassword from 'Routes/invite/SetPassword'
import Welcome from 'Routes/invite/Welcome'

import Test from 'Routes/test'

import {
  setMainMenuClassName
} from "Redux/actions";

const InitialPath = ({ component: Component, ...rest, authUser }) =>
	<Route
		{...rest}
		render={props =>
			(authUser && authUser.accessToken !== '' && authUser.accessToken !== null)
				? <Component {...props} />
				: <Redirect
					to={{
						pathname: '/login',
						state: { from: props.location }
					}}
				/>}
	/>;

class App extends Component {
	
	componentDidMount() {
		const { setMainMenuClassName, location } = this.props;
		if (location.pathname.startsWith('/app/dashboard')) {
			setMainMenuClassName('dashboard');
		} else if (location.pathname.startsWith('/app/about-me')) {
			setMainMenuClassName('about-me');
		} else if (location.pathname.startsWith('/app/my-map')) {
			setMainMenuClassName('my-map');
		} else if (location.pathname.startsWith('/app/project-map')) {
			setMainMenuClassName('project-map');
		}
	}

	render() {
		const { location, match, user, locale } = this.props;
		const currentAppLocale = AppLocale[locale];

		if (location.pathname === '/'  || location.pathname==='/app'|| location.pathname==='/app/') {
			return (<Redirect to={defaultStartPath} />);
		}
		return (
				<Fragment>
					<IntlProvider
						locale={currentAppLocale.locale}
						messages={currentAppLocale.messages}
					>
						<Fragment>
						<Switch>
							<InitialPath
								path={`${match.url}app`}
								authUser={user}
								component={MainRoute}
							/>
							<Route path={`/login`} component={login} />
							<Route path={`/register`} component={register} />
							<Route path={`/forgot-password`} component={forgotPassword} />
							<Route path={`/error`} component={error} />
							<Route path={`/coming-soon`} component={coming} />
							<Route path={`/set-password`} component={SetPassword}/>
							<Route path={`/welcome`} component={Welcome} />
							<Route path={`/component-test`} component={Test} />
							<Redirect to="/error" />
						</Switch>	
						</Fragment>
					</IntlProvider>
				</Fragment>
		);
	}
}

const mapStateToProps = ({ authUser, settings }) => {
	const { user } = authUser;
	const { locale } = settings;
	return { user, locale };
};

export default connect(mapStateToProps,{ setMainMenuClassName })(App);