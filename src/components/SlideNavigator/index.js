import React from "react";

import styles from "./styles.scss";
import classnames from "classnames";

const SlideNavigator = ({ cnt, position, onSelect }) => {
  return (
    <div className={styles.root}>
      {[...new Array(cnt)].map((item, index) => (
        <span key={index} className={classnames(styles.dot, {[styles.active]: index === position})} onClick={e => onSelect(index)}></span>
      ))}
    </div>
  );
};

export default SlideNavigator;
