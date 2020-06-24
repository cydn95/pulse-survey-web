import React from "react";

import styles from "./MobileTooltip.scss";
import classnames from "classnames";

const MobileTooltip = ({ tooltip }) => {
  return (
    <div className={styles.guide}>
      <div className={styles["guide__icon"]}>
        <img
          src={tooltip.img}
          className={classnames(styles["guide__icon__image"])}
          alt=""
        />
      </div>
      <h2 className={styles["guide__title"]}>{tooltip.title}</h2>
      <p className={styles["guide__content"]}>{tooltip.content}</p>
    </div>
  );
};

export default MobileTooltip;
