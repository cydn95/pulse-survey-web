import {
  PAGE_LIST,
  PAGE_LIST_SUCCESS,
  SELECT_PAGE,
  CONTINUE_SURVEY,
  INPUT_ANSWER,
  SUBMIT_SURVEY,
  SUBMIT_SURVEY_SUCCESS,
  ABOUTME,
  SUBMIT_ABOUTME
} from 'Constants/actionTypes';

export const pageList = () => ({
  type: PAGE_LIST,
  payload: { }
});

export const pageListSuccess = (pageList) => ({
  type: PAGE_LIST_SUCCESS,
  payload: pageList
});

export const selectPage = pageIndex => ({
  type: SELECT_PAGE,
  payload: { pageIndex }
})

export const continueSurvey = (pageIndex, percentage) => ({
  type: CONTINUE_SURVEY,
  payload: { pageIndex, percentage }
})

export const inputAnswer = (answer) => ({
  type: INPUT_ANSWER,
  payload: { answer }
})

export const submitSurvey = (surveyList, aboutMe, history) => ( {
  type: SUBMIT_SURVEY,
  payload: { surveyList, aboutMe, history }
})

export const submitSurveySuccess = (surveyId) => ( {
  type: SUBMIT_SURVEY_SUCCESS,
  payload: { surveyId }
})

export const aboutMe = (data) => ( {
  type: ABOUTME,
  payload: { data }
})

export const submitAboutMe = (data, aboutMe) => ({
  type: SUBMIT_ABOUTME,
  payload: { data, aboutMe }
})