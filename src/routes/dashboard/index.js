import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import ReactLoading from "react-loading";

import DashboardGeneral from "./general";
import ReportSummary from "./summary";
import ReportDriverAnalysis from "./driver-analysis";
import ReportKeyThemes from "./key_themes";
import ReportMatrix from "./matrix";
import AdvisorInsights from "./advisor-insights";

import { checkDashboard } from "Redux/actions";

import styles from "./styles.scss";

const Dashboard = ({
  match,
  surveyId,
  surveyUserId,
  actionCheckDashboard,
  history,
}) => {
  const [dashboardStatus, setDashboardStatus] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      surveyUserId == undefined ||
      surveyUserId == null ||
      surveyUserId <= 0
    ) {
      history.push("/app/project-not-found");
      return;
    }

    setLoading(true);

    actionCheckDashboard(surveyId, surveyUserId, callbackCheckDashboard);
  }, [surveyId, surveyUserId, actionCheckDashboard, history]);

  const callbackCheckDashboard = (result) => {
    setLoading(false);
    console.log(result);
    setDashboardStatus({ ...result });
  };

  return (
    <div className={styles.root}>
      {dashboardStatus === null ? (
        <ReactLoading
          className={styles["loading-bar"]}
          type={"bars"}
          color={"grey"}
        />
      ) : (
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
                component={() => <ReportSummary status={dashboardStatus} />}
              />
              <Redirect to="/error" />
            </Switch>
          </div>
        </div>
      )}
    </div>
  );
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
