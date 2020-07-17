import React from "react";
import { connect } from "react-redux";

import { updateGuideStatus } from "Redux/actions";

import styles from "./DesktopGuide.scss";
import classnames from "classnames";

const DesktopGuide = ({
  continuous,
  index,
  isLastStep,
  step,
  backProps,
  primaryProps,
  skipProps,
  tooltipProps,
  user,
  actionUpdateGuideStatus,
}) => {
  const handleSkip = () => {
    actionUpdateGuideStatus(user.accessToken, false);
  };
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
            onClick={(e) => handleSkip()}
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

const mapStateToProps = ({ authUser }) => {
  const { user } = authUser;

  return {
    user,
  };
};

export default connect(mapStateToProps, {
  actionUpdateGuideStatus: updateGuideStatus,
})(DesktopGuide);
