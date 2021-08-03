import React, { Fragment } from "react";

import styles from "./styles.scss";

/**
 * code
 * 228: amreponse not completed
 * 227: not enough threshcnt
 * 400: no data
 */
const NoDashboard = ({ code }) => {
  return (
    <Fragment>
      {(code.toString() === "400" || code.toString() === "227") && (
        <div className={styles["no-dashboard-root"]}>
          <img
            src="/assets/img/report/no-dashboard.png"
            className={styles["no-dashboard-image"]}
          />
          <p className={styles["no-dashboard-title"]}>Waiting for other users</p>
          <p className={styles["no-dashboard-text"]}>
            Not enough users have responded to ensure<br/>
            anoymity. The dashboards will be visible<br/>
            when at least X users have provided their responses.
          </p>
        </div>
      )}
      {code.toString() === "228" && (
        <div className={styles["no-dashboard-root"]}>
          <img
            src="/assets/img/report/no-amresponse.png"
            className={styles["no-dashboard-image"]}
          />
          <p className={styles["no-dashboard-title"]}>Tell us What you think!</p>
          <p className={styles["no-dashboard-text"]}>
            To view the dashboards, please complete the questions<br/>
            in the AboutMe section!<br/><br/>
            If you can't answer a question, please select "Skip".
          </p>
        </div>
      )}

    </Fragment>
  );
};

export default NoDashboard;
