import React, { useState } from "react";
import classnames from "classnames";
import { PropTypes } from "prop-types";

import styles from './styles.scss';
import AvatarComponent from "./Component";

function AvatarList(props) {
  const {
    className,
    data
  } = props;

  return (
    <div className={classnames(styles["avatar-panel"], className)}>
      {
        data.map(d => (
          <AvatarComponent
            className={styles["avatar-comp"]}
            key={d.username}
            onClick={(username) => alert(username)}
            {...d}
          />
        ))
      }
    </div>
  )
}

export default AvatarList;

