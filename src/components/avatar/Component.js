import React from "react";
import classnames from "classnames";
import { PropTypes } from "prop-types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { 
  faAngleRight, 
} from '@fortawesome/free-solid-svg-icons';

import CircularProgressBar from "../circular-progress-bar";

import styles from './styles.scss';

function AvatarComponent(props) {
  const {
    className,
    username,
    description,
    onClick,
    profilePicUrl,
    userProgress,
    progressStyle,
  } = props;

  return (
    <div onClick={() => onClick(username)} className={classnames(styles["avatar-component"], className)}>
      <div className={styles.avatar}>
        <CircularProgressBar style={progressStyle} className={styles.progress} percent={userProgress} />
        <img src={profilePicUrl} />
      </div>
      <div className={styles.info}>
        <div className={styles.username}>{username}</div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.open}>
        <FontAwesomeIcon icon={faAngleRight} />
      </div>
    </div>
  )
}

AvatarComponent.defaultProps = {
  onClick: () => null,
  // conic gradient vs discrete progress
  progressStyle: "smooth",
}

AvatarComponent.propTypes = {
  onClick: PropTypes.func,
  username: PropTypes.string.isRequired,
  profilePicUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  userProgress: PropTypes.number.isRequired,
  progressStyle: PropTypes.oneOf(["smooth", "discrete"]),
}

export default AvatarComponent;
