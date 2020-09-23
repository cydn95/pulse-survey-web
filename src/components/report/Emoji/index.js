import React from "react";

import classnames from "classnames";
import styles from "./styles.scss";

const Emoji = ({ satisfaction }) => {
  let emoji = "";

  if (satisfaction === -1) {
    emoji = "/assets/img/emoji/flat.png";
  } else if (satisfaction <= 40) {
    emoji = "/assets/img/emoji/angry.png";
  } else if (satisfaction > 40 && satisfaction <= 50) {
    emoji = "/assets/img/emoji/worry.png";
  } else if (satisfaction > 50 && satisfaction <= 60) {
    emoji = "/assets/img/emoji/flat.png";
  } else if (satisfaction > 60 && satisfaction <= 70) {
    emoji = "/assets/img/emoji/smile.png";
  } else if (satisfaction > 70 && satisfaction <= 80) {
    emoji = "/assets/img/emoji/laugh.png";
  } else {
    emoji = "/assets/img/emoji/satisfy.png";
  }

  const rootStyle = {
    width: 200,
    height: 200,
    background: `url(${emoji}) center center / 100% 100% no-repeat`,
  };

  return (
    <div className={styles["emoji-root"]} style={rootStyle}>
      {satisfaction !== -1 && (
        <div className={styles.percentage}>{satisfaction}%</div>
      )}
    </div>
  );
};

export default Emoji;
