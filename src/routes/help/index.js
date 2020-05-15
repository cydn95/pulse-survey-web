import React from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import HowToUsePulse from "./how-to-use-pulse";

import styles from "./styles.scss";

import TopNav from "Containers/TopNav";

class Help extends React.Component {
  render() {
    const { history, match } = this.props;
    
    let subMenu = "";
    if (history.location.pathname.includes('/how-to-use-pulse')) {
      subMenu = "How to use Pulse";
    }

    return (
      <div className={styles.root}>
        <div className={styles.topbar}>
          <TopNav history={history} menuTitle={`Help: ${subMenu}`}/>
        </div>
        <div className={styles["main-content"]}>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/how-to-use-pulse`} />
            <Route
              path={`${match.url}/how-to-use-pulse`}
              component={HowToUsePulse}
              history={history}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(Help);
