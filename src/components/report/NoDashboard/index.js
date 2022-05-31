import React, { Fragment } from "react";

import styles from "./styles.scss";

/**
 * code
 * 228: amreponse not completed
 * 227: not enough threshcnt
 * 400: no data
 */
const NoDashboard = ({ code, threshold = 3 }) => {
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
            Not enough users have responded to ensure<br />
            anonymity. The dashboards will be visible<br />
            when at least {threshold} users have provided their responses.
          </p>
        </div>
      )}
      {code.toString() === "228" && (
        <div className={styles["no-dashboard-root"]}>
          <img
            src="/assets/img/report/no-amresponse.png"
            className={styles["no-dashboard-image"]}
          />
          <p className={styles["no-dashboard-title"]}>Tell us what you think!</p>
          <p className={styles["no-dashboard-text"]}>
            To view the dashboards, please complete the questions<br />
            in the About Me section!<br /><br />
            If you can't answer a question, please select "Skip".
          </p>
        </div>
      )}
      {code.toString() === "404" && (
        <div className={styles["no-dashboard-root"]}>
          <img
            src="/assets/img/report/not-configured.svg"
            className={styles["no-dashboard-image"]}
          />
          <p className={styles["no-dashboard-title"]}>Coming Soon</p>
          <p className={styles["no-dashboard-text"]}>
            Pulse is being configured for this project.  Stay tuned!
          </p>
        </div>
      )}
    </Fragment>
  );
};

export default NoDashboard;
