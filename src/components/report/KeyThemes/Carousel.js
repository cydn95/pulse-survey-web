import React, { useMemo } from "react";

import styles from "./styles_carousel.scss";
import cn from "classnames";

const ack = {
  5: { img: "/assets/img/report/ack-agree.png", title: "I agree" },
  1: {
    img: "/assets/img/report/ack-thanks-for-sharing.png",
    title: "Thanks for sharing",
  },
  2: { img: "/assets/img/report/ack-great-idea.png", title: "Great idea" },
  3: {
    img: "/assets/img/report/ack-working-on-it.png",
    title: "Working on it",
  },
  4: {
    img: "/assets/img/report/ack-lets-talk-about-it.png",
    title: "Let's talk about it",
  },
  6: {
    img: "/assets/img/report/ack-tell-us-more.png",
    title: "Tell us more",
  },
};

const flag = {
  1: {
    img: "/assets/img/report/flag-individual.png",
    title: "Individual can be identified",
  },
  2: {
    img: "/assets/img/report/flag-commenter.png",
    title: "Commenter can be identified",
  },
  3: { img: "/assets/img/report/flag-non-constructive.png", title: "Non-Constructive Feedback" },
  4: { img: "/assets/img/report/flag-out-of-policy.png", title: "Out of Policy" },
  5: { img: "/assets/img/report/flag-aggressive.png", title: "Aggressive or Hostile" },
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
  const likeButtonActive = useMemo(() => {
    if (data.myStatus.length > 0) {
      if (data.myStatus[0].likeStatus === 1) {
        return {
          status: true,
          icon: "/assets/img/report/btn-like-white.png",
        };
      }
    }
    return {
      status: false,
      icon: "/assets/img/report/btn-like-grey.png",
    };
  }, [data]);

  const ackButtonActive = useMemo(() => {
    if (data.myStatus.length > 0) {
      if (data.myStatus[0].acknowledgeStatus > 0) {
        return {
          status: true,
          text: ack[data.myStatus[0].acknowledgeStatus].title,
          icon: ack[data.myStatus[0].acknowledgeStatus].img,
        };
      }
    }
    return {
      text: "Acknowledge",
      status: false,
      icon: "/assets/img/report/btn-star-grey.png",
    };
  }, [data]);

  const flagButtonActive = useMemo(() => {
    if (data.myStatus.length > 0) {
      if (data.myStatus[0].flagStatus > 0) {
        return {
          status: true,
          text: flag[data.myStatus[0].flagStatus].title,
          icon: flag[data.myStatus[0].flagStatus].img,
        };
      }
    }
    return {
      status: false,
      text: "Flag",
      icon: "/assets/img/report/btn-flag-grey.png",
    };
  }, [data]);

  const emojiImage = useMemo(() => {
    if (data.integerValue < 10) {
      return "/assets/img/emoji2/Emoticon10.png";
    }

    if (data.integerValue < 20) {
      return "/assets/img/emoji2/Emoticon9.png";
    }

    if (data.integerValue < 30) {
      return "/assets/img/emoji2/Emoticon8.png";
    }

    if (data.integerValue < 40) {
      return "/assets/img/emoji2/Emoticon7.png";
    }

    if (data.integerValue < 50) {
      return "/assets/img/emoji2/Emoticon6.png";
    }

    if (data.integerValue < 60) {
      return "/assets/img/emoji2/Emoticon5.png";
    }

    if (data.integerValue < 70) {
      return "/assets/img/emoji2/Emoticon4.png";
    }

    if (data.integerValue < 80) {
      return "/assets/img/emoji2/Emoticon3.png";
    }

    if (data.integerValue < 90) {
      return "/assets/img/emoji2/Emoticon2.png";
    }

    if (data.integerValue < 100) {
      return "/assets/img/emoji2/Emoticon1.png";
    }

    return "/assets/img/emoji2/Emoticon1.png";
  }, [data]);

  return (
    <div className={styles["own-words-root"]}>
      <img className={styles.emoji} alt="" src={emojiImage} />
      <div className={styles.content}>
        <div className={styles.text}>{text}</div>
        <div className={styles.action}>
          {/* Like Button Start */}
          <div className={styles["action-item"]}>
            <div
              role="button"
              className={cn(styles["action-item-btn"], {
                [styles.active]: likeButtonActive.status,
              })}
              onClick={(e) => onLike(1)}
            >
              <span className={styles["action-item-title"]}>Like</span>
              <img
                className={styles["action-item-icon"]}
                src={likeButtonActive.icon}
                height="20"
              />
            </div>
          </div>

          {/* Acknowledge Button Start */}
          <div className={styles["action-item"]}>
            <div
              role="button"
              className={cn(styles["action-item-btn"], {
                [styles.active]: ackButtonActive.status,
              })}
              onClick={(e) => {
                onToggleFlag();
                onToggleAck();
              }}
            >
              <span className={styles["action-item-title"]}>{ackButtonActive.text}</span>
              <img
                className={styles["action-item-icon"]}
                src={ackButtonActive.icon}
                height="20"
              />
            </div>
            <div
              className={cn(styles["action-item-panel"], {
                [styles.hide]:
                  selectedId !== data.id ||
                  (!ackPanelOpen && selectedId === data.id),
              })}
            >
              <div className={styles["action-item-panel-triangle"]}></div>
              <div className={styles["action-item-panel-content"]}>
                {Object.keys(ack).map((key) => (
                  <div
                    className={styles["action-item-panel-item"]}
                    key={`ack_img_${key}`}
                    onClick={(e) => {
                      onToggleAck();
                      onAck(key);
                    }}
                  >
                    <span>{ack[key].title}</span>
                    <img src={ack[key].img} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Flag Button Start */}
          <div className={styles["action-item"]}>
            <div
              role="button"
              className={cn(styles["action-item-btn"], {
                [styles.active]: flagButtonActive.status,
              })}
              onClick={(e) => {
                onToggleAck();
                onToggleFlag();
              }}
            >
              <span className={styles["action-item-title"]}>{flagButtonActive.text}</span>
              <img
                className={styles["action-item-icon"]}
                src={flagButtonActive.icon}
                height="20"
              />
            </div>
            <div
              className={cn(styles["action-item-panel"], {
                [styles.hide]:
                  selectedId !== data.id ||
                  (!flagPanelOpen && selectedId === data.id),
              })}
            >
              <div className={styles["action-item-panel-triangle"]}></div>
              <div className={styles["action-item-panel-content"]}>
                {Object.keys(flag).map((key) => (
                  <div
                    className={styles["action-item-panel-item"]}
                    key={`flag_img_${key}`}
                    onClick={(e) => {
                      onToggleFlag();
                      onFlag(key);
                    }}
                  >
                    <span>{flag[key].title}</span>
                    <img src={flag[key].img} />
                  </div>
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
