import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  getOverallSentimentAPI,
  getTopPositiveAndNegativeAPI,
  getFeedbackSummaryAPI,
  getOverallTrendsAPI,
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
  getDriverAnalysisCntAPI,
  getKeyThemeMenuCntAPI,
  userListAPI,
  setTagsAPI,
  getAllTagsBySurveyAPI
} from "../../services/axios/api";

// import {} from 'Redux/admin/'

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
  REPORT_DRIVER_ANALYSIS_CNT,
  REPORT_KEYTHEME_MENU_CNT,
  SET_KEYTHEME_TAGS,
  GET_ALL_TAGS_BY_SURVEY,
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
import { driverAnalysisCnt, participation } from "./actions";
import { forEach } from "lodash";

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

const getOverallTrendsAsync = async (surveyId, subProjectUser) =>
  await getOverallTrendsAPI(surveyId, subProjectUser)
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

const getTotalStakeholderCntAsync = async (surveyId, shGroupId, teamId, orgId) =>
  await getTotalStakeholderCntAPI(surveyId, shGroupId, teamId, orgId)
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

const getKeyThemeMenuCntAsync = async (surveyId, projectUserId) =>
  await getKeyThemeMenuCntAPI(surveyId, projectUserId)
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

const setTagsAsync = async (key, tags) =>
  await setTagsAPI(key, tags)
    .then((result) => result)
    .catch((error) => error);
    
const getAllTagsBySurveyAsync = async (survey) =>
  await getAllTagsBySurveyAPI(survey)
    .then((result) => result)
    .catch((error) => error);

function* setKeyThemeTags({ payload }) {
  try {
    const { key, tags, callback } = payload;
    const result = yield call(setTagsAsync, key, tags);

    if (result.status === 200) {
      callback(true);
    }
  } catch (error) { }
}

function* getAllTagsBySurvey({ payload }) {
  try {
    const { survey, callback } = payload;
    const result = yield call(getAllTagsBySurveyAsync, survey);

    if (result.status === 200) {
      callback(true, result.data);
    }
  } catch (error) { }
}

function* getOverallSentiment({ payload }) {
  try {
    const { surveyId, callback } = payload;
    const result = yield call(getOverallSentimentAsync, surveyId);

    if (result.status === 200) {
      callback(result.data);
    }
  } catch (error) { }
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
  } catch (error) { }
}

function* getFeedbackSummary({ payload }) {
  try {
    const { projectId, surveyId, subProjectUser, graphType, callback } = payload;
    const result = yield call(
      getFeedbackSummaryAsync,
      surveyId,
      subProjectUser
    );

    const resultOverallTrends = yield call(
      getOverallTrendsAsync,
      surveyId,
      subProjectUser
    );

    const shGroupResult = yield call(getShGroupListAsync, surveyId);

    if (result.status === 200 && resultOverallTrends.status === 200 && shGroupResult.status === 200) {
      const shGroupList = [...shGroupResult.data];

      const filteredCulture = getCultureResult(result.data);

      const overallTrendData = getOverallTrends(
        resultOverallTrends.data,
        shGroupList,
        projectId,
      );
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
        filteredOverallTrendShGroupList
      );
    }
  } catch (error) { }
}

