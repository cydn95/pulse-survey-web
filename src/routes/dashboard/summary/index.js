import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";

import DatePicker from "react-datepicker";
import ReactLoading from "react-loading";

import TopNav from "Containers/TopNav";
import Emoji from "Components/report/Emoji";
import Participation from "Components/report/Participation";
import CultureResult from "Components/report/CultureResult";
import OverallTrend from "Components/report/OverallTrend";
import SummaryBarChart from "Components/report/SummaryBarChart";
import NoDashboard from "Components/report/NoDashboard";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import {
  overallSentiment,
  topPositiveNegative,
  feedbackSummary,
  participation,
} from "Redux/actions";
import {
  getFeedbackSummaryByShGroup,
  getFeedbackSummaryByTeamOrOrganization,
} from "Redux/report/summaryFunctions";
import { getColorFromValue } from "Util/Utils";

import cn from "classnames";
import styles from "./styles.scss";

const FILTER_SHGROUP = "ShGroup";
const FILTER_TEAM = "Team";
const FILTER_ORGANIZATION = "Organization";

const ReportSummary = ({
  projectTitle,
  projectId,
  surveyId,
  surveyUserId,
  actionOverallSentiment,
  actionTopPositiveNegative,
  actionParticipation,
  actionFeedbackSummary,
  status,
}) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [filter, setFilter] = useState(FILTER_SHGROUP);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [allData, setAllData] = useState([]);
  const [feedbackSummary, setFeedbackSummary] = useState({
    column: [],
    data: [],
  });

  const [overallSentimentLoading, setOverallSentimentLoading] = useState(false);
  const [feedbackSummaryLoading, setFeedbackSummaryLoading] = useState(false);
  const [topPositiveNegativeLoading, setTopPositiveNegativeLoading] = useState(
    false
  );
  const [participationLoading, setParticipationLoading] = useState(false);

  const [overallSentiment, setOverallSentiment] = useState(0);
  const [sentimentKey, setSentimentKey] = useState([]);
  const [sentimentResult, setSentimentResult] = useState([]);

  const [overallTrendKey, setOverallTrendKey] = useState([]);
  const [overallTrendResult, setOverallTrendResult] = useState([]);

  const [participationResult, setParticipationResult] = useState([]);
  const [teamParticipationResult, setTeamParticipationResult] = useState([]);
  const [participationCount, setParticipationCount] = useState(0);
  const [teamParticipationCount, setTeamParticipationCount] = useState(0);

  // const [teamList, setTeamList] = useState([]);
  // const [organizationList, setOrganizationList] = useState([]);
  // const [shGroupList, setShGroupList] = useState([]);

  const [topPositives, setTopPositives] = useState([]);
  const [topNegatives, setTopNegatives] = useState([]);

  const [cultureResult, setCultureResult] = useState([]);

  const callbackFeedbackSummary = (
    feedbackSummaryResultData,
    cultureRet,
    sentimentRet,
    sentimentKey,
    overallTrendRet,
    overallTrendKey,
  ) => {
    setFeedbackSummaryLoading(false);
    const feedbackSummaryRet = getFeedbackSummaryByShGroup(feedbackSummaryResultData,);
    // console.log('overallTrendRet', overallTrendRet)
    // console.log('overallTrendKey', overallTrendKey)
    // setOverallSentiment(Math.round(overallTrendRet.reduce((pre, crr) => pre + crr[crr.length - 1].y, 0) / 2));
    setAllData(feedbackSummaryResultData);
    setFeedbackSummary(feedbackSummaryRet);
    setCultureResult(cultureRet);
    setSentimentKey(sentimentKey);
    setSentimentResult(sentimentRet);
    setOverallTrendResult(overallTrendRet);
    setOverallTrendKey(overallTrendKey);
    // setTeamList(teamList);
    // setOrganizationList(organizationList);
    // setShGroupList(shGroupList);
  };

  const callbackOverallSentiment = (data) => {
    setOverallSentimentLoading(false);
    if (data.length > 0) {
      setOverallSentiment(Math.round(data[0].value));
    }
  };

  const callbackTopPositiveNegative = (positive, negative) => {
    setTopPositiveNegativeLoading(false);
    setTopPositives([...positive]);
    setTopNegatives([...negative]);
  };

  const callbackParticipation = (
    participationRet,
    teamParticipationRet,
    allUserCount,
    teamUserCount
  ) => {
    setParticipationLoading(false);

    // console.log(participationRet, teamParticipationRet, allUserCount, teamUserCount);

    setParticipationResult(participationRet);
    setTeamParticipationResult(teamParticipationRet);
    setParticipationCount(allUserCount);
    setTeamParticipationCount(teamUserCount);
  };

  useEffect(() => {
    setOverallSentimentLoading(true);
    actionOverallSentiment(surveyId, callbackOverallSentiment);

    setTopPositiveNegativeLoading(true);
    actionTopPositiveNegative(surveyId, callbackTopPositiveNegative);

    setParticipationLoading(true);
    actionParticipation(surveyId, callbackParticipation);
  }, [surveyId]);

  useEffect(() => {
    setFeedbackSummaryLoading(true);
    actionFeedbackSummary(
      projectId,
      surveyId,
      surveyUserId,
      FILTER_SHGROUP,
      callbackFeedbackSummary
    );
  }, [surveyId, surveyUserId]);

  const hanleChangeFeedbackSummaryGraph = (type) => {
    const feedbackSummaryRet =
      type === "ShGroup"
        ? getFeedbackSummaryByShGroup(allData)
        : getFeedbackSummaryByTeamOrOrganization(allData, type);

    setFeedbackSummary(feedbackSummaryRet);
  };

  const renderReport = () => {
    if (status.code.toString() !== "200" && status.code.toString() !== "201") {
      return (
        <div className={styles["main-content"]}>
          <NoDashboard code={status.code.toString()} threshold={status.thresholdCnt} />
        </div>
      );
    }

    return (
      <Fragment>
        {/** Filter section start */}
        <div className={styles["filter-bar"]}>
          {/* <div className={styles["filter-bar-datepicker"]}>
            <img
              role="button"
              className={styles["filter-bar-icon"]}
              src="/assets/img/report/calendar.png"
              onClick={(e) => setDatePickerOpen(!datePickerOpen)}
            />
            {datePickerOpen && (
              <div className={styles["filter-bar-datepicker-panel"]}>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  inline
                />
                <div style={{ width: 5 }}></div>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  inline
                />
              </div>
            )}
          </div> */}
          <button
            className={cn(styles["filter-bar-button"], {
              [styles.active]: filter === FILTER_SHGROUP,
            })}
            onClick={(e) => {
              setFilter(FILTER_SHGROUP);
              hanleChangeFeedbackSummaryGraph(FILTER_SHGROUP);
            }}
          >
            SH Group
          </button>
          <button
            className={cn(styles["filter-bar-button"], {
              [styles.active]: filter === FILTER_TEAM,
            })}
            onClick={(e) => {
              setFilter(FILTER_TEAM);
              hanleChangeFeedbackSummaryGraph(FILTER_TEAM);
            }}
          >
            Team
          </button>
          <button
            className={cn(styles["filter-bar-button"], {
              [styles.active]: filter === FILTER_ORGANIZATION,
            })}
            onClick={(e) => {
              setFilter(FILTER_ORGANIZATION);
              hanleChangeFeedbackSummaryGraph(FILTER_ORGANIZATION);
            }}
          >
            Organization
          </button>
        </div>
        {/** Filter section end */}
        {overallSentimentLoading ||
          feedbackSummaryLoading ||
          participationLoading ||
          topPositiveNegativeLoading ? (
          <ReactLoading
            className={styles["summary-analysis-loading"]}
            type={"bars"}
            color={"grey"}
          />
        ) : (
          <Fragment>
            {/** Sentiment Result start */}
            <div className={cn(styles.section, "flex-row-flow")}>
              <div className={styles["section-sentiment"]}>
                <Emoji satisfaction={overallSentiment} />
                <div className={styles["section-sentiment-text"]}>
                  <div>
                    Overall
                    <br />
                    Sentiment
                  </div>
                </div>
              </div>
              {sentimentKey.map((item, index) => {
                let value = sentimentResult[index]
                  ? sentimentResult[index][0].count
                  : 0;

                let text = `${sentimentResult[index]
                  ? sentimentResult[index][0].count % 10 === 0
                    ? sentimentResult[index][0].count / 10
                    : (sentimentResult[index][0].count / 10).toFixed(1)
                  : ""
                  }`;

                if (item === "Overall Sentiment") {
                  value = overallSentiment;
                  text = overallSentiment / 10;
                  return null;
                }

                if (
                  !sentimentResult[index] ||
                  sentimentResult[index][0].count <= 0
                ) {
                  return null;
                }

                return (
                  <div
                    key={`sentiment-result-${item}`}
                    className={styles["section-sentiment"]}
                  >
                    <CircularProgressbar
                      className={styles["section-sentiment-progress"]}
                      value={value}
                      text={text}
                      styles={buildStyles({
                        trailColor: "#ccc",
                        pathColor: getColorFromValue(Number(text)),
                        textSize: "32px",
                      })}
                    />
                    <div
                      className={styles["section-sentiment-text"]}
                      style={{ paddingLeft: 10 }}
                    >
                      <div>{item}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/** Sentiment Result end */}

            {/** Overall Trends Start */}
            <div
              className={cn(styles.section, styles["section-middle"])}
              style={{ padding: 0, width: "100%" }}
            >
              <div className={styles["section-overall-trends"]}>
                <div className={styles["section-title"]}>Overall Trends</div>
                <OverallTrend
                  key="linechart"
                  data={overallTrendResult}
                  xRange={[1, 12]}
                  yRange={[0, 10]}
                  width={400}
                  height={220}
                  margin={30}
                />
              </div>
              <div className={styles["section-top-pos-neg"]}>
                <div className={styles["section-top-pos"]}>
                  <div className={styles.title}>Top positive:</div>
                  {topPositives.map((item, index) => (
                    <div className={styles.text} key={`top-positive-${index}`}>
                      {item.topicValue}
                    </div>
                  ))}
                </div>
                <div className={styles["section-top-neg"]}>
                  <div className={styles.title}>Top negative:</div>
                  {topNegatives.map((item, index) => (
                    <div className={styles.text} key={`top-negative-${index}`}>
                      {item.topicValue}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles["section-participation"]}>
                <div className={styles["section-title"]}>Participation</div>
                <div className={styles["section-participation-container"]}>
                  <div
                    className={styles["section-participation-item"]}
                    style={{
                      background: "#f5f5f5",
                      border: "solid 1px #b9b9b9",
                      color: "#757f88",
                    }}
                  >
                    Not issued
                  </div>
                  <div
                    className={styles["section-participation-item"]}
                    style={{
                      background: "#fdeeee",
                      border: "solid 1px #f16868",
                      color: "#f16868",
                    }}
                  >
                    Rejected
                  </div>
                  <div
                    className={styles["section-participation-item"]}
                    style={{
                      background: "#fff6e7",
                      border: "solid 1px #d18200",
                      color: "#d18200",
                    }}
                  >
                    Awaiting
                  </div>
                  <div
                    className={styles["section-participation-item"]}
                    style={{
                      background: "#e9f7f1",
                      border: "solid 1px #03bdaf",
                      color: "#03bdaf",
                    }}
                  >
                    Completed
                  </div>
                </div>
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
            </div>
            {/** Overall Trends End */}

            {/** Feedback Summary Start */}
            <div className={styles["section-bottom"]}>
              <div className={cn(styles.section, styles["section-feedback"])}>
                <div className={styles["section-title"]}>Feedback Summary</div>
                <SummaryBarChart data={feedbackSummary} />
              </div>
              <div className={cn(styles.section, styles["section-culture"])}>
                <div className={styles["section-title"]}>Culture Results</div>
                <CultureResult data={cultureResult} />
              </div>
            </div>
            {/** Feedback Summary End */}
          </Fragment>
        )}
      </Fragment>
    );
  };

  return (
    <div className={styles.root}>
      <div className={styles.topbar}>
        <TopNav
          history={history}
          menuTitle="Summary"
        >
          <div className={styles.section}>
            <h2 className={styles["page-title"]}>My Profile</h2>
            <h2 className={styles["project-name"]}>{projectTitle}</h2>
          </div>
        </TopNav>
      </div>
      <div className={styles["main-content"]}>{renderReport()}</div>
    </div>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { projectTitle, projectId, surveyId, surveyUserId } = authUser;

  return {
    projectTitle,
    projectId,
    surveyId,
    surveyUserId,
  };
};

export default connect(mapStateToProps, {
  actionOverallSentiment: overallSentiment,
  actionTopPositiveNegative: topPositiveNegative,
  actionFeedbackSummary: feedbackSummary,
  actionParticipation: participation,
})(ReportSummary);
