import React from "react";
import classnames from "classnames";
import { PropTypes } from "prop-types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { 
  faAngleRight, 
} from '@fortawesome/free-solid-svg-icons';

import styles from './styles.scss';

function AvatarComponent(props) {
  const {
    className,
    username,
    description,
    onClick,
  } = props;

  return (
    <div onClick={() => onClick(username)} className={classnames(styles["avatar-component"], className)}>
      <div className={styles.avatar}>
        <img src="/assets/img/profile-pic-l-2.jpg" />
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
}

AvatarComponent.propTypes = {
  onClick: PropTypes.func,
}

export default AvatarComponent;
