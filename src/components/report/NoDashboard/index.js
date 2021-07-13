import React from "react";

import styles from "./styles.scss";

const NoDashboard = () => (
  <div className={styles["no-dashboard-root"]}>
    <img
      src="/assets/img/report/no-dashboard.png"
      className={styles["no-dashboard-image"]}
    />
    <p className={styles["no-dashboard-title"]}>No data yet</p>
    <p className={styles["no-dashboard-text"]}>
      Your dashboard will be visible as soon as 3 people have responded and you
      also provided your responses.
    </p>
  </div>
);

export default NoDashboard;
