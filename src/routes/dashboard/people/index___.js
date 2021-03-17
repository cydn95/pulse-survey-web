import React, { useState, useEffect } from "react";
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

const ReportPeople = ({
  history,
  projectTitle,
  surveyId,
  surveyUserId,
  actionOverallSentiment,
  actionTopPositiveNegative,
  actionFeedbackSummary,
  actionParticipation,
}) => {
  const [overallSentiment, setOverallSentiment] = useState(-1);
  const [topPositives, setTopPositives] = useState([]);
  const [topNegatives, setTopNegatives] = useState([]);
  const [feedbackSummary, setFeedbackSummary] = useState({
    column: [],
    data: [],
  });
  const [cultureResult, setCultureResult] = useState([]);
  const [sentimentResult, setSentimentResult] = useState([]);
  const [sentimentKey, setSentimentKey] = useState([]);
  const [overallTrendResult, setOverallTrendResult] = useState([]);
  const [overallTrendKey, setOverallTrendKey] = useState([]);
  const [participationResult, setParticipationResult] = useState([]);
  const [teamParticipationResult, setTeamParticipationResult] = useState([]);
  const [participationCount, setParticipationCount] = useState(0);
  const [teamParticipationCount, setTeamParticipationCount] = useState(0);
  const [feedbackSummaryType, setFeedbackSummaryType] = useState(
    FEEDBACK_SUMMARY_SHGROUP
  );

  const [teamList, setTeamList] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);

  const callbackOverallSentiment = (data) => {
    if (data.length > 0) {
      setOverallSentiment(Math.round(data[0].value));
    }
  };

  const callbackTopPositiveNegative = (positive, negative) => {
    setTopPositives(positive);
    setTopNegatives(negative);
  };

  const callbackFeedbackSummary = (
    feedbackSummaryRet,
    cultureRet,
    sentimentRet,
    sentimentKey,
    overallTrendRet,
    overallTrendKey,
    teamList,
    organizationList
  ) => {
    setFeedbackSummary(feedbackSummaryRet);
    setCultureResult(cultureRet);
    setSentimentResult(sentimentRet);
    setSentimentKey(sentimentKey);
    setOverallTrendResult(overallTrendRet);
    setOverallTrendKey(overallTrendKey);
    setTeamList(teamList);
    setOrganizationList(organizationList);
  };

  const callbackParticipation = (
    participationRet,
    teamParticipationRet,
    allUserCount,
    teamUserCount
  ) => {
    setParticipationResult([...participationRet]);
    setTeamParticipationResult([...teamParticipationRet]);
    setParticipationCount(allUserCount);
    setTeamParticipationCount(teamUserCount);
  };

  // useEffect(() => {
  //   if (surveyId) {
  //     actionOverallSentiment(surveyId, callbackOverallSentiment);
  //     actionTopPositiveNegative(surveyId, callbackTopPositiveNegative);
  //     actionFeedbackSummary(
  //       surveyId,
  //       surveyUserId,
  //       feedbackSummaryType,
  //       callbackFeedbackSummary
  //     );
      
  //   }
  // }, []);

  useEffect(() => {
    actionParticipation(surveyId, callbackParticipation);
  }, [actionParticipation, surveyId])

  console.log('all', participationResult, participationCount);
  console.log('team', teamParticipationResult, teamParticipationCount);

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
                {/* <OverallTrend
                  key="linechart"
                  shGroups={overallTrendKey}
                  data={overallTrendResult}
                  xRange={[1, 12]}
                  yRange={[0, 100]}
                  width={400}
                  height={220}
                  margin={30}
                /> */}
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.block} style={{ width: "100%" }}>
              <span className={styles["block__title"]}>Feedback Summary</span>
              <div className={styles.content} style={{ width: "100%" }}>
                {/* <FeedbackSummary data={feedbackSummary} /> */}
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.block}>
              <span className={styles["block__title"]}></span>
              <div className={styles.content}>
                <div className={styles.row}>
                  <div className={styles.block}>
                    <span className={styles["block__title"]}>Top Positive</span>
                    <div className={styles.content}>
                      {/* <TopSummary data={topPositives} type="positive" /> */}
                    </div>
                  </div>
                  <div className={styles.block}>
                    <span className={styles["block__title"]}>Top Negative</span>
                    <div className={styles.content}>
                      {/* <TopSummary data={topNegatives} type="negative" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.block}>
              <span className={styles["block__title"]}>Culture Results</span>
              <div className={styles.content}>
                {/* <CultureResult data={cultureResult} /> */}
              </div>
            </div>
          </div>
        </div>
        <div className={classnames(styles.right)}>
          <div className={classnames("row", styles["donut-container"])}>
            <h2 className={styles.title}>Overall Sentiment</h2>
            {/* <Emoji satisfaction={overallSentiment / 10} /> */}
          </div>
          <div className={classnames("row", styles["sentiment-result"])}>
            {/* <SentimentResult data={sentimentResult} labels={sentimentKey} /> */}
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
  actionOverallSentiment: overallSentiment,
  actionTopPositiveNegative: topPositiveNegative,
  actionFeedbackSummary: feedbackSummary,
  actionParticipation: participation,
})(ReportPeople);
