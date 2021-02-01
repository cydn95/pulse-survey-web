import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  aoQuestionListAPI,
  optionListAPI,
  submitAoQuestionAPI,
  addNewTopicAboutOtherAPI,
  updateStakeholderCategoryAPI,
} from "../../services/axios/api";

import {
  AOQUESTION_LIST,
  SUBMIT_AOQUESTION,
  ADD_ABOUT_OTHER_TOPIC,
  UPDATE_STAKEHOLDER_CATEGORY,
} from "Constants/actionTypes";

import {
  aoQuestionListSuccess,
  submitAoQuestionSuccess,
  addAboutOtherTopicSuccess,
  stakeholderList,
  aoQuestionList,
} from "Redux/actions";

import { controlType } from "Constants/defaultValues";

const getAoQuestionListAsync = async (projectUserId, surveyId) =>
  await aoQuestionListAPI(projectUserId, surveyId)
    .then((result) => result)
    .catch((error) => error);

const getOptionListAsync = async () =>
  await optionListAPI()
    .then((result) => result)
    .catch((error) => error);

function* getAoQuestionList({ payload }) {
  const { projectUserId, surveyId } = payload;
  try {
    const result = yield call(getAoQuestionListAsync, projectUserId, surveyId);

    if (result.status === 200) {
      const result_option = yield call(getOptionListAsync);

      if (result_option.status === 200) {
        const optionList = result_option.data;

        const questionList = [];

        for (let i = 0; i < result.data.length; i++) {
          for (let j = 0; j < result.data[i].aoquestion.length; j++) {
            questionList.push(result.data[i].aoquestion[j]);
          }
        }

        let aoQuestionList = questionList;

        aoQuestionList = aoQuestionList.filter((item) => {
          if (
            item.controlType === controlType.TWO_OPTIONS ||
            item.controlType === controlType.MULTI_OPTIONS
          ) {
            if (item.option.length === 0) {
              return false;
            }
          }
          return true;
        });

        for (let i = 0; i < aoQuestionList.length; i++) {
          if (
            aoQuestionList[i].controlType === controlType.TWO_OPTIONS ||
            aoQuestionList[i].controlType === controlType.MULTI_OPTIONS
          ) {
            if (aoQuestionList[i].option.length === 0) {
              aoQuestionList.splice(i, 1);
              i--;
              continue;
            }
          }

          // if (
          //   !aoQuestionList[i].shGroup ||
          //   aoQuestionList[i].shGroup.length === 0
          // ) {
          //   if (aoQuestionList[i].option.length === 0) {
          //     aoQuestionList.splice(i, 1);
          //     i--;
          //     continue;
          //   }
          // }

          if (aoQuestionList[i].responsestatus) {
            aoQuestionList[i] = {
              ...aoQuestionList[i],
              answer: {
                amQuestion: aoQuestionList[i].response.aoQuestion,
                pageIndex: 0,
                questionIndex: i,
                integerValue: aoQuestionList[i].response.integerValue,
                topicValue: aoQuestionList[i].response.topicValue,
                commentValue: aoQuestionList[i].response.commentValue,
                skipValue: aoQuestionList[i].response.skipValue,
                topicTags: aoQuestionList[i].response.topicValue,
                commentTags: aoQuestionList[i].response.commentTags,
                user: aoQuestionList[i].response.user,
                subjectUser: aoQuestionList[i].response.subjectUser,
                survey: aoQuestionList[i].survey,
                type: "other",
              },
            };
          } else {
            aoQuestionList[i] = {
              ...aoQuestionList[i],
              answer: {
                pageIndex: 0,
                questionIndex: i,
                integerValue: 0,
                topicValue: "",
                commentValue: "",
                skipValue: "",
                topicTags: "",
                commentTags: "",
                user: 0,
                subjectUser: 0,
                survey: aoQuestionList[i].survey,
                amQuestion: aoQuestionList[i].id,
                type: "other",
              },
            };
          }
        }

        yield put(aoQuestionListSuccess(aoQuestionList, optionList));
      }
    } else {
      console.log("login failed :", result.statusText);
    }
  } catch (error) {
    console.log("survey error : ", error);
  }
}

const submitAoQuestionAsync = async (answerData) =>
  await submitAoQuestionAPI(answerData)
    .then((result) => result)
    .catch((error) => error);

