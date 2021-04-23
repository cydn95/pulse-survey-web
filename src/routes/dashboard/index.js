import React from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import PropTypes from "prop-types";

import DashboardGeneral from "./general";
import ReportSummary from "./summary";
import ReportDriverAnalysis from "./driver-analysis";
import ReportKeyThemes from "./key_themes";
import ReportMatrix from "./matrix";
import AdvisorInsights from "./advisor-insights";

import styles from "./styles.scss";

const Dashboard = ({ match }) => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.main}>
          <Switch>
            <Route path={`${match.url}/summary`} component={ReportSummary} />
            <Route path={`${match.url}/driver-analysis`} component={ReportDriverAnalysis} />
            <Route path={`${match.url}/key-themes`} component={ReportKeyThemes} />
            <Route path={`${match.url}/matrix`} component={ReportMatrix} />
            <Route path={`${match.url}/advisor-insights`} component={AdvisorInsights} />
            <Route path={`${match.url}`} component={DashboardGeneral} />
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
};

export default withRouter(Dashboard);
