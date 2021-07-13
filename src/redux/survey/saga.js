import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
  pageListAPI,
  submitSurveyAPI,
  optionListAPI,
  addNewTopicAboutMeAPI,
  updateTopicAboutMeAPI,
  deleteTopicAboutMeAPI,
} from "../../services/axios/api";

import {
  PAGE_LIST,
  SUBMIT_SURVEY,
  ADD_ABOUT_ME_TOPIC,
  UPDATE_ABOUT_ME_TOPIC,
  DELETE_ABOUT_ME_TOPIC,
} from "Constants/actionTypes";

import { controlType, controlTypeText } from "Constants/defaultValues";

import {
  pageListSuccess,
  submitSurveySuccess,
  driverListSuccess,
  addAboutMeTopicSuccess,
  updateAboutMeTopicSuccess,
  deleteAboutMeTopicSuccess,
} from "../actions";

const getPageListAsync = async (surveyId, surveyUserId) =>
  await pageListAPI(surveyId, surveyUserId)
    .then((result) => result)
    .catch((error) => error);

const getOptionListAsync = async () =>
  await optionListAPI()
    .then((result) => result)
    .catch((error) => error);

function* getPageList({ payload }) {
  const { surveyId, surveyUserId } = payload;

  try {
    const result = yield call(getPageListAsync, surveyId, surveyUserId);
    if (result.status === 200) {
      const questionList = [...result.data];

      for (let i = 0; i < questionList.length; i++) {
        // Ordering by questionSequence
        questionList[i].amquestion = questionList[i].amquestion.sort((a, b) =>
          a.questionSequence > b.questionSequence ? 1 : -1
        );

        for (let j = 0; j < questionList[i].amquestion.length; j++) {
          if (
            questionList[i].amquestion[j].controlType ===
              controlType.TWO_OPTIONS ||
            questionList[i].amquestion[j].controlType ===
              controlType.MULTI_OPTIONS
          ) {
            if (questionList[i].amquestion[j].option.length === 0) {
              questionList[i].amquestion.splice(j, 1);
              j--;
              continue;
            }
          }

          if (
            !questionList[i].amquestion[j].shGroup ||
            questionList[i].amquestion[j].shGroup.length === 0
          ) {
            questionList[i].amquestion.splice(j, 1);
            j--;
            continue;
          }

          if (questionList[i].amquestion[j].responsestatus) {
            questionList[i].amquestion[j] = {
              ...questionList[i].amquestion[j],
              answer: {
                ...questionList[i].amquestion[j].response,
                survey: questionList[i].amquestion[j].survey,
                pageIndex: i,
                questionIndex: j,
              },
            };
          } else {
            questionList[i].amquestion[j] = {
              ...questionList[i].amquestion[j],
              answer: {
                pageIndex: i,
                questionIndex: j,
                integerValue: 0,
                topicValue: "",
                commentValue: "",
                skipValue: "",
                topicTags: "",
                commentTags: "",
                user: 0,
                subjectUser: 0,
                survey: questionList[i].amquestion[j].survey,
                amQuestion: questionList[i].amquestion[j].id,
                type: "me",
                controlType: controlTypeText(
                  questionList[i].amquestion[j].controlType
                ),
              },
            };
          }
        }
      }
      const result_option = yield call(getOptionListAsync);
      if (result_option.status === 200) {
        const optionList = result_option.data;
        yield put(pageListSuccess(questionList, optionList));
      }

      // Get Available Driver List
      let driverList = [];
      for (let i = 0; i < questionList.length; i++) {
        if (questionList[i].amquestion.length > 0) {
          driverList.push({
            driverId: questionList[i].id,
            driverName: questionList[i].driverName,
            icon: questionList[i].iconPath,
            percentage: 0,
            progress: 0,
          });
        }
      }
      yield put(driverListSuccess(driverList));
    } else {
      console.log("survey error :", result.statusText);
    }
  } catch (error) {
    console.log("survey error : ", error);
  }
}

const submitSurveyAsync = async (answerData) =>
  await submitSurveyAPI(answerData)
    .then((result) => result)
    .catch((error) => error);

