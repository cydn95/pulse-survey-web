import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  getOverallSentimentAPI,
  getTopPositiveAndNegativeAPI,
  getFeedbackSummaryAPI,
  shgroupListAPI,
  getParticipationAPI,
  getWordCloudAPI,
  getAmResponseReportAPI,
  // getAoResponseReportAPI,
  getPerceptionRealityAPI,
  getBubbleChartAPI,
  getMyMatrixAPI,
  getProjectMatrixAPI,
  getTextValueAPI,
  getAcknowledgementAPI,
  postAcknowledgementAPI,
  updateAcknowledgementAPI,
  voteKeyThemesAPI,
  getAmQuestionCntAPI,
  getDriverAnalysisAPI,
  getTotalStakeholderCntAPI,
  advisorAPI,
  checkDashboardStatusAPI,
  getDriverAnalysisCntAPI
} from "../../services/axios/api";

import {
  REPORT_OVERALL_SENTIMENT,
  REPORT_TOP_POSITIVE_NEGATIVE,
  REPORT_FEEDBACK_SUMMARY,
  REPORT_PARTICIPATION,
  REPORT_ENGAGEMENT_TREND,
  REPORT_WORDCLOUD,
  REPORT_SENTIMENT,
  REPORT_PERCEPTION_REALITY,
  REPORT_BUBBLECHART,
  REPORT_MY_MATRIX,
  REPORT_PROJECT_MATRIX,
  REPORT_TEXT_VALUE,
  REPORT_GET_ACKNOWLEDGEMENT,
  REPORT_SET_ACKNOWLEDGEMENT,
  REPORT_VOTE_KEYTHEME,
  REPORT_AMQUESTIONCNT,
  REPORT_ADVISOR,
  REPORT_CHECK_DASHBOARD,
  REPORT_DRIVER_ANALYSIS_CNT
} from "Constants/actionTypes";

import {
  getCurrentYear,
  getAverage,
  arrayAverage,
  randomNumber,
} from "Util/Utils";
import { controlType, controlTypeText } from "Constants/defaultValues";

import {
  getResultForSHGroup,
  getResultForTeam,
  getResultForOrganization,
} from "./dataProcessor";
import {
  getCultureResult,
  getOverallTrends,
  getSentimentResult,
  getFeedbackSummaryByShGroup,
  getFeedbackSummaryByTeamOrOrganization,
} from "./summaryFunctions";
import { driverAnalysisCnt } from "./actions";

const getOverallSentimentAsync = async (surveyId) =>
  await getOverallSentimentAPI(surveyId)
    .then((result) => result)
    .catch((error) => error);

const getTopPositiveNegativeAsync = async (surveyId) =>
  await getTopPositiveAndNegativeAPI(surveyId)
    .then((result) => result)
    .catch((error) => error);

const getShGroupListAsync = async (surveyId) =>
  await shgroupListAPI(surveyId)
    .then((result) => result)
    .catch((error) => error);

const getFeedbackSummaryAsync = async (surveyId, subProjectUser) =>
  await getFeedbackSummaryAPI(surveyId, subProjectUser)
    .then((result) => result)
    .catch((error) => error);

const getParticipationAsync = async (surveyId) =>
  await getParticipationAPI(surveyId)
    .then((result) => result)
    .catch((error) => error);

const getWordCloudAsync = async (surveyId, projectUserId) =>
  await getWordCloudAPI(surveyId, projectUserId)
    .then((result) => result)
    .catch((error) => error);

const getAMQuestionCntAsync = async (surveyId, driverName, projectId, userId) =>
  await getAmQuestionCntAPI(surveyId, driverName, projectId, userId)
    .then((result) => result)
    .catch((error) => error);

const getTotalStakeholderCntAsync = async (surveyId) =>
  await getTotalStakeholderCntAPI(surveyId)
    .then((result) => result)
    .catch((error) => error);

const checkDashboardAsync = async (surveyId, projectUserId) =>
  await checkDashboardStatusAPI(surveyId, projectUserId)
    .then((result) => result)
    .catch((error) => error);

// const getAoReportAsync = async (surveyId, driverName, startDate, endDate) =>
//   await getAoResponseReportAPI(surveyId, driverName)
//     .then((result) => result)
//     .catch((error) => error);

