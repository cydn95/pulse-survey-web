import React from "react";

import styles from "./styles.scss";

import ReactLoading from "react-loading";

const Loading = ({ description }) => {
  return (
    <div className={styles.root}>
      <ReactLoading type={"bars"} color={"grey"} />
      <h3>{description}</h3>
    </div>
  );
};

export default Loading;
