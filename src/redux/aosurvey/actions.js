import {
  AOQUESTION_LIST,
  AOQUESTION_LIST_SUCCESS,
  SUBMIT_AOQUESTION,
  SUBMIT_AOQUESTION_SUCCESS,
  ADD_ABOUT_OTHER_TOPIC,
  ADD_ABOUT_OTHER_TOPIC_SUCCESS,
  UPDATE_STAKEHOLDER_CATEGORY,
} from "Constants/actionTypes";

export const aoQuestionList = (projectUserId, surveyId) => ({
  type: AOQUESTION_LIST,
  payload: { projectUserId, surveyId },
});

export const aoQuestionListSuccess = (aoQuestionList, optionList) => ({
  type: AOQUESTION_LIST_SUCCESS,
  payload: { aoQuestionList, optionList },
});

export const submitAoQuestion = (
  answers,
  currentSurveyUser,
  projectUserId,
  surveyId,
  callback
) => ({
  type: SUBMIT_AOQUESTION,
  payload: { answers, currentSurveyUser, projectUserId, surveyId, callback },
});

export const submitAoQuestionSuccess = () => ({
  type: SUBMIT_AOQUESTION_SUCCESS,
});

export const addAboutOtherTopic = (
  topicName,
  topicComment,
  questionId,
  projectUserId,
  questionIndex,
  callback
) => ({
  type: ADD_ABOUT_OTHER_TOPIC,
  payload: {
    topicName,
    topicComment,
    questionId,
    projectUserId,
    questionIndex,
    callback,
  },
});

export const addAboutOtherTopicSuccess = (topic, questionIndex) => ({
  type: ADD_ABOUT_OTHER_TOPIC_SUCCESS,
  payload: { topic, questionIndex },
});

export const updateStakeholderCategory = (
  projectUserId,
  projectUser,
  callback
) => ({
  type: UPDATE_STAKEHOLDER_CATEGORY,
  payload: { projectUserId, projectUser, callback },
});
