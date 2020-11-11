import React from "react";
import classnames from "classnames";
import { PropTypes } from "prop-types";

import { SURVEY_COMPLETED } from "Constants/defaultValues";

import styles from "./styles.scss";

// const ProgressLabels = ["Not Started", "In Progress", "Completed"];

function DriverComponent(props) {
  const {
    icon,
    iconAlign,
    className,
    driverId,
    driverName,
    progress,
    onClick,
    selected,
    color,
  } = props;

  // const progressLabel = ProgressLabels[progress];

  const selectedCls = selected ? styles.selected : null;

  const iconAlignCls = iconAlign === "left" ? styles.left : "";

  const getIcon = (path, type) => {
    const pathArr = path.split(".");
    if (pathArr.length < 2) return path;

    let newPath = "";
    for (let i = 0; i < pathArr.length - 1; i++) {
      if (i > 0) {
        newPath += ".";
      }
      newPath += pathArr[i];
    }
    newPath += "-" + type + "." + pathArr[pathArr.length - 1];

    return newPath;
  };

  const iconStyle =
    color === "black"
      ? styles["progress-icon-mobile"]
      : styles["progress-icon"];

  return (
    <div className={styles.wrapper}>
      {progress === SURVEY_COMPLETED && (
        <img className={iconStyle} src="/assets/img/survey/check.png" alt="" />
      )}
      <div
        onClick={() => onClick(driverId)}
        className={classnames(
          styles["driver-component"],
          styles[color],
          iconAlignCls,
          selectedCls,
          className,
          {
            [styles["mobile-finished"]]:
              color === "black" && progress === SURVEY_COMPLETED,
            [styles.finished]:
              color !== "black" && progress === SURVEY_COMPLETED,
            [styles.inprogress]: progress !== SURVEY_COMPLETED,
          }
        )}
      >
        {driverName}
        {/* <img
          src={selected ? getIcon(icon, "light") : getIcon(icon, "dark")}
          alt="icon"
          className={styles.icon}
        />
        <div>
          <div>{driverName}</div>
          <div className={styles.progress}>{progressLabel}</div>
        </div> */}
      </div>
    </div>
  );
}

DriverComponent.defaultProps = {
  onClick: () => null,
  selected: false,
  iconAlign: "top",
  percentage: 0,
};

DriverComponent.propTypes = {
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  iconAlign: PropTypes.string,
  driverId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  driverName: PropTypes.string.isRequired,
  progress: PropTypes.number,
};

export default DriverComponent;
