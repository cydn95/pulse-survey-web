import {
  ADMIN_USER_LIST,
  ADMIN_USER_LIST_SUCCESS,
  ADMIN_USER_LIST_FAILURE,
  ADMIN_SET_USER_FIELD,
  ADMIN_SET_PROJECT_FIELD,
  ADMIN_UPDATE_USER_LIST,
  ADMIN_PROJECT_LIST,
  ADMIN_PROJECT_LIST_SUCCESS,
  ADMIN_SET_CURRENT_PROJECT,
  ADMIN_ACTIVE_PROJECT_REQUEST,
  ADMIN_AO_QUESTION_LIST,
  ADMIN_AO_QUESTION_LIST_SUCCESS,
  ADMIN_AM_QUESTION_LIST,
  ADMIN_AM_QUESTION_LIST_SUCCESS,
  ADMIN_SURVEY_SETUP,
  ADMIN_SURVEY_SETUP_SUCCESS,
} from 'Constants/actionTypes'

export const adminProjectList = (userId) => ({
  type: ADMIN_PROJECT_LIST,
  payload: { userId }
})

export const adminProjectListSuccess = (projectList) => ({
  type: ADMIN_PROJECT_LIST_SUCCESS,
  payload: { projectList }
})

export const adminUserList = (surveyId) => ({
  type: ADMIN_USER_LIST,
  payload: { surveyId }
})

export const adminUserListSuccess = (userList) => ({
  type: ADMIN_USER_LIST_SUCCESS,
  payload: { userList }
})

export const adminUserListFailure = (error) => ({
  type: ADMIN_USER_LIST_FAILURE,
  payload: { error }
})

export const adminSetUserField = (id, field, value) => ({
  type: ADMIN_SET_USER_FIELD,
  payload: { id, field, value }
})

export const adminSetProjectField = (field, value) => ({
  type: ADMIN_SET_PROJECT_FIELD,
  payload: { field, value }
})

export const adminSetCurrentProject = (data) => ({
  type: ADMIN_SET_CURRENT_PROJECT,
  payload: { data }
})

export const adminUpdateUserList = (data, callback) => ({
  type: ADMIN_UPDATE_USER_LIST,
  payload: { data, callback }
})

export const adminSetActive = (surveyId, data, callback) => ({
  type: ADMIN_ACTIVE_PROJECT_REQUEST,
  payload: { surveyId, data, callback }
})

export const adminAOQuestionList = (surveyId) => ({
  type: ADMIN_AO_QUESTION_LIST,
  payload: { surveyId }
})

export const adminAOQuestionListSuccess = (data) => ({
  type: ADMIN_AO_QUESTION_LIST_SUCCESS,
  payload: { data }
})

export const adminAMQuestionList = (surveyId) => ({
  type: ADMIN_AM_QUESTION_LIST,
  payload: { surveyId }
})

export const adminAMQuestionListSuccess = (data) => ({
  type: ADMIN_AM_QUESTION_LIST_SUCCESS,
  payload: { data }
})

export const adminSurveySetup = (surveyId) => ({
  type: ADMIN_SURVEY_SETUP,
  payload: { surveyId }
})

export const adminSurveySetupSuccess = (data) => ({
  type: ADMIN_SURVEY_SETUP_SUCCESS,
  payload: { data }
})