function* submitAoQuestion({ payload }) {
  const {
    answers,
    currentSurveyUser,
    projectUserId,
    surveyId,
    callback,
  } = payload;

  let answerList = [];

  for (let i = 0; i < answers.length; i++) {
    // if (surveyUserId.split('_').length !== 2) {
    //   continue;
    // }

    let integerValue = answers[i].integerValue;
    let isTopic = false;
    if (integerValue.toString().includes("T-")) {
      integerValue = integerValue.toString().replace("T-", "");
      isTopic = true;
    }
    integerValue = Math.floor(parseInt(integerValue, 10));

    let answer = {
      integerValue: integerValue,
      topicValue: answers[i].topicValue,
      commentValue: answers[i].commentValue,
      skipValue: answers[i].skipValue,
      topicTags: isTopic ? answers[i].topicValue : answers[i].topicTags,
      commentTags: answers[i].commentTags,
      projectUser: projectUserId,
      subProjectUser: currentSurveyUser.projectUserId,
      survey: answers[i].survey.id,
      project: answers[i].survey.project,
      aoQuestion: answers[i].amQuestion,
      shCategory: parseInt(answers[i].shCategory),
      controlType: answers[i].controlType,
    };

    if (
      parseInt(answer.integerValue, 10) === 0 &&
      answer.topicValue.toString() === "" &&
      answer.commentValue.toString() === "" &&
      answer.skipValue.toString() === ""
    ) {
      continue;
    }

    answerList.push(answer);
  }
  console.log('projectUserId', projectUserId);
  console.log('surveyId', surveyId);
  console.log('currentSurveyUser', currentSurveyUser);
  console.log('answers', answerList);
  // return;
  try {
    let result = yield call(submitAoQuestionAsync, answerList);

    if (result.status === 201) {
      // yield put(submitAoQuestionSuccess());
      // yield put(stakeholderList(projectUserId, surveyId));
      // yield put(aoQuestionList(currentSurveyUser.projectUserId, surveyId));
      callback();
    } else {
      console.log("submit failed");
    }
  } catch (error) {
    console.log("survey error : ", error);
  }
}

const addAboutOtherTopicAsync = async (
  topicName,
  topicComment,
  questionId,
  projectUserId
) =>
  await addNewTopicAboutOtherAPI(
    topicName,
    topicComment,
    questionId,
    projectUserId
  )
    .then((result) => result)
    .catch((error) => error);

function* addAboutOtherTopic({ payload }) {
  const {
    topicName,
    topicComment,
    questionId,
    projectUserId,
    questionIndex,
    callback,
  } = payload;

  try {
    let result = yield call(
      addAboutOtherTopicAsync,
      topicName,
      topicComment,
      questionId,
      projectUserId
    );

    if (result.status === 201) {
      yield put(addAboutOtherTopicSuccess(result.data, questionIndex));
      callback(result.data);
    }
  } catch (error) {
    console.log("survey error : ", error);
  }
}

const updateStakeholderCategoryAsync = async (projectUserId, projectUser) =>
  await updateStakeholderCategoryAPI(projectUserId, projectUser)
    .then((data) => data)
    .catch((error) => error);

function* updateStakeholderCategory({ payload }) {
  try {
    const { projectUserId, projectUser, callback } = payload;

    const result = yield call(
      updateStakeholderCategoryAsync,
      parseInt(projectUserId, 10),
      projectUser
    );

    if (result.status == 200) {
      callback();
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

export function* watchAoQuestionList() {
  yield takeEvery(AOQUESTION_LIST, getAoQuestionList);
}

export function* watchAoQuestionSubmit() {
  yield takeEvery(SUBMIT_AOQUESTION, submitAoQuestion);
}

export function* watchAddAboutOtherTopic() {
  yield takeEvery(ADD_ABOUT_OTHER_TOPIC, addAboutOtherTopic);
}

export function* watchUpdateStakeholderCategory() {
  yield takeEvery(UPDATE_STAKEHOLDER_CATEGORY, updateStakeholderCategory);
}

export default function* rootSaga() {
  yield all([
    fork(watchAoQuestionList),
    fork(watchAoQuestionSubmit),
    fork(watchAddAboutOtherTopic),
    fork(watchUpdateStakeholderCategory),
  ]);
}