const getAmReportAsync = async (
  surveyId,
  driverName,
  subProjectUser,
  controlType,
  startDate,
  endDate
) =>
  await getAmResponseReportAPI(
    surveyId,
    driverName,
    subProjectUser,
    controlType,
    startDate,
    endDate
  )
    .then((result) => result)
    .catch((error) => error);

const getDriverAnalysisAsync = async (
  surveyId,
  driverName,
  subProjectUser,
  controlType,
  startDate,
  endDate
) =>
  await getDriverAnalysisAPI(
    surveyId,
    driverName,
    subProjectUser,
    controlType,
    startDate,
    endDate
  )
    .then((result) => result)
    .catch((error) => error);

const getDriverAnalysisCntAsync = async (
  surveyId,
  subProjectUser,
  controlType,
  startDate,
  endDate
) =>
  await getDriverAnalysisCntAPI(
    surveyId,
    subProjectUser,
    controlType,
    startDate,
    endDate
  )
    .then((result) => result)
    .catch((error) => error);

const getPerceptionRealityAsync = async (surveyId, projectUserId) =>
  await getPerceptionRealityAPI(surveyId, projectUserId)
    .then((result) => result)
    .catch((error) => error);

const getBubbleChartAsync = async (surveyId, projectUserId) =>
  await getBubbleChartAPI(surveyId, projectUserId)
    .then((result) => result)
    .catch((error) => error);

const getMyMatrixAsync = async (surveyId, projectUserId) =>
  await getMyMatrixAPI(surveyId, projectUserId)
    .then((result) => result)
    .catch((error) => error);

const getProjectMatrixAsync = async (surveyId, projectUserId) =>
  await getProjectMatrixAPI(surveyId, projectUserId)
    .then((result) => result)
    .catch((error) => error);

const getTextValueAsync = async (surveyId, tab, projectUserId) =>
  await getTextValueAPI(surveyId, tab, projectUserId)
    .then((result) => result)
    .catch((error) => error);

const getAcknowledgementAsync = async (responseId, projectUser) =>
  await getAcknowledgementAPI(responseId, projectUser)
    .then((result) => result)
    .catch((error) => error);

const postAcknowledgementAsync = async (data) =>
  await postAcknowledgementAPI(data)
    .then((result) => result)
    .catch((error) => error);

const updateAcknowledgementAsync = async (responseId, data) =>
  await updateAcknowledgementAPI(responseId, data)
    .then((result) => result)
    .catch((error) => error);

const voteKeyThemeAsync = async (voteId, data) =>
  await voteKeyThemesAPI(voteId, data)
    .then((result) => result)
    .catch((error) => error);

const advisorAsync = async (surveyId, projectUserId) =>
  await advisorAPI(surveyId, projectUserId)
    .then((result) => result)
    .catch((error) => error);

function* getOverallSentiment({ payload }) {
  try {
    const { surveyId, callback } = payload;
    const result = yield call(getOverallSentimentAsync, surveyId);

    if (result.status === 200) {
      callback(result.data);
    }
  } catch (error) {}
}

function* getTopPositiveNegative({ payload }) {
  try {
    const { surveyId, callback } = payload;
    const result = yield call(getTopPositiveNegativeAsync, surveyId);

    if (result.status === 200) {
      const positiveArr = [];
      const negativeArr = [];

      if ("topPositive" in result.data) {
        result.data.topPositive.forEach((d) => {
          if (d.length > 1) {
            positiveArr.push({
              topicValue: d[1],
              positive: d[0],
            });
          }
        });
      }

      if ("topNegative" in result.data) {
        result.data.topNegative.forEach((d) => {
          if (d.length > 1) {
            negativeArr.push({
              topicValue: d[1],
              negative: d[0],
            });
          }
        });
      }

      callback(positiveArr, negativeArr);
    }
  } catch (error) {}
}

