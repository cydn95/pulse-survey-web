import React from "react";

import KeyThemesTable from "Components/report/KeyThemes/Table";
import KeyThemesCarousel from "Components/report/KeyThemes/Carousel";

import styles from "./styles.scss";

import { tableData, ownWordsData } from "./dummy";
import { getRandomSubArray } from "Util/Utils";

const OverallSentimentContainer = () => {
  return (
    <div className={styles["keythemes-content-wrapper"]}>
      <div className={styles["keythemes-content-title"]}>Overall Sentiment</div>
      <div className={styles["keythemes-content"]}>
        <KeyThemesCarousel data={getRandomSubArray(ownWordsData, 5)} />
        <KeyThemesCarousel data={getRandomSubArray(ownWordsData, 5)} />
        <KeyThemesCarousel data={getRandomSubArray(ownWordsData, 5)} />
        <KeyThemesCarousel data={getRandomSubArray(ownWordsData, 5)} />
        <KeyThemesCarousel data={getRandomSubArray(ownWordsData, 5)} />
        <KeyThemesCarousel data={getRandomSubArray(ownWordsData, 5)} />
      </div>
    </div>
  );
};

export default OverallSentimentContainer;
