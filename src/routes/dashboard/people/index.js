import React from "react";
import { connect } from "react-redux";

import styles from "./styles.scss";

import classnames from "classnames";

import Emoji from "Components/report/Emoji";
import Participation from "Components/report/Participation";
import FeedbackSummary from "Components/report/FeedbackSummary";
import TopSummary from "Components/report/TopSummary";
import CultureResult from "Components/report/CultureResult";
import OverallTrend from "Components/report/OverallTrend";
import SentimentResult from "Components/report/SentimentResult";

import {
  overallSentiment,
  topPositiveNegative,
  feedbackSummary,
  participation,
} from "Redux/actions";

import { getFeedbackSummaryByShGroup, getFeedbackSummaryByTeamOrOrganization } from "Redux/report/summaryFunctions";

import TopNav from "Containers/TopNav";

const participationCategories = [
  {
    text: "Not Issued",
    background: "#263968",
  },
  {
    text: "Rejected",
    background: "#ff0000",
  },
  {
    text: "Awaiting",
    background: "#f1c742",
  },
  {
    text: "Completed",
    background: "#00c855",
  },
];

const FEEDBACK_SUMMARY_SHGROUP = "ShGroup";
const FEEDBACK_SUMMARY_TEAM = "Team";
const FEEDBACK_SUMMARY_ORGANIZATION = "Organization";

const FEEDBACK_SUMMARY_TYPE = [
  FEEDBACK_SUMMARY_SHGROUP,
  FEEDBACK_SUMMARY_TEAM,
  FEEDBACK_SUMMARY_ORGANIZATION,
];

class ReportPeople extends React.Component {
  state = {
    allData: [],
    overallSentiment: 0,
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
    teamList: [],
    organizationList: [],
    shGroupList: []
  };

  callbackFeedbackSummary = (
    feedbackSummaryResultData,
    cultureRet,
    sentimentRet,
    sentimentKey,
    overallTrendRet,
    overallTrendKey,
    teamList,
    organizationList,
    shGroupList
  ) => {

    const feedbackSummaryRet = getFeedbackSummaryByShGroup(feedbackSummaryResultData, shGroupList);

    this.setState({
      allData: feedbackSummaryResultData,
      feedbackSummary: feedbackSummaryRet,
      cultureResult: cultureRet,
      sentimentResult: sentimentRet,
      sentimentKey: sentimentKey,
      overallTrendResult: overallTrendRet,
      overallTrendKey: overallTrendKey,
      teamList,
      organizationList,
      shGroupList
    });
  };
  componentDidMount() {
    const {
      surveyId,
      surveyUserId,
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
        surveyUserId,
        FEEDBACK_SUMMARY_SHGROUP,
        this.callbackFeedbackSummary
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

  hanleChangeFeedbackSummaryGraph = (type) => {
    const { allData, shGroupList } = this.state;

    const feedbackSummaryRet =
      type === "ShGroup"
        ? getFeedbackSummaryByShGroup(allData, shGroupList)
        : getFeedbackSummaryByTeamOrOrganization(allData, type);

    this.setState({
      feedbackSummary: feedbackSummaryRet
    })
  };

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
    // console.log(overallTrendResult);
    // console.log(overallTrendKey);
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
                <span className={styles["block__title"]}>Participation</span>
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
                  <div className={styles.info}>
                    {participationCategories.map((p, index) => (
                      <div
                        key={`info_category_${index}`}
                        className={styles["info__category"]}
                      >
                        <div
                          className={styles["info__category__rect"]}
                          style={{ background: p.background }}
                        >{` `}</div>
                        <span className={styles["info__category__text"]}>
                          {p.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.block}>
                <span className={styles["block__title"]}>Overall Trends</span>
                <div className={styles.content}>
                  <OverallTrend
                    key="linechart"
                    shGroups={overallTrendKey}
                    data={overallTrendResult}
                    xRange={[1, 12]}
                    yRange={[0, 100]}
                    width={400}
                    height={220}
                    margin={30}
                  />
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.block} style={{ width: "100%" }}>
                <span className={styles["block__title"]}>Feedback Summary</span>
                <div className={styles.content} style={{ width: "100%" }}>
                  {FEEDBACK_SUMMARY_TYPE.map((d) => (
                    <button
                      key={`feedback-summary-${d}`}
                      onClick={(e) => this.hanleChangeFeedbackSummaryGraph(d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
                <div className={styles.content} style={{ width: "100%" }}>
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
              <Emoji satisfaction={overallSentiment / 10} />
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
  const { projectTitle, surveyId, surveyUserId } = authUser;

  return {
    projectTitle,
    surveyId,
    surveyUserId,
  };
};

export default connect(mapStateToProps, {
  actionOverallSentiment: overallSentiment,
  actionTopPositiveNegative: topPositiveNegative,
  actionFeedbackSummary: feedbackSummary,
  actionParticipation: participation,
})(ReportPeople);
