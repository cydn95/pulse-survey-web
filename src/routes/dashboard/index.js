import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import PropTypes from "prop-types";

import DashboardGeneral from "./general";
import ReportSummary from "./summary";
import ReportDriverAnalysis from "./driver-analysis";
import ReportKeyThemes from "./key_themes";
import ReportMatrix from "./matrix";
import AdvisorInsights from "./advisor-insights";

import { checkDashboard } from "Redux/actions";

import styles from "./styles.scss";

const Dashboard = ({ match, surveyId, surveyUserId, actionCheckDashboard }) => {
  const [dashboardStatus, setDashboardStatus] = useState(false);

  useEffect(() => {
    actionCheckDashboard(surveyId, surveyUserId, (status) => {
      if (status === "200") {
        setDashboardStatus(true);
      } else {
        setDashboardStatus(false);
      }
    });
  }, [surveyId, surveyUserId, actionCheckDashboard]);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.main}>
          <Switch>
            <Route
              path={`${match.url}/summary`}
              component={() => <ReportSummary status={dashboardStatus} />}
            />
            <Route
              path={`${match.url}/driver-analysis`}
              component={() => (
                <ReportDriverAnalysis status={dashboardStatus} />
              )}
            />
            <Route
              path={`${match.url}/key-themes`}
              component={() => <ReportKeyThemes status={dashboardStatus} />}
            />
            <Route
              path={`${match.url}/matrix`}
              component={() => <ReportMatrix status={dashboardStatus} />}
            />
            <Route
              path={`${match.url}/advisor-insights`}
              component={() => <AdvisorInsights status={dashboardStatus} />}
            />
            <Route
              path={`${match.url}`}
              component={() => <DashboardGeneral status={dashboardStatus} />}
            />
            <Redirect to="/error" />
          </Switch>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  surveyId: PropTypes.string,
  surveyUserId: PropTypes.string,
  actionCheckDashboard: PropTypes.func,
};

const mapStateToProps = ({ authUser }) => {
  const { surveyId, surveyUserId } = authUser;

  return {
    surveyId,
    surveyUserId,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    actionCheckDashboard: checkDashboard,
  })(Dashboard)
);
