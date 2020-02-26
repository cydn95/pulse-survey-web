import React, { useState } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

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

SummaryPanel.defaultProps = {
  className: null,
  data: []
}

SummaryPanel.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.any)
}

export default SummaryPanel;
