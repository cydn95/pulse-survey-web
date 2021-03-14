import React from "react";

import classnames from "classnames";
import styles from "./styles.scss";

const Emoji = ({ satisfaction }) => {
  let emoji = "";

  if (satisfaction === -1) {
    emoji = "/assets/img/emoji/flat.png";
  } else if (satisfaction <= 4) {
    emoji = "/assets/img/emoji/angry.png";
  } else if (satisfaction > 4 && satisfaction <= 5) {
    emoji = "/assets/img/emoji/worry.png";
  } else if (satisfaction > 5 && satisfaction <= 6) {
    emoji = "/assets/img/emoji/flat.png";
  } else if (satisfaction > 6 && satisfaction <= 7) {
    emoji = "/assets/img/emoji/smile.png";
  } else if (satisfaction > 7 && satisfaction <= 8) {
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
        <div className={styles.percentage}>{satisfaction}</div>
      )}
    </div>
  );
};

export default Emoji;
