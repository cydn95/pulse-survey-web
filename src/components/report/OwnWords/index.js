import React, { useState } from "react";

import SlideNavigator from "Components/SlideNavigator";

import styles from "./styles.scss";

const OwnWords = ({ data }) => {

  const [step, setStep] = useState(0)

  const onSelect = (position) => {
    setStep(position);
  }

  return (
    <div className={styles["own-words-root"]}>
      <img className={styles.emoji} alt="" src="/assets/img/survey/sentiment-smile.png"/>
      <div className={styles["content"]}>
        <p>{data[step]}</p>
        <SlideNavigator
          onSelect={(position) => onSelect(position)}
          cnt={data.length}
          position={step}
        />
      </div>
      
    </div>
  );
};

export default OwnWords;
