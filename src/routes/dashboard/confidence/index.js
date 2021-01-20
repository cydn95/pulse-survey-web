import React from "react";
import { connect } from "react-redux";

import styles from "./styles.scss";

import classnames from "classnames";

import Emoji from "Components/report/Emoji";
import Participation from "Components/report/Participation";
import FeedbackSummary from "Components/report/FeedbackSummary";
import TopSummary from "Components/report/TopSummary";
import CultureResult from "Components/report/CultureResult";
import LineChart from "Components/report/LineChart";
import SentimentResult from "Components/report/SentimentResult";
import HowPeopleFeel from "Components/report/HowPeopleFeel";
import Perception from "Components/report/Perception";

import {
  overallSentiment,
  topPositiveNegative,
  feedbackSummary,
  participation,
} from "Redux/actions";

import TopNav from "Containers/TopNav";

const howPeopleFeelData = [
  {
    key: "Hapiness",
    value: 50,
  },
  {
    key: "Pride",
    value: 30,
  },
  {
    key: "Inclusiveness",
    value: 20,
  },
  {
    key: "Safety",
    value: 90,
  },
  {
    key: "Support",
    value: 15,
  },
  {
    key: "Confidence",
    value: 40,
  },
  {
    key: "Optimism",
    value: 70,
  },
];

class ReportConfidence extends React.Component {
  state = {
    overallSentiment: -1,
    topPositives: [],
    topNegatives: [],
    feedbackSummary: {
      column: [],
      data: [],
    },
    cultureResult: [],
    sentimentResult: [],
    sentimentKey: [],
    overallTrendResult: [],
    overallTrendKey: [],
    participationResult: [],
    teamParticipationResult: [],
    participationCount: 0,
    teamParticipationCount: 0,
  };

  componentDidMount() {
    const {
      surveyId,
      actionOverallSentiment,
      actionTopPositiveNegative,
      actionFeedbackSummary,
      actionParticipation,
    } = this.props;

    if (surveyId) {
      actionOverallSentiment(surveyId, (data) => {
        if (data.length > 0) {
          this.setState({
            overallSentiment: Math.round(data[0].value),
          });
        }
      });

      actionTopPositiveNegative(surveyId, (positive, negative) => {
        this.setState({
          topPositives: [...positive],
          topNegatives: [...negative],
        });
      });

      actionFeedbackSummary(
        surveyId,
        (
          feedbackSummaryRet,
          cultureRet,
          sentimentRet,
          sentimentKey,
          overallTrendRet,
          overallTrendKey
        ) => {
          this.setState({
            feedbackSummary: feedbackSummaryRet,
            cultureResult: cultureRet,
            sentimentResult: sentimentRet,
            sentimentKey: sentimentKey,
            overallTrendResult: overallTrendRet,
            overallTrendKey: overallTrendKey,
          });
        }
      );

      actionParticipation(
        surveyId,
        (
          participationRet,
          teamParticipationRet,
          allUserCount,
          teamUserCount
        ) => {
          this.setState({
            participationResult: participationRet,
            teamParticipationResult: teamParticipationRet,
            participationCount: allUserCount,
            teamParticipationCount: teamUserCount,
          });
        }
      );
    }
  }

  render() {
    const { history, projectTitle } = this.props;
    const {
      overallSentiment,
      topPositives,
      topNegatives,
      feedbackSummary,
      cultureResult,
      sentimentResult,
      sentimentKey,
      overallTrendResult,
      overallTrendKey,
      participationResult,
      teamParticipationResult,
      participationCount,
      teamParticipationCount,
    } = this.state;
    // console.log(participationResult);
    // console.log(teamParticipationResult);

    return (
      <div className={styles.root}>
        <div className={styles.topbar}>
          <TopNav history={history} menuTitle="Sentiment Dashboard">
            <div className={styles.section}>
              <h2 className={styles["page-title"]}>My Profile</h2>
              <h2 className={styles["project-name"]}>{projectTitle}</h2>
            </div>
          </TopNav>
        </div>
        <div className={styles["main-content"]}>
          <div className={styles.left}>
            <div className={styles.row}>
              <div className={styles.block}>
                <span className={styles["block__title"]}>
                  How People Feel Free
                </span>
                <div
                  className={classnames(
                    styles["block__content"],
                  )}
                >
                  <div className={styles.block}>
                    <HowPeopleFeel data={howPeopleFeelData} />
                  </div>
                  <div className={styles.block}>
                    <Perception min={20} max={80} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classnames(styles.right)}>
            <div className={classnames("row", styles["donut-container"])}>
              <h2 className={styles.title}>Overall Trends</h2>
              <LineChart
                key="linechart"
                shGroups={overallTrendKey}
                data={overallTrendResult}
                xRange={[1, 12]}
                yRange={[0, 100]}
                width={600}
                height={220}
                margin={30}
              />
            </div>
            <div className={styles.row}>
              <div className={styles.block}>
                <span className={styles["block__title"]}></span>
                <div className={styles.content}>
                  <div className={styles.row}>
                    <div className={styles.block}>
                      <span className={styles["block__title"]}>
                        Top Positive
                      </span>
                      <div className={styles.content}>
                        <TopSummary data={topPositives} type="positive" />
                      </div>
                    </div>
                    <div className={styles.block}>
                      <span className={styles["block__title"]}>
                        Top Negative
                      </span>
                      <div className={styles.content}>
                        <TopSummary data={topNegatives} type="negative" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  const { projectTitle, surveyId } = authUser;

  return {
    projectTitle,
    surveyId,
  };
};

export default connect(mapStateToProps, {
  actionOverallSentiment: overallSentiment,
  actionTopPositiveNegative: topPositiveNegative,
  actionFeedbackSummary: feedbackSummary,
  actionParticipation: participation,
})(ReportConfidence);
