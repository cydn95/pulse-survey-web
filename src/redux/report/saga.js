import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  getOverallSentimentAPI,
  getTopPositiveAndNegativeAPI,
  getFeedbackSummaryAPI,
  shgroupListAPI,
  getParticipationAPI,
} from "../../services/axios/api";

import {
  REPORT_OVERALL_SENTIMENT,
  REPORT_TOP_POSITIVE_NEGATIVE,
  REPORT_FEEDBACK_SUMMARY,
  REPORT_PARTICIPATION,
} from "Constants/actionTypes";

import { getCurrentYear, getAverage } from "Util/Utils";
import { controlType, controlTypeText } from "Constants/defaultValues";

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

const getFeedbackSummaryAsync = async (surveyId) =>
  await getFeedbackSummaryAPI(surveyId)
    .then((result) => result)
    .catch((error) => error);

const getParticipationAsync = async (surveyId) =>
  await getParticipationAPI(surveyId)
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
      // callback(result.data);
      const statisticsData = {};

      for (let i = 0; i < result.data.length; i++) {
        const question = result.data[i];
        if (
          question.controlType === controlTypeText(controlType.TEXT) ||
          question.controlType === controlTypeText(controlType.MULTI_TOPICS)
        ) {
          const topicValue = question.topicValue;
          if (topicValue === "") {
            continue;
          }

          if (topicValue in statisticsData) {
            statisticsData.positive += parseFloat(
              question.report.PositiveScore
            ).toFixed(2);
            statisticsData.negative += parseFloat(
              question.report.NegativeScore
            ).toFixed(2);
          } else {
            statisticsData[topicValue] = {
              topicValue: topicValue,
              positive: parseFloat(question.report.PositiveScore).toFixed(2),
              negative: parseFloat(question.report.NegativeScore).toFixed(2),
            };
          }
        }
      }

      const positiveArr = [];
      const negativeArr = [];

      for (const key in statisticsData) {
        positiveArr.push(statisticsData[key]);
        negativeArr.push(statisticsData[key]);
      }

      positiveArr.sort((a, b) => {
        return b.positive - a.positive;
      });

      negativeArr.sort((a, b) => {
        return b.negative - a.negative;
      });

      callback(positiveArr, negativeArr);
    }
  } catch (error) {}
}

