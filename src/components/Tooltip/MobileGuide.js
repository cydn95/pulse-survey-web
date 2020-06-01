import React from "react";

import styles from "./MobileGuide.scss";
import classnames from "classnames";

const MobileGuide = ({
  continuous,
  index,
  isLastStep,
  step,
  backProps,
  primaryProps,
  skipProps,
  tooltipProps,
}) => {
  return (
    <div className={styles.body} {...tooltipProps}>
      {step.title && <h2 className={styles.title}>{step.title}</h2>}
      {step.content && <div>{step.content}</div>}
      <div className={styles.footer}>
        {!isLastStep && (
          <input
            type="button"
            className={classnames(styles.button, styles.off)}
            {...skipProps}
            value="Turn Off"
          />
        )}
        {/* {index > 0 && (
          <input
            type="button"
            className={styles.button}
            {...backProps}
            value="back"
          />
        )} */}
        <input
          type="button"
          className={styles.button}
          {...primaryProps}
          value={continuous ? "Next" : "Close"}
        />
      </div>
    </div>
  );
};

export default MobileGuide;
