import {
  AOQUESTION_LIST,
  AOQUESTION_LIST_SUCCESS,
  SUBMIT_AOQUESTION,
  SUBMIT_AOQUESTION_SUCCESS,
  ADD_ABOUT_OTHER_TOPIC,
  ADD_ABOUT_OTHER_TOPIC_SUCCESS
} from 'Constants/actionTypes';

export const aoQuestionList = (projectUserId) => ({
  type: AOQUESTION_LIST,
  payload: { projectUserId }
});

export const aoQuestionListSuccess = (aoQuestionList, optionList) => ({
  type: AOQUESTION_LIST_SUCCESS,
  payload: { aoQuestionList, optionList }
});

export const submitAoQuestion = (questionList, history, currentSurveyUser, projectUserId) => ({
  type: SUBMIT_AOQUESTION,
  payload: { questionList, history, currentSurveyUser, projectUserId }
})

export const submitAoQuestionSuccess = () => ({
  type: SUBMIT_AOQUESTION_SUCCESS
})

export const addAboutOtherTopic = (topicName, topicComment, questionId, projectUserId, questionIndex, callback) => ({
  type: ADD_ABOUT_OTHER_TOPIC,
  payload: { topicName, topicComment, questionId, projectUserId, questionIndex, callback }
})

export const addAboutOtherTopicSuccess = (topic, questionIndex) => ({
  type: ADD_ABOUT_OTHER_TOPIC_SUCCESS,
  payload: { topic, questionIndex }
})