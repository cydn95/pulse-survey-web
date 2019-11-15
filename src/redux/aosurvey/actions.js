import {
  AOQUESTION_LIST,
  AOQUESTION_LIST_SUCCESS,
  SUBMIT_AOQUSTION
} from 'Constants/actionTypes';

export const aoQuestionList = () => ({
  type: AOQUESTION_LIST,
  payload: { }
});

export const aoQuestionListSuccess = (aoQuestionList, optionList) => ({
  type: AOQUESTION_LIST_SUCCESS,
  payload: { aoQuestionList, optionList }
});

export const submitAoQuestion = (data) => ({
  type: SUBMIT_AOQUSTION,
  payload: { data }
})