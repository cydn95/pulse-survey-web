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
    donut,
  } = props;

  const handleClick = (e) => {
    if (arrow) {
      onArrowClick(e, stakeholder);
    } else {
      onClick(userId);
    }
  };
  return (
    <div
      onClick={(e) => handleClick(e)}
      className={classnames(styles["avatar-component"], className)}
    >
      <div className={styles.avatar}>
        {donut && (
          <CircularProgressBar
            styles={progressStyles}
            style={progressStyle}
            className={styles.progress}
            percent={userProgress}
          />
        )}
        {profilePicUrl === "" && (
          <FontAwesomeIcon className={styles.icon} icon={faUser} />
        )}
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
        <div className={styles.open}>
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      )}
    </div>
  );
}

AvatarComponent.defaultProps = {
  onClick: () => null,
  // conic gradient vs discrete progress
  userProgress: 0
};

AvatarComponent.propTypes = {
  onClick: PropTypes.func,
  username: PropTypes.string.isRequired,
  profilePicUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  userProgress: PropTypes.number.isRequired,
};

export default AvatarComponent;
