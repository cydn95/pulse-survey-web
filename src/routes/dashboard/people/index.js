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

import {
  overallSentiment,
  topPositiveNegative,
  feedbackSummary,
  participation,
} from "Redux/actions";

import TopNav from "Containers/TopNav";

const donutData = [
  { name: "Pie1", count: 0 },
  { name: "Pie2", count: 0 },
  { name: "Pie3", count: 1100 },
  { name: "Pie3", count: 200 },
];

// const sentimentResult = [
//   [
//     { name: "Pie1", count: 35 },
//     { name: "Pie2", count: 65 },
//   ],
//   [
//     { name: "Pie1", count: 45 },
//     { name: "Pie2", count: 55 },
//   ],
//   [
//     { name: "Pie1", count: 20 },
//     { name: "Pie2", count: 80 },
//   ],
//   [
//     { name: "Pie1", count: 70 },
//     { name: "Pie2", count: 30 },
//   ],
//   [
//     { name: "Pie1", count: 64 },
//     { name: "Pie2", count: 36 },
//   ],
// ];

// const summary = {
//   column: [
//     "GROUP",
//     "ENGAGEMENT",
//     "INFLUENCE",
//     "INTEREST",
//     "SENTIMENT",
//     "CONFIDENCE",
//   ],
//   data: [
//     ["Team Members Overall", 7.2, 2.2, 6.0, 6.0, 7.9],
//     ["Stakeholder Overall", 3.1, 8.4, 1.8, 4.7, 8.1],
//     ["Most Influential People", 7.2, 2.2, 6.0, 6.0, 7.9],
//     ["Decision Makers", 3.1, 2.2, 6.0, 6.0, 7.9],
//     ["Working on Critical Path", 3.1, 5.2, 1.0, 9.0, 7.9],
//   ],
// };

const lineChartData = [
  [
    { month: 1, overall: 3 },
    { month: 2, overall: 6 },
    { month: 3, overall: 2 },
    { month: 4, overall: 12 },
    { month: 5, overall: 8 },
    { month: 6, overall: 3 },
    { month: 7, overall: 6 },
    { month: 8, overall: 2 },
    { month: 9, overall: 12 },
    { month: 10, overall: 8 },
    { month: 11, overall: 3 },
    { month: 12, overall: 6 },
  ],
  [
    { month: 1, overall: 7 },
    { month: 2, overall: 9 },
    { month: 3, overall: 2 },
    { month: 4, overall: -4 },
    { month: 5, overall: 9 },
    { month: 6, overall: 11 },
    { month: 7, overall: 5 },
    { month: 8, overall: 5 },
    { month: 9, overall: 12 },
    { month: 10, overall: 5 },
    { month: 11, overall: 4 },
    { month: 12, overall: 1 },
  ],
];

// const positive = [
//   "Working on Critical Path",
//   "Safety",
//   "Acme Ltd",
//   "Electical",
//   "Engineering Team",
// ];

// const negative = [
//   "Working on Critical Path",
//   "Safety",
//   "Acme Ltd",
//   "Electical",
//   "Engineering Team",
// ];

// const cultureResult = [
//   { culture: "Safe to Speak", result: 0.8 },
//   { culture: "Planning", result: 0.7 },
//   { culture: "Preparation", result: 0.3 },
//   { culture: "Collaboration", result: 0.9 },
//   { culture: "Workload", result: 0.4 },
//   { culture: "Innovation", result: 0.7 },
//   { culture: "Agility", result: 0.6 },
//   { culture: "Experience", result: 0.5 },
//   { culture: "Diversity", result: 0.8 },
// ];

class ReportPeople extends React.Component {
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
        (participationRet, teamParticipationRet, allUserCount, teamUserCount) => {
          this.setState({
            participationResult: participationRet,
            teamParticipationResult: teamParticipationRet,
            participationCount: allUserCount,
            teamParticipationCount: teamUserCount
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
      teamParticipationCount
    } = this.state;
    // console.log(participationResult);
    // console.log(teamParticipationResult);

    return (
      <div className={styles.root}>
        <div className={styles.topbar}>
          <TopNav history={history} menuTitle="People Dashboard">
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
                <span className={styles["block__title"]}>Paticipation</span>
                <div
                  className={classnames(
                    styles["block__content"],
                    styles.participation
                  )}
                >
                  <div className={styles.donuts}>
                    {participationResult.length > 0 &&
                      teamParticipationResult.length > 0 && (
                        <Participation
                          allData={participationResult}
                          allCount={participationCount}
                          teamData={teamParticipationResult}
                          teamCount={teamParticipationCount}
                        />
                      )}
                  </div>
                  <div className={styles.info}></div>
                </div>
              </div>
              <div className={styles.block}>
                <span className={styles["block__title"]}>Overall Trends</span>
                <div className={styles.content}>
                  <LineChart
                    key="linechart"
                    shGroups={overallTrendKey}
                    data={overallTrendResult}
                    xRange={[1, 12]}
                    yRange={[0, 100]}
                    width={400}
                    height={180}
                    margin={30}
                  />
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.block}>
                <span className={styles["block__title"]}>Feedback Summary</span>
                <div className={styles.content}>
                  <FeedbackSummary data={feedbackSummary} />
                </div>
              </div>
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
              <div className={styles.block}>
                <span className={styles["block__title"]}>Culture Results</span>
                <div className={styles.content}>
                  <CultureResult data={cultureResult} />
                </div>
              </div>
            </div>
          </div>
          <div className={classnames(styles.right)}>
            <div className={classnames("row", styles["donut-container"])}>
              <h2 className={styles.title}>Overall Sentiment</h2>
              <Emoji satisfaction={overallSentiment} />
            </div>
            <div className={classnames("row", styles["sentiment-result"])}>
              <SentimentResult data={sentimentResult} labels={sentimentKey} />
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
})(ReportPeople);