function* getFeedbackSummary({ payload }) {
  try {
    const { surveyId, subProjectUser, graphType, callback } = payload;

    const shGroupResult = yield call(getShGroupListAsync, surveyId);

    if (shGroupResult.status === 200) {
      const shGroupList = [...shGroupResult.data];
      const result = yield call(
        getFeedbackSummaryAsync,
        surveyId,
        subProjectUser
      );

      const teamList = [];
      const organizationList = [];

      if (result.status === 200) {
        for (let i = 0; i < result.data.length; i++) {
          const data = result.data[i];

          if (!("projectUser" in data)) {
            continue;
          }

          const projectUser = data.projectUser;

          if (!("team" in projectUser) || !("user" in projectUser)) {
            continue;
          }

          const team = projectUser.team;
          const organization = projectUser.user.organization;

          if (teamList.findIndex((t) => t.id === team.id) < 0) {
            teamList.push(team);
          }

          if (organizationList.findIndex((t) => t.id === organization.id) < 0) {
            organizationList.push(organization);
          }
        }

        /**
         * graphType: ShGroup, Team, Organization
         * ShGroup:       group by aoQuestionData.shGroup
         * Team:          group by projectUser.team
         * Organization:  group by projectUser.user.organization
         *
         */
        // const filteredRet =
        //   graphType === "ShGroup"
        //     ? getFeedbackSummaryByShGroup(result.data, shGroupList)
        //     : getFeedbackSummaryByTeamOrOrganization(result.data, graphType);

        const filteredCulture = getCultureResult(result.data);

        const overallTrendData = getOverallTrends(result.data, shGroupList);
        const filteredOverallTrend = overallTrendData.data;
        const filteredOverallTrendShGroupList = overallTrendData.key;

        const sentimentData = getSentimentResult(result.data);
        const filteredSentiment = sentimentData.data;
        const filteredSentimentKeyList = sentimentData.key;

        callback(
          result.data,
          filteredCulture,
          filteredSentiment,
          filteredSentimentKeyList,
          filteredOverallTrend,
          filteredOverallTrendShGroupList,
          teamList,
          organizationList,
          shGroupList
        );
      }
    }
  } catch (error) {}
}

function* getParticipation({ payload }) {
  try {
    const { surveyId, callback } = payload;
    const result = yield call(getParticipationAsync, surveyId);

    if (result.status === 200) {
      const participationRet = {
        notIssued: 0,
        rejected: 0,
        awaiting: 0,
        completed: 0,
      };

      const teamParticipationRet = {
        notIssued: 0,
        rejected: 0,
        awaiting: 0,
        completed: 0,
      };

      let allUserCount = 0;
      let teamUserCount = 0;

      for (let i = 0; i < result.data.length; i++) {
        allUserCount++;
        if (result.data[i].isTeamMember) {
          teamUserCount++;
        }

        if (result.data[i].sendInvite === false) {
          participationRet.notIssued += 1;

          if (result.data[i].isTeamMember) {
            teamParticipationRet.notIssued += 1;
          }

          continue;
        }

        if (result.data[i].accept_status === false) {
          participationRet.rejected += 1;

          if (result.data[i].isTeamMember) {
            teamParticipationRet.rejected += 1;
          }

          continue;
        }

        if (result.data[i].am_total === result.data[i].am_answered) {
          participationRet.completed += 1;

          if (result.data[i].isTeamMember) {
            teamParticipationRet.completed += 1;
          }
        } else {
          participationRet.awaiting += 1;

          if (result.data[i].isTeamMember) {
            teamParticipationRet.awaiting += 1;
          }
        }
      }

      const filteredParticipationRet = [];
      const filteredTeamParticipationRet = [];

      filteredParticipationRet.push(
        ...[
          { name: "Pie1", count: participationRet.notIssued * 100 },
          { name: "Pie2", count: participationRet.rejected * 100 },
          { name: "Pie3", count: participationRet.awaiting * 100 },
          { name: "Pie3", count: participationRet.completed * 100 },
        ]
      );

      filteredTeamParticipationRet.push(
        ...[
          { name: "Pie1", count: teamParticipationRet.notIssued * 100 },
          { name: "Pie2", count: teamParticipationRet.rejected * 100 },
          { name: "Pie3", count: teamParticipationRet.awaiting * 100 },
          { name: "Pie3", count: teamParticipationRet.completed * 100 },
        ]
      );

      callback(
        filteredParticipationRet,
        filteredTeamParticipationRet,
        allUserCount,
        teamUserCount
      );
    }
  } catch (error) {}
}

