import React, { useState } from "react";

import styles from "./styles_carousel.scss";
import classnames from "classnames";

const ack = {
  1: "/assets/img/report/tick.png",
  2: "/assets/img/report/lamp.png",
  3: "/assets/img/report/list.png",
  4: "/assets/img/report/messaging.png",
  5: "/assets/img/report/sms.png",
};

const flag = {
  1: "/assets/img/report/identified.png",
  2: "/assets/img/report/id_scan.png",
  3: "/assets/img/report/bomb.png",
  4: "/assets/img/report/close.png",
  5: "/assets/img/report/angry.png",
};

const KeyThemesCarousel = ({ data, text, value, onAck, onLike, onFlag }) => {
  const [flagPanelOpen, setFlagPanelOpen] = useState(false);
  const [ackPanelOpen, setAckPanelOpen] = useState(false);

  return (
    <div className={styles["own-words-root"]}>
      <img
        className={styles.emoji}
        alt=""
        src="/assets/img/survey/sentiment-smile.png"
      />
      <div className={styles["content"]}>
        <p>{text}</p>
        <div className={styles["content-slider-wrapper"]}>
          <div className={styles["content-icons"]}>
            <div className={styles["content-icon"]} onClick={(e) => onLike(1)}>
              <span className={styles["content-icon-title"]}>Like</span>
              <img src="/assets/img/survey/like2.png" height="20" />
              <span className={styles["content-icon-desc"]}>{data.likeCount}</span>
            </div>
            <div className={styles["content-icon"]}>
              <span
                className={styles["content-icon-title"]}
                onClick={(e) => {
                  setFlagPanelOpen(false);
                  setAckPanelOpen(!ackPanelOpen)
                }}
              >
                Acknowledge
              </span>
              <img
                src="/assets/img/survey/star.png"
                height="20"
                onClick={(e) => setAckPanelOpen(!ackPanelOpen)}
              />
              <div
                className={classnames(styles["acknowledge-panel"], {
                  [styles.hide]: !ackPanelOpen,
                })}
              >
                {Object.keys(ack).map((key) => (
                  <img key={`ack_img_${key}`} src={ack[key]} onClick={(e) => onAck(key)} />
                ))}
              </div>
            </div>
            <div className={styles["content-icon"]}>
              <span
                className={styles["content-icon-title"]}
                onClick={(e) => {
                  setAckPanelOpen(false);
                  setFlagPanelOpen(!flagPanelOpen)
                }}
              >
                Flag
              </span>
              <img
                src="/assets/img/survey/flag.png"
                height="20"
                onClick={(e) => setFlagPanelOpen(!flagPanelOpen)}
              />
              <div
                className={classnames(styles["flag-panel"], {
                  [styles.hide]: !flagPanelOpen,
                })}
              >
                {Object.keys(flag).map((key) => (
                  <img key={`flag_img_${key}`} src={flag[key]} onClick={(e) => onFlag(key)}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyThemesCarousel;
