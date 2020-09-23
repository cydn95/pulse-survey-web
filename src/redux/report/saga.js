import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  getOverallSentimentAPI,
  getTopPositiveAndNegativeAPI,
  getFeedbackSummaryAPI,
  shgroupListAPI,
} from "../../services/axios/api";

import {
  REPORT_OVERALL_SENTIMENT,
  REPORT_TOP_POSITIVE_NEGATIVE,
  REPORT_FEEDBACK_SUMMARY,
} from "Constants/actionTypes";

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

      if (result.status === 200) {
        for (let i = 0; i < result.data.length; i++) {
          const question = result.data[i];
          const intValue = question.integerValue;

          for (let j = 0; j < question.amQuestionData.length; j++) {
            const driverName = question.amQuestionData[j].driver.driverName;

            /* Culture Result Start */
            if (driverName === "Culture") {
              const subDriver = question.amQuestionData[j].subdriver;
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
              const subDriver = question.amQuestionData[j].subdriver;
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
              k < question.amQuestionData[j].shGroup.length;
              k++
            ) {
              const shGroupId = question.amQuestionData[j].shGroup[k];
              const filteredShGroupList = shGroupList.filter(
                (sh) => parseInt(sh.id, 10) === parseInt(shGroupId, 10)
              );
              if (filteredShGroupList.length > 0) {
                const shGroupName = filteredShGroupList[0].SHGroupName;

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
        // const sentimentResult = [
        //   [
        //     { name: "Pie1", count: 35 },
        //     { name: "Pie2", count: 65 },
        //   ],

        for (const key in sentimentRet) {
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

        callback(filteredRet, filteredCulture, filteredSentiment);
      }
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

export default function* rootSaga() {
  yield all([
    fork(watchGetOverallSentiment),
    fork(watchGetTopPositiveNegative),
    fork(watchGetFeedbackSummary),
  ]);
}
