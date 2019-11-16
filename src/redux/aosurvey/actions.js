import {
  AOQUESTION_LIST,
  AOQUESTION_LIST_SUCCESS,
  SUBMIT_AOQUESTION,
  SUBMIT_AOQUESTION_SUCCESS
} from 'Constants/actionTypes';

export const aoQuestionList = () => ({
  type: AOQUESTION_LIST,
  payload: { }
});

export const aoQuestionListSuccess = (aoQuestionList, optionList) => ({
  type: AOQUESTION_LIST_SUCCESS,
  payload: { aoQuestionList, optionList }
});

export const submitAoQuestion = (questionList, history, surveyUserId) => ({
  type: SUBMIT_AOQUESTION,
  payload: { questionList, history, surveyUserId }
})

export const submitAoQuestionSuccess = () => ({
  type: SUBMIT_AOQUESTION_SUCCESS
})