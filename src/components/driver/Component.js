import React from "react";
import classnames from "classnames";
import { PropTypes } from "prop-types";

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

  const getIcon = (path, type) => {
    const pathArr = path.split('.');
    if (pathArr.length < 2) return path;

    let newPath = ''
    for (let i = 0; i < pathArr.length - 1; i++) {
      if (i > 0) {
        newPath += '.';
      }
      newPath += pathArr[i];
    }
    newPath += '-' + type + '.' + pathArr[pathArr.length - 1];

    return newPath;
  };

  return (
    <div onClick={() => onClick(driverId)} className={classnames(styles["driver-component"], iconAlignCls, selectedCls, className)}>
      <div>
        <img src={selected ? getIcon(icon, 'light') : getIcon(icon, 'dark')} alt="icon" className={styles.icon}/>
      </div>
      <div>
        <div>{driverName}</div>
        <div>{progressLabel}</div>
      </div>
    </div>
  )
}

DriverComponent.defaultProps = {
  onClick: () => null,
  selected: false,
  iconAlign: "top",
  percentage: 0,
}

DriverComponent.propTypes = {
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  iconAlign: PropTypes.string,
  driverId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  driverName: PropTypes.string.isRequired,
  progress: PropTypes.number,
}

export default DriverComponent;
