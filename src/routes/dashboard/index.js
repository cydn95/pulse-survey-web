import React from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import PropTypes from "prop-types";

import DashboardGeneral from "./general";
import ReportPeople from "./people";

import styles from "./styles.scss";

const Dashboard = ({ history, location, match }) => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.main}>
          <Switch>
            <Route path={`${match.url}/people`} component={ReportPeople} />
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
