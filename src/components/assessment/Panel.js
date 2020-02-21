import React, { useState } from "react";
import classnames from "classnames";
import { PropTypes } from "prop-types";

import styles from './styles.scss';
import AssessmentComponent from "./Component";

function SummaryPanel(props) {
  const {
    className,
    data
  } = props;

  return (
    <div className={classnames(styles["summary-panel"], className)}>
      <h2>Assessment Summary</h2>
      {
        data.map(d => (
          <AssessmentComponent
            className={styles["ass-comp"]}
            key={d.driverId}
            onClick={(id) => alert(id)}
            {...d}
          />
        ))
      }
    </div>
  )
}

export default SummaryPanel;