function* getParticipation({ payload }) {
  try {
    const { surveyId, callback } = payload;
    const result = yield call(getParticipationAsync, surveyId);

    const shGroupResult = yield call(getShGroupListAsync, surveyId);

    if (result.status === 200 && shGroupResult.status === 200) {

      const shGroupList = shGroupResult.data;

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

      // console.log(shGroupList)
      // console.log(result.data)

      let allUserCount = 0;
      let teamUserCount = 0;

      for (let i = 0; i < result.data.length; i++) {
        if (!result.data[i].shType || !result.data[i].shGroup) {
          continue;
        }

        const projectUserShGroupId = result.data[i].shGroup.id;
        const shGroupInfo = shGroupList.filter((item) => item.id === projectUserShGroupId);
        if (shGroupInfo.length === 0) {
          continue;
        }

        const thresholdPercentage = shGroupInfo[0].responsePercent;

        // User Count
        if (result.data[i].shType.shTypeName === "Team Member") {
          teamUserCount++;
          // const totalAnswered = Number(result.data[i].am_answered);
          // const totalQuestion = Number(result.data[i].am_total);
          // if (totalAnswered == 0) {
          //   teamParticipationRet.notIssued += 1;
          // } else {
          //   if (totalAnswered <= Math.floor(totalQuestion * (Number(thresholdPercentage) / 100))) {
          //     teamParticipationRet.awaiting += 1;
          //   } else {
          //     teamParticipationRet.completed += 1;
          //   }
          // }
        }
        if (result.data[i].shType.shTypeName === "Stakeholder") {
          allUserCount++;
          // const totalAnswered = Number(result.data[i].ao_answered);
          // const totalQuestion = Number(result.data[i].ao_total);
          // if (totalAnswered < totalQuestion) {
          //   participationRet.awaiting += 1;
          // } else {
          //   participationRet.completed += 1;
          // }
        }

        if (
          result.data[i].sendInvite === null ||
          result.data[i].sendInvite === false
        ) {
          if (result.data[i].shType.shTypeName === "Team Member") {
            teamParticipationRet.notIssued += 1;
          }

          if (result.data[i].shType.shTypeName === "Stakeholder") {
            participationRet.notIssued += 1;
          }

          continue;
        }

        // if (result.data[i].accept_status === false) {

        //   if (result.data[i].shType.shTypeName === "Team Member") {
        //     teamParticipationRet.rejected += 1;
        //   }

        //   if (result.data[i].shType.shTypeName === "Stakeholder") {
        //     participationRet.rejected += 1;
        //   }

        //   continue;
        // }

        const totalAnswered = Number(result.data[i].am_answered);
        const totalQuestion = Number(result.data[i].am_total);
        if (totalAnswered >= Math.floor(totalQuestion * (Number(thresholdPercentage) / 100))) {
          if (result.data[i].shType.shTypeName === "Team Member") {
            teamParticipationRet.completed += 1;
          }

          if (result.data[i].shType.shTypeName === "Stakeholder") {
            participationRet.completed += 1;
          }
        } else {
          if (result.data[i].shType.shTypeName === "Team Member") {
            teamParticipationRet.awaiting += 1;
          }

          if (result.data[i].shType.shTypeName === "Stakeholder") {
            participationRet.awaiting += 1;
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
  } catch (error) { }
}

function* getDriverAnalysisCnt({ payload }) {
  try {
    const { surveyId, subProjectUser, startDate, endDate, callback } = payload;

    const controlType = "SLIDER";

    const result = yield call(
      getDriverAnalysisCntAsync,
      surveyId,
      subProjectUser,
      controlType,
      startDate,
      endDate
    );

    // console.log('result', result.data)

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
      segments,
      shGroupId,
      teamId,
      orgId,
      callback,
    } = payload;

    const controlType = "SLIDER";

    const stakeholderCntResult = yield call(
      getTotalStakeholderCntAsync,
      surveyId,
    );
    const totalStakeholderCnt = stakeholderCntResult.data;
    // console.log('total sh cnt', totalStakeholderCnt);

    const result = yield call(
      getDriverAnalysisAsync,
      surveyId,
      driverName,
      subProjectUser,
      controlType,
      startDate,
      endDate
    );

    const participationData = yield call(getParticipationAsync, surveyId);
    const shGroupResult2 = yield call(getShGroupListAsync, surveyId);
    const originShGroupList = [...shGroupResult2.data];

    originShGroupList.map(sh => sh.SHGroupName).map(sg => {
      if(!Object.keys(totalStakeholderCnt.shgroup).includes(sg))
        totalStakeholderCnt.shgroup[sg] = 0
    })
    
    // console.log('shgroupsId', shGroupId)
    // console.log('teamId', teamId)
    // console.log('orgId', orgId)
    // console.log('segments', segments)
    if ((segments.shgroups || []).filter(d => d.segmentName.toString() === shGroupId.toString()).length > 0) {
      let data = (segments.shgroups || []).filter(d => d.segmentName.toString() === shGroupId.toString())[0]
      // console.log('data.teams', data)
      if (data.permissionType === 'All Exception') {
        Object.keys(totalStakeholderCnt.shgroup).map(ts => {
          if (data.shGroups.includes(originShGroupList.filter(os => os.SHGroupName === ts)[0].id))
          delete totalStakeholderCnt.shgroup[ts]
        })
        Object.keys(totalStakeholderCnt.team).map(tt => {
          // console.log(tt, data.teams.includes(tt))
          if (data.teams.includes(tt))
            delete totalStakeholderCnt.team[tt]
        })
        Object.keys(totalStakeholderCnt.org).map(to => {
          if (data.organizations.includes(to))
            delete totalStakeholderCnt.org[to]
        })
      }
      if (data.permissionType === 'Only') {
        Object.keys(totalStakeholderCnt.shgroup).map(ts => {
          if (!data.shGroups.includes(originShGroupList.filter(os => os.SHGroupName === ts)[0].id))
            delete totalStakeholderCnt.shgroup[ts]
        })
        Object.keys(totalStakeholderCnt.team).map(tt => {
          if (!data.teams.includes(tt))
            delete totalStakeholderCnt.team[tt]
        })
        Object.keys(totalStakeholderCnt.org).map(to => {
          if (!data.organizations.includes(to))
            delete totalStakeholderCnt.org[to]
        })
      }
    }
    if ((segments.teams || []).filter(d => d.segmentName === teamId).length > 0) {
      let data = (segments.teams || []).filter(d => d.segmentName === teamId)[0]
      if (data.permissionType === 'All Exception') {
        Object.keys(totalStakeholderCnt.shgroup).map(ts => {
          if (data.shGroups.includes(originShGroupList.filter(os => os.SHGroupName === ts)[0].id))
            delete totalStakeholderCnt.shgroup[ts]
        })
        Object.keys(totalStakeholderCnt.team).map(tt => {
          if (data.teams.includes(tt))
            delete totalStakeholderCnt.team[tt]
        })
        Object.keys(totalStakeholderCnt.org).map(to => {
          if (data.organizations.includes(to))
            delete totalStakeholderCnt.org[to]
        })
      }
      if (data.permissionType === 'Only') {
        Object.keys(totalStakeholderCnt.shgroup).map(ts => {
          if (!data.shGroups.includes(originShGroupList.filter(os => os.SHGroupName === ts)[0].id))
            delete totalStakeholderCnt.shgroup[ts]
        })
        Object.keys(totalStakeholderCnt.team).map(tt => {
          if (!data.teams.includes(tt))
            delete totalStakeholderCnt.team[tt]
        })
        Object.keys(totalStakeholderCnt.org).map(to => {
          if (!data.organizations.includes(to))
            delete totalStakeholderCnt.org[to]
        })
      }
    }
    if ((segments.organizations || []).filter(d => d.segmentName === orgId).length > 0) {
      let data = (segments.organizations || []).filter(d => d.segmentName === orgId)[0]
      if (data.permissionType === 'All Exception') {
        Object.keys(totalStakeholderCnt.shgroup).map(ts => {
          if (data.shGroups.includes(originShGroupList.filter(os => os.SHGroupName === ts)[0].id))
            delete totalStakeholderCnt.shgroup[ts]
        })
        Object.keys(totalStakeholderCnt.team).map(tt => {
          if (data.teams.includes(tt))
            delete totalStakeholderCnt.team[tt]
        })
        Object.keys(totalStakeholderCnt.org).map(to => {
          if (data.organizations.includes(to))
            delete totalStakeholderCnt.org[to]
        })
      }
      if (data.permissionType === 'Only') {
        Object.keys(totalStakeholderCnt.shgroup).map(ts => {
          if (!data.shGroups.includes(originShGroupList.filter(os => os.SHGroupName === ts)[0].id))
            delete totalStakeholderCnt.shgroup[ts]
        })
        Object.keys(totalStakeholderCnt.team).map(tt => {
          if (!data.teams.includes(tt))
            delete totalStakeholderCnt.team[tt]
        })
        Object.keys(totalStakeholderCnt.org).map(to => {
          if (!data.organizations.includes(to))
            delete totalStakeholderCnt.org[to]
        })
      }
    }
    // console.log('total sh cnt', totalStakeholderCnt);

    if (chartType === "SHGroup") {

      const shGroupList = [];
      const engagementRet = { [driverName]: [], "Response Rate": [] };

      for (
        let i = 0;
        i < Object.keys(totalStakeholderCnt.shgroup).length;
        i++
      ) {
        const key = Object.keys(totalStakeholderCnt.shgroup)[i];
        shGroupList.push({
          id: key,
          SHGroupName: key,
        });
      }

      shGroupList.sort(function (a, b) {
        var nameA = a.SHGroupName.toUpperCase(); // ignore upper and lowercase
        var nameB = b.SHGroupName.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      })

      originShGroupList.sort(function (a, b) {
        var nameA = a.SHGroupName.toUpperCase(); // ignore upper and lowercase
        var nameB = b.SHGroupName.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      })
      
      // console.log('participation', participationData)

      shGroupList.forEach((sg) => {
        engagementRet[driverName].push({
          value: sg.SHGroupName,
        });
        engagementRet["Response Rate"].push({
          key: sg.SHGroupName,
          stakeholders: [],
          totalCnt:
            participationData.data.filter(ptc => (ptc.shGroup || {}).SHGroupName === sg.SHGroupName).length
          // sg.SHGroupName in totalStakeholderCnt.shgroup
          //   ? totalStakeholderCnt.shgroup[sg.SHGroupName]
          //   : 0,
        });
      });

      // console.log('engagementRet', engagementRet)

      const resultData = getResultForSHGroup(shGroupList, result);

      // console.log('resultData', resultData)
      // console.log('originShGroupList', originShGroupList)

      const answered = []

      shGroupList.map((sh, idx) => {
        participationData.data.map(ptc => {
          if (((ptc.shGroup || {}).SHGroupName === sh.id) && ptc.sendInvite && ((originShGroupList.filter(os => os.SHGroupName === sh.id)[0].responsePercent * ptc.am_total / 100) < ptc.am_answered)) {
            engagementRet["Response Rate"][idx].stakeholders.push(ptc.id)
            if (!answered.includes(ptc.id)) {
              answered.push(ptc.id);
            }
          }
          return ptc;
        })
        return sh;
      })
      // console.log('answered', answered)

      // Object.keys(resultData).forEach((key) => {
      //   const data = resultData[key];
      //   for (let i = 0; i < data.length; i++) {
      //     if ("stakeholders" in data[i]) {
      //       for (let j = 0; j < data[i].stakeholders.length; j++) {
      //         if (
      //           !engagementRet["Response Rate"][i].stakeholders.includes(
      //             data[i].stakeholders[j]
      //           )
      //         ) {
      //           engagementRet["Response Rate"][i].stakeholders.push(
      //             data[i].stakeholders[j]
      //           );
      //         }

      //         // if (!answered.includes(data[i].stakeholders[j])) {
      //         //   answered.push(data[i].stakeholders[j]);
      //         // }
      //       }
      //     }
      //   }
      // });

      callback({
        totalAnswered: answered.length,
        shCnt: totalStakeholderCnt,
        data: { ...engagementRet, ...resultData },
        shGroup: originShGroupList,
      });
    }

    if (chartType === "Team") {
      const teamList = [];

      for (let i = 0; i < Object.keys(totalStakeholderCnt.team).length; i++) {
        const key = Object.keys(totalStakeholderCnt.team)[i];
        teamList.push({
          id: key,
          name: key,
        });
      }
      // result.data.forEach((d) => {
      //   const teamId = d.subProjectUser.team.id;
      //   const fIndex = teamList.findIndex((t) => t.id === teamId);
      //   if (fIndex < 0) {
      //     teamList.push(d.subProjectUser.team);
      //   }
      // });

      const engagementRet = { [driverName]: [], "Response Rate": [] };
      teamList.forEach((t) => {
        engagementRet[driverName].push({
          value: t.name,
        });
        engagementRet["Response Rate"].push({
          key: t.name,
          stakeholders: [],
          totalCnt:
            participationData.data.filter(ptc => ptc.team.name === t.name).length
          // t.name in totalStakeholderCnt.team
          //   ? totalStakeholderCnt.team[t.name]
          //   : 0,
        });
      });

      const resultData = getResultForTeam(teamList, result);

      const answered = [];

      originShGroupList.map((sh, idx) => {
        participationData.data.map(ptc => {
          if (((ptc.shGroup || {}).SHGroupName === sh.SHGroupName) && ptc.sendInvite && ((sh.responsePercent * ptc.am_total / 100) < ptc.am_answered)) {
            // engagementRet["Response Rate"][idx].stakeholders.push(ptc.id)
            engagementRet["Response Rate"].forEach((d, i) => {
              if (d.key === ptc.team.name)
                engagementRet["Response Rate"][i].stakeholders.push(ptc.id)
              if (!answered.includes(ptc.id)) {
                answered.push(ptc.id);
              }
            })
          }
          return ptc;
        })
        return sh;
      })

      // Object.keys(resultData).forEach((key) => {
      //   const data = resultData[key];
      //   for (let i = 0; i < data.length; i++) {
      //     if ("stakeholders" in data[i]) {
      //       for (let j = 0; j < data[i].stakeholders.length; j++) {
      //         if (
      //           !engagementRet["Response Rate"][i].stakeholders.includes(
      //             data[i].stakeholders[j]
      //           )
      //         ) {
      //           engagementRet["Response Rate"][i].stakeholders.push(
      //             data[i].stakeholders[j]
      //           );
      //         }

      //         if (!answered.includes(data[i].stakeholders[j])) {
      //           answered.push(data[i].stakeholders[j]);
      //         }
      //       }
      //     }
      //   }
      // });

      callback({
        totalAnswered: answered.length,
        shCnt: totalStakeholderCnt,
        data: { ...engagementRet, ...resultData },
      });
    }

    if (chartType === "Organization") {
      const organizationList = [];

      for (let i = 0; i < Object.keys(totalStakeholderCnt.org).length; i++) {
        const key = Object.keys(totalStakeholderCnt.org)[i];
        organizationList.push({
          id: key,
          name: key,
        });
      }

      const engagementRet = { [driverName]: [], "Response Rate": [] };
      organizationList.forEach((t) => {
        engagementRet[driverName].push({
          value: t.name,
        });
        engagementRet["Response Rate"].push({
          key: t.name,
          stakeholders: [],
          totalCnt:
            participationData.data.filter(ptc => ptc.projectOrganization === t.name).length
          // t.name in totalStakeholderCnt.org
          //   ? totalStakeholderCnt.org[t.name]
          //   : 0,
        });
      });

      const resultData = getResultForOrganization(organizationList, result);

      const answered = [];

      originShGroupList.map((sh, idx) => {
        participationData.data.map(ptc => {
          if (((ptc.shGroup || {}).SHGroupName === sh.SHGroupName) && ptc.sendInvite && ((sh.responsePercent * ptc.am_total / 100) < ptc.am_answered)) {
            // engagementRet["Response Rate"][idx].stakeholders.push(ptc.id)
            engagementRet["Response Rate"].forEach((d, i) => {
              if (d.key === ptc.projectOrganization)
                engagementRet["Response Rate"][i].stakeholders.push(ptc.id)
              if (!answered.includes(ptc.id)) {
                answered.push(ptc.id);
              }
            })
          }

          return ptc;
        })
        return sh;
      })

      // Object.keys(resultData).forEach((key) => {
      //   const data = resultData[key];
      //   for (let i = 0; i < data.length; i++) {
      //     if ("stakeholders" in data[i]) {
      //       for (let j = 0; j < data[i].stakeholders.length; j++) {
      //         if (
      //           !engagementRet["Response Rate"][i].stakeholders.includes(
      //             data[i].stakeholders[j]
      //           )
      //         ) {
      //           engagementRet["Response Rate"][i].stakeholders.push(
      //             data[i].stakeholders[j]
      //           );
      //         }

      //         if (!answered.includes(data[i].stakeholders[j])) {
      //           answered.push(data[i].stakeholders[j]);
      //         }
      //       }
      //     }
      //   }
      // });

      callback({
        totalAnswered: answered.length,
        shCnt: totalStakeholderCnt,
        data: { ...engagementRet, ...resultData },
      });
    }
  } catch (error) { }
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
  } catch (error) { }
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
  } catch (error) { }
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
  } catch (error) { }
}

