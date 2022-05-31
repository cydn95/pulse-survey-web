import React from "react";

import styles from "./styles.scss";

const Emoji = ({ satisfaction }) => {
  let emoji = "";

  if (satisfaction < 10) {
    emoji = "/assets/img/emoji2/Emoticon10.png";
  } else if (satisfaction < 20) {
    emoji = "/assets/img/emoji2/Emoticon9.png";
  } else if (satisfaction < 30) {
    emoji = "/assets/img/emoji2/Emoticon8.png";
  } else if (satisfaction < 40) {
    emoji = "/assets/img/emoji2/Emoticon7.png";
  } else if (satisfaction < 50) {
    emoji = "/assets/img/emoji2/Emoticon6.png";
  } else if (satisfaction < 60) {
    emoji = "/assets/img/emoji2/Emoticon5.png";
  } else if (satisfaction < 70) {
    emoji = "/assets/img/emoji2/Emoticon4.png";
  } else if (satisfaction < 80) {
    emoji = "/assets/img/emoji2/Emoticon3.png";
  } else if (satisfaction < 90) {
    emoji = "/assets/img/emoji2/Emoticon2.png";
  } else if (satisfaction < 100) {
    emoji = "/assets/img/emoji2/Emoticon1.png";
  } else {
    emoji = "/assets/img/emoji2/Emoticon1.png";
  }

  const rootStyle = {
    // width: 52,
    // height: 52,
    background: `url(${emoji}) center center / 100% 100% no-repeat`,
  };

  return (
    <div className={styles["emoji-root"]} style={rootStyle}>
      {satisfaction !== -1 && (
        <div className={styles.percentage}>{(satisfaction / 10).toFixed(1)}</div>
      )}
    </div>
  );
};

export default Emoji;