function* getDriverAnalysisCnt({ payload }) {
  try {
    const {
      surveyId,
      subProjectUser,
      startDate,
      endDate,
      callback,
    } = payload;

    const controlType = "SLIDER";

    const result = yield call(
      getDriverAnalysisCntAsync,
      surveyId,
      subProjectUser,
      controlType,
      startDate,
      endDate
    );

    callback(result.data);

  } catch (error) { }
}

function* getEngagementTrend({ payload }) {
  try {
    const {
      chartType,
      driverName,
      surveyId,
      subProjectUser,
      projectId,
      userId,
      startDate,
      endDate,
      callback,
    } = payload;

    const controlType = "SLIDER";

    const stakeholderCntResult = yield call(
      getTotalStakeholderCntAsync,
      surveyId
    );
    const totalStakeholderCnt = stakeholderCntResult.data.stakeHolderCount;

    const result = yield call(
      getDriverAnalysisAsync,
      surveyId,
      driverName,
      subProjectUser,
      controlType,
      startDate,
      endDate
    );

    if (chartType === "SHGroup") {
      const shGroupResult = yield call(getShGroupListAsync, surveyId);
      const engagementRet = { [driverName]: [], "Response Rate": [] };
      const shGroupList = [...shGroupResult.data];

      shGroupList.forEach((sg) => {
        engagementRet[driverName].push({
          value: sg.SHGroupName,
        });
        engagementRet["Response Rate"].push({ value: 0 });
      });

      const resultData = getResultForSHGroup(shGroupList, result);

      const answerCnt = [];

      Object.keys(resultData).forEach((key) => {
        const data = resultData[key];
        for (let i = 0; i < data.length; i++) {
          answerCnt.push(data[i].stakeholders.length);
        }
      });

      for (let i = 0; i < engagementRet["Response Rate"].length; i++) {
        if (answerCnt[i]) {
          engagementRet["Response Rate"][i].value =
            totalStakeholderCnt === 0
              ? 0
              : Math.round((answerCnt[i] / totalStakeholderCnt) * 100);
        }
      }

      callback({
        shCnt: totalStakeholderCnt,
        data: { ...engagementRet, ...resultData },
      });
    }

    if (chartType === "Team") {
      const teamList = [];
      result.data.forEach((d) => {
        const teamId = d.subProjectUser.team.id;
        const fIndex = teamList.findIndex((t) => t.id === teamId);
        if (fIndex < 0) {
          teamList.push(d.subProjectUser.team);
        }
      });
      const engagementRet = { [driverName]: [], "Response Rate": [] };
      teamList.forEach((t) => {
        engagementRet[driverName].push({
          value: t.name,
        });
        engagementRet["Response Rate"].push({ value: 0 });
      });

      const resultData = getResultForTeam(teamList, result);

      const answerCnt = [];

      Object.keys(resultData).forEach((key) => {
        const data = resultData[key];
        for (let i = 0; i < data.length; i++) {
          answerCnt.push(data[i].stakeholders.length);
        }
      });

      for (let i = 0; i < engagementRet["Response Rate"].length; i++) {
        if (answerCnt[i]) {
          engagementRet["Response Rate"][i].value =
            totalStakeholderCnt === 0
              ? 0
              : Math.round((answerCnt[i] / totalStakeholderCnt) * 100);
        }
      }

      callback({
        shCnt: totalStakeholderCnt,
        data: { ...engagementRet, ...resultData },
      });
    }

    if (chartType === "Organization") {
      const organizationList = [];
      result.data.forEach((d) => {
        const organizationId = d.subProjectUser.user.organization.id;
        const fIndex = organizationList.findIndex(
          (t) => t.id === organizationId
        );
        if (fIndex < 0) {
          organizationList.push(d.subProjectUser.user.organization);
        }
      });

      const engagementRet = { [driverName]: [], "Response Rate": [] };
      organizationList.forEach((t) => {
        engagementRet[driverName].push({
          value: t.name,
        });
        engagementRet["Response Rate"].push({ value: 0 });
      });

      const resultData = getResultForOrganization(organizationList, result);

      const answerCnt = [];

      Object.keys(resultData).forEach((key) => {
        const data = resultData[key];
        for (let i = 0; i < data.length; i++) {
          answerCnt.push(data[i].stakeholders.length);
        }
      });

      for (let i = 0; i < engagementRet["Response Rate"].length; i++) {
        if (answerCnt[i]) {
          engagementRet["Response Rate"][i].value =
            totalStakeholderCnt === 0
              ? 0
              : Math.round((answerCnt[i] / totalStakeholderCnt) * 100);
        }
      }

      callback({
        shCnt: totalStakeholderCnt,
        data: { ...engagementRet, ...resultData },
      });
    }
  } catch (error) {}
}