function* getBubbleChart({ payload }) {
  try {
    const { surveyId, projectUserId, callback } = payload;

    const result = yield call(getBubbleChartAsync, surveyId, projectUserId);

    if (result.status === 200) {
      callback(result.data);
    }
  } catch (error) { }
}

function* getMyMatrix({ payload }) {
  try {
    const { surveyId, projectUserId, callback } = payload;

    const result = yield call(getMyMatrixAsync, surveyId, projectUserId);

    if (result.status === 200) {
      callback(result.data);
    }
  } catch (error) { }
}

function* getProjectMatrix({ payload }) {
  try {
    const { surveyId, projectUserId, callback } = payload;

    const result = yield call(getProjectMatrixAsync, surveyId, projectUserId);

    if (result.status === 200) {
      callback(result.data);
    }
  } catch (error) { }
}

function* getTextValue({ payload }) {
  try {
    const { surveyId, tab, projectUserId, callback } = payload;

    const result = yield call(getTextValueAsync, surveyId, tab, projectUserId);

    if (result.status === 200) {
      callback(result.data);
    }
  } catch (error) { }
}

function* getKeyThemeMenuCnt({ payload }) {
  try {
    const { surveyId, projectUserId, callback } = payload;

    const result = yield call(getKeyThemeMenuCntAsync, surveyId, projectUserId);

    if (result.status === 200) {
      callback(result.data);
    }
  } catch (error) { }
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
  } catch (error) { }
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
  } catch (error) { }
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
  } catch (error) { }
}

