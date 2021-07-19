import {
  PAGE_LIST,
  PAGE_LIST_SUCCESS,
  SELECT_PAGE,
  CONTINUE_SURVEY,
  INPUT_ANSWER,
  SUBMIT_SURVEY,
  SUBMIT_SURVEY_SUCCESS,
  ABOUTME,
  SUBMIT_ABOUTME,
  ADD_ABOUT_ME_TOPIC,
  ADD_ABOUT_ME_TOPIC_SUCCESS,
  UPDATE_ABOUT_ME_TOPIC,
  UPDATE_ABOUT_ME_TOPIC_SUCCESS,
  DELETE_ABOUT_ME_TOPIC,
  DELETE_ABOUT_ME_TOPIC_SUCCESS,
  CLEAR_ABOUTME
} from "Constants/actionTypes";

export const pageList = (surveyId, surveyUserId) => ({
  type: PAGE_LIST,
  payload: { surveyId, surveyUserId },
});

export const pageListSuccess = (pageList, optionList) => ({
  type: PAGE_LIST_SUCCESS,
  payload: { pageList, optionList },
});

export const selectPage = (pageIndex) => ({
  type: SELECT_PAGE,
  payload: { pageIndex },
});

export const continueSurvey = (pageIndex, percentage) => ({
  type: CONTINUE_SURVEY,
  payload: { pageIndex, percentage },
});

export const inputAnswer = (answer) => ({
  type: INPUT_ANSWER,
  payload: { answer },
});

export const submitSurvey = (
  surveyList,
  aboutMe,
  projectId,
  surveyUserId,
  surveyId,
  history,
  navigateToNext
) => ({
  type: SUBMIT_SURVEY,
  payload: { surveyList, aboutMe, projectId, surveyUserId, surveyId, history, navigateToNext },
});

export const submitSurveySuccess = (surveyId) => ({
  type: SUBMIT_SURVEY_SUCCESS,
  payload: { surveyId },
});

export const aboutMe = (data) => ({
  type: ABOUTME,
  payload: { data },
});

export const submitAboutMe = (data, aboutMe) => ({
  type: SUBMIT_ABOUTME,
  payload: { data, aboutMe },
});

export const addAboutMeTopic = (
  topicName,
  topicComment,
  questionId,
  projectUserId,
  pageIndex,
  questionIndex,
  callback
) => ({
  type: ADD_ABOUT_ME_TOPIC,
  payload: {
    topicName,
    topicComment,
    questionId,
    projectUserId,
    pageIndex,
    questionIndex,
    callback,
  },
});

export const addAboutMeTopicSuccess = (topic, pageIndex, questionIndex) => ({
  type: ADD_ABOUT_ME_TOPIC_SUCCESS,
  payload: { topic, pageIndex, questionIndex },
});

export const updateAboutMeTopic = (
  topicId,
  topicName,
  topicComment,
  questionId,
  projectUserId,
  pageIndex,
  questionIndex,
  callback
) => ({
  type: UPDATE_ABOUT_ME_TOPIC,
  payload: {
    topicId,
    topicName,
    topicComment,
    questionId,
    projectUserId,
    pageIndex,
    questionIndex,
    callback,
  },
});

export const updateAboutMeTopicSuccess = (
  topicId,
  topic,
  pageIndex,
  questionIndex
) => ({
  type: UPDATE_ABOUT_ME_TOPIC_SUCCESS,
  payload: { topicId, topic, pageIndex, questionIndex },
});

export const deleteAboutMeTopic = (
  topicId,
  pageIndex,
  questionIndex,
  callback
) => ({
  type: DELETE_ABOUT_ME_TOPIC,
  payload: { topicId, pageIndex, questionIndex, callback },
});

export const deleteAboutMeTopicSuccess = (
  topicId,
  pageIndex,
  questionIndex
) => ({
  type: DELETE_ABOUT_ME_TOPIC_SUCCESS,
  payload: { topicId, pageIndex, questionIndex },
});

export const clearAboutMe = () => ({
  type: CLEAR_ABOUTME
})