function* getWordCloud({ payload }) {
  try {
    const { surveyId, projectUserId, callback } = payload;

    const result = yield call(getWordCloudAsync, surveyId, projectUserId);

    if (result.status === 200) {
      const ret = [];

      result.data.forEach((data) => {
        ret.push({ text: data[1], value: data[0] });
      });

      callback(ret);
    }
  } catch (error) {}
}

function* getSentimentReport({ payload }) {
  try {
    const { surveyId, startDate, endDate, callback } = payload;

    const result = yield call(
      getAmReportAsync,
      surveyId,
      "Sentiment",
      startDate,
      endDate
    );

    const subDriverRet = {};

    if (result.status === 200) {
      result.data.forEach((data) => {
        data.amQuestionData.forEach((aq) => {
          if (aq.subdriver in subDriverRet) {
            subDriverRet[aq.subdriver].cnt += 1;
            subDriverRet[aq.subdriver].sum += parseInt(data.integerValue, 10);
          } else {
            subDriverRet[aq.subdriver] = {
              sum: data.integerValue,
              cnt: 1,
            };
          }
        });
      });
    }

    const ret = [];
    Object.keys(subDriverRet).forEach((key) => {
      ret.push({
        key,
        value: subDriverRet[key].sum / subDriverRet[key].cnt,
      });
    });

    callback(ret);
  } catch (error) {}
}

function* getPerceptionReality({ payload }) {
  try {
    const { surveyId, projectUserId, callback } = payload;

    const result = yield call(
      getPerceptionRealityAsync,
      surveyId,
      projectUserId
    );

    const ret = { perception: 0, reality: 0 };

    if (result.status === 200) {
      ret.perception = result.data[0];
      ret.reality = result.data[1];
    }
    callback(ret);
  } catch (error) {}
}

function* getBubbleChart({ payload }) {
  try {
    const { surveyId, projectUserId, callback } = payload;

    const result = yield call(getBubbleChartAsync, surveyId, projectUserId);

    if (result.status === 200) {
      callback(result.data);
    }
  } catch (error) {}
}

function* getMyMatrix({ payload }) {
  try {
    const { surveyId, projectUserId, callback } = payload;

    const result = yield call(getMyMatrixAsync, surveyId, projectUserId);

    if (result.status === 200) {
      callback(result.data);
    }
  } catch (error) {}
}

function* getProjectMatrix({ payload }) {
  try {
    const { surveyId, projectUserId, callback } = payload;

    const result = yield call(getProjectMatrixAsync, surveyId, projectUserId);

    if (result.status === 200) {
      callback(result.data);
    }
  } catch (error) {}
}

function* getTextValue({ payload }) {
  try {
    const { surveyId, tab, projectUserId, callback } = payload;

    const result = yield call(getTextValueAsync, surveyId, tab, projectUserId);

    if (result.status === 200) {
      callback(result.data);
    }
  } catch (error) {}
}

function* setAcknowledgementReport({ payload }) {
  try {
    const { responseId, data, callback } = payload;

    let result = null;

    if (responseId > 0) {
      yield call(updateAcknowledgementAsync, responseId, data);
    } else {
      yield call(postAcknowledgementAsync, data);
    }

    callback();
  } catch (error) {}
}

function* voteKeyThemeReport({ payload }) {
  try {
    const {
      key,
      vote,
      projectUserId,
      voteId,
      surveyId,
      tab,
      callback,
    } = payload;

    const data = {
      keyTheme: key,
      voteValue: vote,
      projectUser: projectUserId,
      survey: surveyId,
      tab,
    };
    yield call(voteKeyThemeAsync, voteId, data);

    callback();
  } catch (error) {}
}

