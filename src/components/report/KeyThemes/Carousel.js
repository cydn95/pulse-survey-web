import React, { useMemo } from "react";

import styles from "./styles_carousel.scss";
import classnames from "classnames";

const ack = {
  1: { img: "/assets/img/report/tick.png", title: "Thanks for sharing" },
  2: { img: "/assets/img/report/lamp.png", title: "Great idea" },
  3: { img: "/assets/img/report/list.png", title: "Working on it" },
  4: {
    img: "/assets/img/report/messaging.png",
    title: "Would love to talk in person",
  },
  5: { img: "/assets/img/report/sms.png", title: "I agree" },
};

const flag = {
  1: {
    img: "/assets/img/report/identified.png",
    title: "Individual can be identified",
  },
  2: {
    img: "/assets/img/report/id_scan.png",
    title: "Commenter can be identified",
  },
  3: { img: "/assets/img/report/bomb.png", title: "Non-Constructive Feedback" },
  4: { img: "/assets/img/report/close.png", title: "Out of Policy" },
  5: { img: "/assets/img/report/angry.png", title: "Aggressive or Hostile" },
};

const KeyThemesCarousel = ({
  data,
  text,
  value,
  onAck,
  onLike,
  onFlag,
  flagPanelOpen,
  ackPanelOpen,
  onToggleFlag,
  onToggleAck,
  selectedId,
}) => {
  const likeButtonImage = useMemo(() => {
    if (data.myStatus.length > 0) {
      if (data.myStatus[0].likeStatus === 1) {
        return "/assets/img/survey/like2-solid.png";
      }
    }
    return "/assets/img/survey/like2.png";
  }, [data]);

  const ackButtonImage = useMemo(() => {
    if (data.myStatus.length > 0) {
      if (data.myStatus[0].acknowledgeStatus > 0) {
        return ack[data.myStatus[0].acknowledgeStatus].img;
      }
    }
    return "/assets/img/survey/star.png";
  }, [data]);

  const flagButtonImage = useMemo(() => {
    if (data.myStatus.length > 0) {
      if (data.myStatus[0].flagStatus > 0) {
        return flag[data.myStatus[0].flagStatus].img;
      }
    }
    return "/assets/img/survey/flag.png";
  }, [data]);

  return (
    <div className={styles["own-words-root"]}>
      <img
        className={styles.emoji}
        alt=""
        src="/assets/img/survey/sentiment-smile.png"
      />
      <div className={styles["content"]}>
        <div className={styles["content-a"]}>
          <p>{text}</p>
          <div className={styles["content-slider-wrapper"]}>
            <div className={styles["content-icons"]}>
              <div
                className={styles["content-icon"]}
                onClick={(e) => onLike(1)}
              >
                <span className={styles["content-icon-title"]}>Like</span>
                <img src={likeButtonImage} height="20" />
                <span className={styles["content-icon-desc"]}>
                  {data.likeCount}
                </span>
              </div>
              <div className={styles["content-icon"]}>
                <span
                  className={styles["content-icon-title"]}
                  onClick={(e) => {
                    onToggleFlag();
                    onToggleAck();
                  }}
                >
                  Acknowledge
                </span>
                <img
                  src={ackButtonImage}
                  height="20"
                  onClick={(e) => onToggleAck()}
                />
              </div>
              <div className={styles["content-icon"]}>
                <span
                  className={styles["content-icon-title"]}
                  onClick={(e) => {
                    onToggleAck();
                    onToggleFlag();
                  }}
                >
                  Flag
                </span>
                <img
                  src={flagButtonImage}
                  height="20"
                  onClick={(e) => onToggleFlag()}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles["content-b"]}>
          <div
            className={classnames(styles["acknowledge-panel"], {
              [styles.hide]:
                selectedId !== data.id ||
                (!ackPanelOpen && selectedId === data.id),
            })}
          >
            {Object.keys(ack).map((key, index) => (
              <div
                className={styles["ack-panel-item"]}
                key={`ack_img_${key}`}
                onClick={(e) => {
                  onToggleAck();
                  onAck(key);
                }}
              >
                <div>
                  <img src={ack[key].img} />
                  <small>
                    {index === 0 && `${data.thanksForSharingCount}`}
                    {index === 1 && `${data.greatIdeaCount}`}
                    {index === 2 && `${data.workingOnItCount}`}
                    {index === 3 && `${data.loveToTalkCount}`}
                    {index === 4 && `${data.agreeCount}`}
                  </small>
                </div>
                <span>{ack[key].title}</span>
              </div>
            ))}
          </div>

          <div
            className={classnames(styles["flag-panel"], {
              [styles.hide]:
                selectedId !== data.id ||
                (!flagPanelOpen && selectedId === data.id),
            })}
          >
            {Object.keys(flag).map((key, index) => (
              <div
                className={styles["ack-panel-item"]}
                key={`flag_img_${key}`}
                onClick={(e) => {
                  onToggleFlag();
                  onFlag(key);
                }}
              >
                <div>
                  <img src={flag[key].img} />
                  <small>
                    {index === 0 && `${data.individualCount}`}
                    {index === 1 && `${data.commenterCount}`}
                    {index === 2 && `${data.nonConstructiveCount}`}
                    {index === 3 && `${data.outOfPolicyCount}`}
                    {index === 4 && `${data.aggressiveCount}`}
                  </small>
                </div>
                <span>{flag[key].title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyThemesCarousel;