function* getFeedbackSummary({ payload }) {
  try {
    const { surveyId, callback } = payload;
    const shGroupResult = yield call(getShGroupListAsync, surveyId);

    if (shGroupResult.status === 200) {
      const shGroupList = [...shGroupResult.data];
      const drivers = [];
      const ret = {};

      const result = yield call(getFeedbackSummaryAsync, surveyId);

      const cultureRet = {};
      const sentimentRet = {};

      const overallTrendsRet = {};

      const currentYear = getCurrentYear();

      if (result.status === 200) {
        for (let i = 0; i < result.data.length; i++) {
          const question = result.data[i];
          const intValue = question.integerValue;

          for (let j = 0; j < question.aoQuestionData.length; j++) {
            const driverName = question.aoQuestionData[j].driver.driverName;

            /* Culture Result Start */
            if (driverName === "Culture") {
              const subDriver = question.aoQuestionData[j].subdriver;
              if (subDriver in cultureRet) {
                cultureRet[subDriver].value += parseInt(
                  question.integerValue,
                  10
                );
                cultureRet[subDriver].count += 1;
              } else {
                cultureRet[subDriver] = {
                  value: parseInt(question.integerValue, 10),
                  count: 1,
                };
              }
            }
            /* Culture Result End */

            /* Sentiment Result Start */
            if (driverName === "Sentiment") {
              const subDriver = question.aoQuestionData[j].subdriver;
              if (subDriver in sentimentRet) {
                sentimentRet[subDriver].value += parseInt(
                  question.integerValue,
                  10
                );
                sentimentRet[subDriver].count += 1;
              } else {
                sentimentRet[subDriver] = {
                  value: parseInt(question.integerValue, 10),
                  count: 1,
                };
              }
            }
            /* Sentiment Result End */

            if (!drivers.includes(driverName)) {
              drivers.push(driverName);
            }

            for (
              let k = 0;
              k < question.aoQuestionData[j].shGroup.length;
              k++
            ) {
              const shGroupId = question.aoQuestionData[j].shGroup[k];
              const filteredShGroupList = shGroupList.filter(
                (sh) => parseInt(sh.id, 10) === parseInt(shGroupId, 10)
              );
              if (filteredShGroupList.length > 0) {
                const shGroupName = filteredShGroupList[0].SHGroupName;

                /* OverallTrend Start */

                const questionUpdatedDate = question.updated_at;
                const questionYear = questionUpdatedDate.split("-")[0];

                if (parseInt(questionYear, 10) === parseInt(currentYear, 10)) {
                  const questionMonth =
                    parseInt(questionUpdatedDate.split("-")[1], 10) - 1;

                  if (!(shGroupName in overallTrendsRet)) {
                    overallTrendsRet[shGroupName] = [
                      { month: 1, value: [] },
                      { month: 2, value: [] },
                      { month: 3, value: [] },
                      { month: 4, value: [] },
                      { month: 5, value: [] },
                      { month: 6, value: [] },
                      { month: 7, value: [] },
                      { month: 8, value: [] },
                      { month: 9, value: [] },
                      { month: 10, value: [] },
                      { month: 11, value: [] },
                      { month: 12, value: [] },
                    ];
                  }

                  overallTrendsRet[shGroupName][questionMonth].value.push(
                    intValue
                  );
                }

                /* OverallTrend End */

                if (shGroupName in ret) {
                  if (driverName in ret[shGroupName]) {
                    ret[shGroupName][driverName].value += parseInt(
                      intValue,
                      10
                    );
                    ret[shGroupName][driverName].count += 1;
                  } else {
                    ret[shGroupName][driverName] = {
                      value: parseInt(intValue, 10),
                      count: 1,
                    };
                  }
                } else {
                  ret[shGroupName] = {
                    [driverName]: {
                      value: parseInt(intValue, 10),
                      count: 1,
                    },
                  };
                }
              }
            }
          }
        }

        const filteredRet = {
          column: ["GROUP"],
          data: [],
        };

        for (let i = 0; i < drivers.length; i++) {
          filteredRet.column.push(drivers[i].toUpperCase());
        }

        for (const key in ret) {
          const row = [];
          row.push(key);

          for (let i = 0; i < drivers.length; i++) {
            if (drivers[i] in ret[key]) {
              row.push(
                parseFloat(
                  ret[key][drivers[i]].value / ret[key][drivers[i]].count
                ).toFixed(2)
              );
            } else {
              row.push(0);
            }
          }

          filteredRet.data.push(row);
        }

        const filteredCulture = [];

        for (const key in cultureRet) {
          filteredCulture.push({
            culture: key,
            result: parseFloat(
              cultureRet[key].value / cultureRet[key].count
            ).toFixed(2),
          });
        }

        const filteredSentiment = [];
        const filteredSentimentKeyList = [];
        for (const key in sentimentRet) {
          filteredSentimentKeyList.push(key);
          filteredSentiment.push([
            {
              name: "Pie1",
              count: parseFloat(
                sentimentRet[key].value / sentimentRet[key].count
              ).toFixed(2),
            },
            {
              name: "Pie2",
              count:
                100 -
                parseFloat(
                  sentimentRet[key].value / sentimentRet[key].count
                ).toFixed(2),
            },
          ]);
        }

        const filteredOverallTrend = [];
        const filteredOverallTrendShGroupList = [];

        for (const key in overallTrendsRet) {
          filteredOverallTrendShGroupList.push(key);

          const temp = [];
          for (let i = 0; i < overallTrendsRet[key].length; i++) {
            temp.push({
              month: overallTrendsRet[key][i].month,
              overall: parseFloat(
                getAverage(overallTrendsRet[key][i].value)
              ).toFixed(2),
            });
          }

          filteredOverallTrend.push(temp);
        }

        callback(
          filteredRet,
          filteredCulture,
          filteredSentiment,
          filteredSentimentKeyList,
          filteredOverallTrend,
          filteredOverallTrendShGroupList
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
      let teamUserCount = 1;

      for (let i = 0; i < result.data.length; i++) {

        allUserCount++;
         if (result.data[i].team !== null) {
           teamUserCount++;
         }

        if (result.data[i].am_total === result.data[i].am_answered) {
          participationRet.completed += 1;

          if (result.data[i].team !== null) {
            teamParticipationRet.completed += 1;
          }
        } else {
          participationRet.awaiting += 1;

          if (result.data[i].team !== null) {
            teamParticipationRet.awaiting += 1;
          }
        }

        if (result.data[i].sendInvite === false) {
          participationRet.notIssued += 1;

          if (result.data[i].team !== null) {
            teamParticipationRet.notIssued += 1;
          }
        }

        if (result.data[i].accept_status === false) {
          participationRet.rejected += 1;

          if (result.data[i].team !== null) {
            teamParticipationRet.rejected += 1;
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

      callback(filteredParticipationRet, filteredTeamParticipationRet, allUserCount, teamUserCount);
    }
  } catch (error) {}
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

export default function* rootSaga() {
  yield all([
    fork(watchGetOverallSentiment),
    fork(watchGetTopPositiveNegative),
    fork(watchGetFeedbackSummary),
    fork(watchGetParticipation),
  ]);
}