function* getAMQuestionCnt({ payload }) {
  try {
    const { surveyId, driverName, projectId, userId, callback } = payload;

    const result = yield call(
      getAMQuestionCntAsync,
      surveyId,
      driverName,
      projectId,
      userId
    );

    callback(result.data);
  } catch (error) {}
}

function* advisorReport({ payload }) {
  try {
    const { surveyId, projectUserId, callback } = payload;

    const result = yield call(advisorAsync, surveyId, projectUserId);
    callback(result.data);
  } catch (error) {}
}

function* checkDashboard({ payload }) {
  try {
    const { surveyId, projectUserId, callback } = payload;

    const result = yield call(checkDashboardAsync, surveyId, projectUserId);

    callback(result.data);
  } catch (error) { }
}


export function* watchGetOverallSentiment() {
  yield takeEvery(REPORT_OVERALL_SENTIMENT, getOverallSentiment);
}

export function* watchGetTopPositiveNegative() {
  yield takeEvery(REPORT_TOP_POSITIVE_NEGATIVE, getTopPositiveNegative);
}

export function* watchGetFeedbackSummary() {
  yield takeEvery(REPORT_FEEDBACK_SUMMARY, getFeedbackSummary);
}

export function* watchGetParticipation() {
  yield takeEvery(REPORT_PARTICIPATION, getParticipation);
}

export function* watchGetEngagementTrend() {
  yield takeEvery(REPORT_ENGAGEMENT_TREND, getEngagementTrend);
}

export function* watchGetWordCloud() {
  yield takeEvery(REPORT_WORDCLOUD, getWordCloud);
}

export function* watchGetSentimentReport() {
  yield takeEvery(REPORT_SENTIMENT, getSentimentReport);
}

export function* watchGetPerceptionRealityReport() {
  yield takeEvery(REPORT_PERCEPTION_REALITY, getPerceptionReality);
}

export function* watchGetBubbleChartReport() {
  yield takeEvery(REPORT_BUBBLECHART, getBubbleChart);
}

export function* watchGetMyMatrix() {
  yield takeEvery(REPORT_MY_MATRIX, getMyMatrix);
}

export function* watchGetProjectMatrix() {
  yield takeEvery(REPORT_PROJECT_MATRIX, getProjectMatrix);
}

export function* watchGetTextvalue() {
  yield takeEvery(REPORT_TEXT_VALUE, getTextValue);
}

export function* watchSetAcknowledgementReport() {
  yield takeEvery(REPORT_SET_ACKNOWLEDGEMENT, setAcknowledgementReport);
}

export function* watchVoteKeyThemeReport() {
  yield takeEvery(REPORT_VOTE_KEYTHEME, voteKeyThemeReport);
}

export function* watchAMQuestionCnt() {
  yield takeEvery(REPORT_AMQUESTIONCNT, getAMQuestionCnt);
}

export function* watchAdvisorReport() {
  yield takeEvery(REPORT_ADVISOR, advisorReport);
}

export function* watchCheckDashboard() {
  yield takeEvery(REPORT_CHECK_DASHBOARD, checkDashboard);
}

export function* watchDriverAnalysisCnt() {
  yield takeEvery(REPORT_DRIVER_ANALYSIS_CNT, getDriverAnalysisCnt);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetOverallSentiment),
    fork(watchGetTopPositiveNegative),
    fork(watchGetFeedbackSummary),
    fork(watchGetParticipation),
    fork(watchGetEngagementTrend),
    fork(watchDriverAnalysisCnt),
    fork(watchGetWordCloud),
    fork(watchGetSentimentReport),
    fork(watchGetPerceptionRealityReport),
    fork(watchGetBubbleChartReport),
    fork(watchGetMyMatrix),
    fork(watchGetProjectMatrix),
    fork(watchGetTextvalue),
    fork(watchSetAcknowledgementReport),
    fork(watchVoteKeyThemeReport),
    fork(watchAMQuestionCnt),
    fork(watchAdvisorReport),
    fork(watchCheckDashboard)
  ]);
}
