import React, { useState, useEffect } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";

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

import DialogTourView from "Components/DialogTourView";
import MobileTour from "./tour/mobile";
import Tooltip from "./tour/tooltip";

import styles from "./styles.scss";

const MainApp = ({ history, match }) => {
  const [screenMode, setScreenMode] = useState("desktop");

  const [open, setOpen] = useState(false);
  // const showSideBar = history.location.pathname.includes("/tour") ? false : true;
  const showSideBar = true;
  const showBottomBar = history.location.pathname.includes("/tour")
    ? false
    : true;

  useEffect(() => {
    if (window.innerWidth > 880) {
      setScreenMode("desktop");
    } else {
      setScreenMode("mobile");
    }

    if (!history.location.pathname.includes("/tour")) {
      const tourView = localStorage.getItem("tour");
      if (!tourView) {
        if (isMobile) {
          history.push("/app/tour");
        } else {
          setOpen(true);
        }
        localStorage.setItem("tour", true);
      }
    }
  }, [history.location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        if (window.innerWidth > 880) {
          setScreenMode("desktop");
        } else {
          setScreenMode("mobile");
        }
      }, 250);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const closeTourDialog = () => {
    setOpen(false);
  };

  return (
    <div className={styles.root}>
      {showSideBar && (
        <div className={styles.sidebar}>
          <Sidebar screenMode={screenMode} />
        </div>
      )}
      {showBottomBar && (
        <div className={styles.bottombar}>
          <BottomBar screenMode={screenMode} />
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
            <Route path={`${match.url}/guide`} component={Tooltip} />
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
      <DialogTourView open={open} onClose={(e) => closeTourDialog()} />
    </div>
  );
};

MainApp.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(MainApp);