function* advisorReport({ payload }) {
  try {
    const { surveyId, projectUserId, callback } = payload;

    const result = yield call(advisorAsync, surveyId, projectUserId);
    // console.log('result', result.data)
    let detailedData = Object.keys(result.data.detailedData).map(
      (key) => Object.keys(result.data.detailedData[key]).map(
        key2 => {
          return {
            key: key,
            ...result.data.detailedData[key][key2]
          }
        }
      ).sort((a, b) => (a.key === 'positively' || a.key === 'optimistic') ? (b.score - a.score) : (a.score - b.score)))
    callback(result.data, detailedData);
  } catch (error) { }
}

function* checkDashboard({ payload }) {
  try {
    const { surveyId, projectUserId, callback } = payload;

    const result = yield call(checkDashboardAsync, surveyId, projectUserId);
    if (result.data) {
      callback(result.data);
    } else {
      callback({ code: 404 })
    }
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

export function* watchKeyThemeMenuCnt() {
  yield takeEvery(REPORT_KEYTHEME_MENU_CNT, getKeyThemeMenuCnt);
}

export function* watchSetKeyThemTags() {
  yield takeEvery(SET_KEYTHEME_TAGS, setKeyThemeTags);
}

export function* watchGetAllTagsBySurvey() {
  yield takeEvery(GET_ALL_TAGS_BY_SURVEY, getAllTagsBySurvey);
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
    fork(watchCheckDashboard),
    fork(watchKeyThemeMenuCnt),
    fork(watchSetKeyThemTags),
    fork(watchGetAllTagsBySurvey),
  ]);
}