/** 
  [{
    "integerValue": null,
    "topicValue": "",
    "commentValue": "",
    "skipValue": "",
    "topicTags": "",
    "commentTags": "",
    "user": null,
    "subjectUser": null,
    "survey": null,
    "amQuestion": null
  }]
*/
function* submitSurvey({ payload }) {
  const { surveyList, projectId, surveyUserId, surveyId, history, navigateToNext } = payload;
  let answerList = [];

  for (let i = 0; i < surveyList.length; i++) {
    let amquestions = surveyList[i].amquestion;

    for (let j = 0; j < amquestions.length; j++) {
      if (
        (amquestions[j].answer.integerValue === "" ||
          amquestions[j].answer.integerValue === 0) &&
        amquestions[j].answer.topicValue === "" &&
        amquestions[j].answer.commentValue === "" &&
        amquestions[j].answer.skipValue === "" &&
        !amquestions[j].responsestatus
      ) {
        continue;
      }

      let integerValue = amquestions[j].answer.integerValue;
      let isTopic = false;
      if (integerValue.toString().includes("T-")) {
        integerValue = integerValue.toString().replace("T-", "");
        isTopic = true;
      }
      integerValue = Math.floor(parseInt(integerValue, 10));

      let answer = Object.assign(
        {},
        {
          integerValue: integerValue,
          topicValue: amquestions[j].answer.topicValue,
          commentValue: amquestions[j].answer.commentValue,
          skipValue: amquestions[j].answer.skipValue,
          topicTags: isTopic
            ? amquestions[j].answer.topicValue
            : amquestions[j].answer.topicTags,
          commentTags: amquestions[j].answer.commentTags,
          projectUser: surveyUserId,
          subProjectUser: surveyUserId,
          survey: amquestions[j].answer.survey.id,
          amQuestion: amquestions[j].answer.amQuestion,
          project: projectId,
          controlType: amquestions[j].answer.controlType,
        }
      );

      answerList.push(answer);
    }
  }

  if (answerList.length === 0) {
    return;
  }

  try {
    let result = yield call(submitSurveyAsync, answerList);

    if (result.status === 201) {
      localStorage.setItem("surveyId", surveyId);
      if (navigateToNext) {
        yield put(submitSurveySuccess(surveyId));
        history.push("/app/about-others");
      }
    } else {
      console.log("submit failed");
    }
  } catch (error) {
    console.log("survey error : ", error);
  }
}

const addAboutMeTopicAsync = async (
  topicName,
  topicComment,
  questionId,
  projectUserId
) =>
  await addNewTopicAboutMeAPI(
    topicName,
    topicComment,
    questionId,
    projectUserId
  )
    .then((result) => result)
    .catch((error) => error);

function* addAboutMeTopic({ payload }) {
  const {
    topicName,
    topicComment,
    questionId,
    projectUserId,
    pageIndex,
    questionIndex,
    callback,
  } = payload;

  try {
    let result = yield call(
      addAboutMeTopicAsync,
      topicName,
      topicComment,
      questionId,
      projectUserId
    );

    if (result.status === 201) {
      yield put(addAboutMeTopicSuccess(result.data, pageIndex, questionIndex));
      callback(result.data);
    }
  } catch (error) {
    console.log("survey error : ", error);
  }
}

const updateAboutMeTopicAsync = async (
  topicId,
  topicName,
  topicComment,
  questionId,
  projectUserId
) =>
  await updateTopicAboutMeAPI(
    topicId,
    topicName,
    topicComment,
    questionId,
    projectUserId
  )
    .then((result) => result)
    .catch((error) => error);

function* updateAboutMeTopic({ payload }) {
  const {
    topicId,
    topicName,
    topicComment,
    questionId,
    projectUserId,
    pageIndex,
    questionIndex,
    callback,
  } = payload;

  try {
    let result = yield call(
      updateAboutMeTopicAsync,
      topicId,
      topicName,
      topicComment,
      questionId,
      projectUserId
    );

    if (result.status === 200) {
      yield put(
        updateAboutMeTopicSuccess(
          topicId,
          result.data,
          pageIndex,
          questionIndex
        )
      );
      callback(topicId, result.data);
    }
  } catch (error) {
    console.log("survey error : ", error);
  }
}

const deleteAboutMeTopicAsync = async (topicId) =>
  await deleteTopicAboutMeAPI(topicId)
    .then((result) => result)
    .catch((error) => error);

function* deleteAboutMeTopic({ payload }) {
  const { topicId, pageIndex, questionIndex, callback } = payload;

  try {
    const result = yield call(deleteAboutMeTopicAsync, topicId);
    if (result.status === 204) {
      yield put(deleteAboutMeTopicSuccess(topicId, pageIndex, questionIndex));
      callback(topicId);
    }
  } catch (error) {
    console.log("survey error : ", error);
  }
}

export function* watchPageList() {
  yield takeEvery(PAGE_LIST, getPageList);
}

export function* watchSubmitSurvey() {
  yield takeEvery(SUBMIT_SURVEY, submitSurvey);
}

export function* watchAddAboutMeTopic() {
  yield takeEvery(ADD_ABOUT_ME_TOPIC, addAboutMeTopic);
}

export function* watchUpdateAboutMeTopic() {
  yield takeEvery(UPDATE_ABOUT_ME_TOPIC, updateAboutMeTopic);
}

export function* watchDeleteAboutMeTopic() {
  yield takeEvery(DELETE_ABOUT_ME_TOPIC, deleteAboutMeTopic);
}

export default function* rootSaga() {
  yield all([
    fork(watchPageList),
    fork(watchSubmitSurvey),
    fork(watchAddAboutMeTopic),
    fork(watchUpdateAboutMeTopic),
    fork(watchDeleteAboutMeTopic),
  ]);
}
