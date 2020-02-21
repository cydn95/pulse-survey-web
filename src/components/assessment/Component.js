import React from "react";
import classnames from "classnames";
import { PropTypes } from "prop-types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { 
  faAngleRight, 
} from '@fortawesome/free-solid-svg-icons';

import styles from './styles.scss';

function AssessmentComponent(props) {
  const {
    icon,
    className,
    driverId,
    driverName,
    percentage,
    onClick,
  } = props;

  const percentageLabel = percentage > 80 ? "High": (percentage > 30 ? "Medium": "Low")

  return (
    <div onClick={() => onClick(driverId)} className={classnames(styles["assessment-component"], className)}>
      <div className={styles.icon}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className={styles.info}>
        <div>{driverName}</div>
        <div className={styles[percentageLabel]}>{percentageLabel}</div>
      </div>
      <div className={styles.open}>
        <FontAwesomeIcon icon={faAngleRight} />
      </div>
    </div>
  )
}

AssessmentComponent.defaultProps = {
  onClick: () => null,
}

AssessmentComponent.propTypes = {
  onClick: PropTypes.func,
}

export default AssessmentComponent;
