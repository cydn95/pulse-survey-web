import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";

import {
  overallSentiment,
  topPositiveNegative,
  feedbackSummary,
  participation,
  wordcloud,
  bubbleChart
} from "Redux/actions";

import { randomFloat } from "Util/Utils";

import BubbleChart from "Components/report/BubbleChart";
import WordCloud from "Components/report/WordCloud";
import Perception from "Components/report/Perception";
import TopSummary from "Components/report/TopSummary";
import TopNav from "Containers/TopNav";

import styles from "./styles.scss";
import classnames from "classnames";

const ReportKeyThemes = ({
  history,
  projectTitle,
  surveyId,
  surveyUserId,
  actionTopPositiveNegative,
  actionWordCloud,
  actionBubbleChart
}) => {
  const [topPositives, setTopPositives] = useState([]);
  const [topNegatives, setTopNegatives] = useState([]);
  const [wordData, setWordData] = useState([]);
  const [bubbleChartData, setBubbleChartData] = useState([]);

  const [chartWidth, setChartWidth] = useState(100);

  useEffect(() => {
    actionTopPositiveNegative(surveyId, (positive, negative) => {
      setTopPositives(positive);
      setTopNegatives(negative);
    });

    actionWordCloud(surveyId, 0, (ret) => {
      setWordData(ret);
    });

    actionBubbleChart(surveyId, surveyUserId, (data) => {
      const resData = [];
      data.forEach((d) => {
        resData.push({
          x: d.point.x - 50,
          y: d.point.y - 50,
          size: randomFloat(3, 8),
          text: d.SHGroupName
        })
      });
      setBubbleChartData(resData);
    });
  }, [actionTopPositiveNegative, actionWordCloud, actionBubbleChart, surveyId, surveyUserId]);

  return (
    <div className={styles.root}>
      <div className={styles.topbar}>
        <TopNav history={history} menuTitle="Interest Dashboard">
          <div className={styles.section}>
            <h2 className={styles["page-title"]}>My Profile</h2>
            <h2 className={styles["project-name"]}>{projectTitle}</h2>
          </div>
        </TopNav>
      </div>
      <div className={styles["main-content"]}>
        <div className={styles["content-row"]}>
          <div
            className={classnames(
              styles["content-col"],
              styles["interest-bubble-chart"]
            )}
          >
            <BubbleChart data={bubbleChartData} />
          </div>
          <div
            className={classnames(
              styles["content-col"],
              styles["interest-word-cloud"]
            )}
            ref={(el) => {
              if (!el) return;

              const width = el.getBoundingClientRect().width;
              setChartWidth(width);
            }}
          >
            <WordCloud chartWidth={chartWidth} data={wordData}/>
          </div>
        </div>
        <div className={styles["content-row"]}>
          <div
            className={classnames(
              styles["content-col"],
              styles["interest-perception"]
            )}
          >
            <Perception min={20} max={80} />
          </div>
          <div
            className={classnames(
              styles["content-col"],
              styles["interest-summary"]
            )}
          >
            <TopSummary data={topPositives} type="positive" />
            <TopSummary data={topNegatives} type="negative" />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { projectTitle, surveyId, surveyUserId } = authUser;

  return {
    projectTitle,
    surveyId,
    surveyUserId,
  };
};

export default connect(mapStateToProps, {
  actionTopPositiveNegative: topPositiveNegative,
  actionWordCloud: wordcloud,
  actionBubbleChart: bubbleChart
})(ReportKeyThemes);
