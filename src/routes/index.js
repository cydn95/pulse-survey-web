import React from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import PropTypes from "prop-types";

import Sidebar from "Containers/Sidebar";
import BottomBar from "Containers/BottomBar";

import AboutMeSurvey from "./about-me";
import MyMap from "./mymap";
import Dashboard from "./dashboard";
import Settings from "./settings";
import Help from "./help";
import ComingSoon from "./coming";
import ProjectNotFound from "./project-not-found";
import Error500 from "./error500";
import Error404 from "./error404";

import MobileTour from "./tour/mobile";

import styles from "./styles.scss";

const MainApp = ({ history, match }) => {

  // const showSideBar = history.location.pathname.includes("/tour") ? false : true;
  const showSideBar = true;
  const showBottomBar = history.location.pathname.includes("/tour")
    ? false
    : true;

  return (
    <div className={styles.root}>
      {showSideBar && (
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
      )}
      {showBottomBar && (
        <div className={styles.bottombar}>
          <BottomBar />
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.main}>
          <Switch>
            <Route path={`${match.url}/about-me`} component={AboutMeSurvey} />
            <Route path={`${match.url}/about-others`} component={MyMap} />
            <Route path={`${match.url}/settings/:tab`} component={Settings} />
            <Route path={`${match.url}/settings`} component={Settings} />
            <Route path={`${match.url}/dashboard`} component={Dashboard} />
            <Route
              path={`${match.url}/my-project/:projectUserId`}
              component={ComingSoon}
            />
            <Route path={`${match.url}/help`} component={Help} />
            <Route path={`${match.url}/tour`} component={MobileTour} />
            <Route
              path={`${match.url}/project-not-found`}
              component={ProjectNotFound}
            />
            <Route path={`${match.url}/comingsoon`} component={ComingSoon} />
            <Route path={`${match.url}/500error`} component={Error500} />
            <Route path={`${match.url}/404error`} component={Error404} />
            <Redirect to="/error" />
          </Switch>
        </div>
      </div>
    </div>
  );
};

MainApp.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(MainApp);
