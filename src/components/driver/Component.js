import React from "react";
import classnames from "classnames";
import { PropTypes } from "prop-types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.scss';

const ProgressLabels = [
  "Not Started",
  "In Progress",
  "Completed"
]

function DriverComponent(props) {
  const {
    icon,
    iconAlign,
    className,
    driverId,
    driverName,
    percentage,
    progress,
    onClick,
    selected,
  } = props;

  const progressLabel = ProgressLabels[progress]
  const percentageLabel = percentage > 80 ? "High": (percentage > 30 ? "Medium": "Low")

  const selectedCls = selected ? styles.selected : null

  const iconAlignCls = iconAlign === 'left' ? styles.left : "";

  return (
    <div onClick={() => onClick(driverId)} className={classnames(styles["driver-component"], iconAlignCls, selectedCls, className)}>
      <div>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div>
        <div>{driverName}</div>
        <div className={styles[percentageLabel]}>{percentageLabel}</div>
        <div>{progressLabel}</div>
      </div>
    </div>
  )
}

DriverComponent.defaultProps = {
  onClick: () => null,
  selected: false,
  iconAlign: "top",
}

DriverComponent.propTypes = {
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  iconAlign: PropTypes.string,
}

export default DriverComponent;
