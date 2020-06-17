import React from "react";
import classnames from "classnames";

import styles from "./styles.scss";

function MessageBox(props) {
  const { className, title, subTitle, imageUrl, children } = props;

  return (
    <div className={classnames(styles.main, className)}>
      <div className={styles["content-wrapper"]}>
        <img src={imageUrl} alt=""></img>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles["sub-title"]}>{subTitle}</h2>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

export default MessageBox;
