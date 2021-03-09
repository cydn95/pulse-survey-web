import React, { useState } from "react";

import SlideNavigator from "Components/SlideNavigator";

import styles from "./styles_carousel.scss";

const KeyThemesCarousel = ({ data }) => {
  const [step, setStep] = useState(0);

  const onSelect = (position) => {
    setStep(position);
  };

  return (
    <div className={styles["own-words-root"]}>
      <img
        className={styles.emoji}
        alt=""
        src="/assets/img/survey/sentiment-smile.png"
      />
      <div className={styles["content"]}>
        <p>{data[step]}</p>
        <div className={styles["content-slider-wrapper"]}>
          <div className={styles["content-icons"]}>
            <div className={styles["content-icon"]}>
              <span className={styles["content-icon-title"]}>Like</span>
              <img src="/assets/img/survey/like2.png" height="20" />
              <span className={styles["content-icon-desc"]}>10</span>
            </div>
            <div className={styles["content-icon"]}>
              <span className={styles["content-icon-title"]}>Acknowledges</span>
              <img src="/assets/img/survey/star.png" height="20" />
            </div>
            <div className={styles["content-icon"]}>
              <span className={styles["content-icon-title"]}>Flag</span>
              <img src="/assets/img/survey/flag.png" height="20"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyThemesCarousel;
