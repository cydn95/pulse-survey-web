import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";

import {
  overallSentiment,
  topPositiveNegative,
  feedbackSummary,
  participation,
  wordcloud,
  bubbleChart,
} from "Redux/actions";

import { randomFloat } from "Util/Utils";

import BubbleChart from "Components/report/BubbleChart";
import WordCloud from "Components/report/WordCloud";
import Perception from "Components/report/Perception";
import TopSummary from "Components/report/TopSummary";
import TopNav from "Containers/TopNav";

import styles from "./styles.scss";
import classnames from "classnames";

import RiskContainer from "./RiskContainer";
import OverallSentimentContainer from "./OverallSentimentContainer";

const tabMenu = {
  "risks": { label: "Risks", component: <RiskContainer tab={1}/> },
  "overall-sentiment": { label: "Overall Sentiment", component: <OverallSentimentContainer tab={2}/> },
  "unspoken-problem": { label: "Unspoken Problem", component: null },
  "project-interest": { label: "Project Interest", component: null },
  "personal-interest": { label: "Personal Interest", component: null },
  "improvement" : { label: "Improvement", component: null }
};

const ReportKeyThemes = ({
  history,
  projectTitle,
  surveyId,
  surveyUserId,
  actionTopPositiveNegative,
  actionWordCloud,
  actionBubbleChart,
}) => {
  const [tab, setTab] = useState("overall-sentiment");

  const [topPositives, setTopPositives] = useState([]);
  const [topNegatives, setTopNegatives] = useState([]);
  const [wordData, setWordData] = useState([]);
  const [bubbleChartData, setBubbleChartData] = useState([]);

  const [chartWidth, setChartWidth] = useState(100);

  const handleSelectTab = (t) => {
    setTab(t);
  }

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
          text: d.SHGroupName,
        });
      });
      setBubbleChartData(resData);
    });
  }, [
    actionTopPositiveNegative,
    actionWordCloud,
    actionBubbleChart,
    surveyId,
    surveyUserId,
  ]);

  return (
    <div className={styles.root}>
      <div className={styles.topbar}>
        <TopNav history={history} menuTitle="KeyThemes">
          <div className={styles.section}>
            <h2 className={styles["page-title"]}>My Profile</h2>
            <h2 className={styles["project-name"]}>{projectTitle}</h2>
          </div>
        </TopNav>
      </div>
      <div className={styles["main-content"]}>
        <div className={styles["keythemes-tab-menu"]}>
          {Object.keys(tabMenu).map((key) => (
            <div
              key={`keythemes-tab-${key}`}
              className={classnames(styles["keythemes-tab-item"], {[styles.active]: key === tab })}
              role="button"
              onClick={(e) => handleSelectTab(key)}
            >
              {tabMenu[key].label}
            </div>
          ))}
        </div>
        {tabMenu[tab].component}
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
  actionBubbleChart: bubbleChart,
})(ReportKeyThemes);
