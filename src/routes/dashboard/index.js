import React from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import PropTypes from "prop-types";

import DashboardGeneral from "./general";
import ReportPeople from "./people";
import ReportSentiment from "./sentiment";
import ReportInterest from "./interest";
import ReportEngagement from "./engagement";
import ReportConfidence from "./confidence";
import ReportDriverAnalysis from "./driver-analysis";
import ReportKeyThemes from "./key_themes";
import ReportMatrix from "./matrix";
import AdvisorInsights from "./advisor-insights";

import styles from "./styles.scss";

const Dashboard = ({ history, location, match }) => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.main}>
          <Switch>
            <Route path={`${match.url}/sentiment`} component={ReportSentiment} />
            <Route path={`${match.url}/summary`} component={ReportPeople} />
            {/* <Route path={`${match.url}/engagement`} component={ReportEngagement} /> */}
            <Route path={`${match.url}/interest`} component={ReportInterest} />
            <Route path={`${match.url}/confidence`} component={ReportConfidence} />
            <Route path={`${match.url}/confidence`} component={ReportConfidence} />
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
