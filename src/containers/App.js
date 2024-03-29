import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { defaultStartPath } from 'Constants/defaultValues'
import CookieConsent from "react-cookie-consent";

import AppLocale from '../lang';
import MainRoute from 'Routes';
import login from 'Routes/login'
import error from 'Routes/error'
import coming from 'Routes/coming'
import forgotPassword from 'Routes/forgot-password'
import ResetPassword from 'Routes/reset-password'

// Invited
import SetPassword from 'Routes/invite/SetPassword'
import Welcome from 'Routes/invite/Welcome'

import {
	setMainMenuClassName,
	getProfile,
	adminProjectList,
} from "Redux/actions";

const InitialPath = ({ component: Component, authUser, ...rest }) =>
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
		const { setMainMenuClassName, location, user, getProfile } = this.props;
		if (location.pathname.startsWith('/app/dashboard')) {
			setMainMenuClassName('dashboard');
		} else if (location.pathname.startsWith('/app/about-me')) {
			setMainMenuClassName('about-me');
		} else if (location.pathname.startsWith('/app/about-others')) {
			setMainMenuClassName('about-others');
		} else if (location.pathname.startsWith('/app/project-map')) {
			setMainMenuClassName('project-map');
		}
		getProfile(user.userId);
	}

	componentWillReceiveProps(props) {
		const { user, getProfile } = props;
		const { oldUser } = this.props;
		if (!oldUser || user.userId !== oldUser.userId || user.userId > 0) {
			getProfile(user.userId);
		}

		const { setMainMenuClassName, location } = props;
		if (location.pathname !== this.props.location.pathname) {
			if (location.pathname.startsWith('/app/dashboard')) {
				setMainMenuClassName('dashboard');
			} else if (location.pathname.startsWith('/app/about-me')) {
				setMainMenuClassName('about-me');
			} else if (location.pathname.startsWith('/app/about-others')) {
				setMainMenuClassName('about-others');
			} else if (location.pathname.startsWith('/app/project-map')) {
				setMainMenuClassName('project-map');
			}
		}
	}

	render() {
		const { location, match, user, locale } = this.props;
		const currentAppLocale = AppLocale[locale];

		if (location.pathname === '/' || location.pathname === '/app' || location.pathname === '/app/') {
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
							<Route path={`/forgot-password`} component={forgotPassword} />
							<Route path={`/error`} component={error} />
							<Route path={`/coming-soon`} component={coming} />
							<Route path={`/set-password`} component={SetPassword} />
							<Route path={`/reset-password`} component={ResetPassword} />
							<Route path={`/welcome`} component={Welcome} />
							<Redirect to="/error" />
						</Switch>
					</Fragment>
				</IntlProvider>
				<CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
			</Fragment>
		);
	}
}

const mapStateToProps = ({ authUser, settings, menu }) => {
	const { user } = authUser;
	const { locale } = settings;
	const { mainMenuClassName } = menu;
	return { user, locale, mainMenuClassName };
};

export default connect(mapStateToProps, { setMainMenuClassName, getProfile, adminProjectList })(App);