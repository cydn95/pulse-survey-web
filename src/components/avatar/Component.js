import React from "react";
import classnames from "classnames";
import { PropTypes } from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faAngleRight, faUser } from "@fortawesome/free-solid-svg-icons";

import CircularProgressBar from "../circular-progress-bar";

import styles from "./styles.scss";
import progressStyles from "./progressStyles.scss";

function AvatarComponent(props) {
  const {
    className,
    userId,
    username,
    title,
    description,
    onClick,
    profilePicUrl,
    userProgress,
    progressStyle,
    arrow,
    stakeholder,
    onArrowClick,
  } = props;

  return (
    <div
      onClick={() => onClick(userId)}
      className={classnames(styles["avatar-component"], className)}
    >
      <div className={styles.avatar}>
        <CircularProgressBar
          styles={progressStyles}
          style={progressStyle}
          className={styles.progress}
          percent={userProgress}
        />
        {profilePicUrl === "" && <FontAwesomeIcon className={styles.icon} icon={faUser} />}
        {profilePicUrl !== "" && (
          <img src={profilePicUrl} alt={profilePicUrl} />
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.username}>{username}</div>
        <div className={styles.description}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
      {arrow && (
        <div
          className={styles.open}
          onClick={(e) => onArrowClick(e, stakeholder)}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      )}
    </div>
  );
}

AvatarComponent.defaultProps = {
  onClick: () => null,
  // conic gradient vs discrete progress
  progressStyle: "smooth",
};

AvatarComponent.propTypes = {
  onClick: PropTypes.func,
  username: PropTypes.string.isRequired,
  profilePicUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  userProgress: PropTypes.number.isRequired,
  progressStyle: PropTypes.oneOf(["smooth", "discrete"]),
};

export default AvatarComponent;
