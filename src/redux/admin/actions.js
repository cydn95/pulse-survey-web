import {
  ADMIN_USER_LIST,
  ADMIN_USER_LIST_SUCCESS,
  ADMIN_USER_LIST_FAILURE,
  ADMIN_SET_USER_LIST,
  ADMIN_SET_USER_FIELD,
  ADMIN_ADD_NEW_USER,
  ADMIN_SET_PROJECT_FIELD,
  ADMIN_UPDATE_SURVEY,
  ADMIN_ADD_SURVEY,
  ADMIN_PROJECT_LIST,
  ADMIN_PROJECT_LIST_SUCCESS,
  ADMIN_SET_CURRENT_PROJECT,
  ADMIN_ACTIVE_PROJECT_REQUEST,
  ADMIN_AO_QUESTION_LIST,
  ADMIN_AO_QUESTION_LIST_SUCCESS,
  ADMIN_AM_QUESTION_LIST,
  ADMIN_AM_QUESTION_LIST_SUCCESS,
  ADMIN_REPORT_ACCESS_LIST,
  ADMIN_REPORT_ACCESS_LIST_SUCCESS,
  ADMIN_SET_QUESTION_LIST,
  ADMIN_SET_QUESTION_LIST_BY_FIELD,
  ADMIN_SURVEY_SETUP,
  ADMIN_SURVEY_SETUP_SUCCESS,
  ADMIN_SURVEY_CONFIGURATION,
  ADMIN_SURVEY_CONFIGURATION_SUCCESS,
  ADMIN_SEND_BULK_INVITATION,
  ADMIN_BULK_ARCHIVE_USER,
  ADMIN_SET_QUESTION_LIST_BLANK,
  ADMIN_DELETE_QUESTION,
  ADMIN_DELETE_QUESTION_SUCCESS,
  DEL_MORE_INFO_PAGE,
  ADMIN_GET_DRIVER_LIST,
  ADMIN_DRIVER_LIST_SUCCESS,
  ADMIN_UPLOAD_IMAGES,
  FLAGGED_RESPONSE_LIST,
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

export const adminSetUserList = (data) => ({
  type: ADMIN_SET_USER_LIST,
  payload: { data }
})

export const adminSetUserField = (id, field, value) => ({
  type: ADMIN_SET_USER_FIELD,
  payload: { id, field, value }
})

export const adminAddNewUSer = (user) => ({
  type: ADMIN_ADD_NEW_USER,
  payload: { user }
})

export const adminSetProjectField = (field, value) => ({
  type: ADMIN_SET_PROJECT_FIELD,
  payload: { field, value }
})

export const deleteMoreInfoPage = (id, index, callback) => ({
  type: DEL_MORE_INFO_PAGE,
  payload: {id, callback, index}
})

export const adminSetCurrentProject = (data) => ({
  type: ADMIN_SET_CURRENT_PROJECT,
  payload: { data }
})

export const adminUpdateSurvey = (surveyId, data, callback) => ({
  type: ADMIN_UPDATE_SURVEY,
  payload: { surveyId, data, callback }
})

export const adminAddSurvey = (data, callback) => ({
  type: ADMIN_ADD_SURVEY,
  payload: { data, callback }
})

export const adminSetActive = (surveyId, data, callback) => ({
  type: ADMIN_ACTIVE_PROJECT_REQUEST,
  payload: { surveyId, data, callback }
})

export const adminDeleteQuestion = (filter, questionText, questionId) => ({
  type: ADMIN_DELETE_QUESTION,
  payload: { filter, questionText, questionId }
})

export const adminDeleteQuestionSuccess = (filter, questionId) => ({
  type: ADMIN_DELETE_QUESTION_SUCCESS,
  payload: { filter, questionId }
})

export const adminSetQuestionListBlank = () => ({
  type: ADMIN_SET_QUESTION_LIST_BLANK,
  payload: {}
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

export const adminSetQuestionList = (filter, data) => ({
  type: ADMIN_SET_QUESTION_LIST,
  payload: { filter, data }
})

export const adminSetQuestionListByField = (filter, index, field, value) => ({
  type: ADMIN_SET_QUESTION_LIST_BY_FIELD,
  payload: { filter, index, field, value }
})

export const adminReportAccessList = (surveyId) => ({
  type: ADMIN_REPORT_ACCESS_LIST,
  payload: { surveyId }
})

export const adminReportAccessListSuccess = (data) => ({
  type: ADMIN_REPORT_ACCESS_LIST_SUCCESS,
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

export const adminSurveyConfiguration = (surveyId) => ({
  type: ADMIN_SURVEY_CONFIGURATION,
  payload: { surveyId }
})

export const adminSurveyConfigurationSuccess = (data) => ({
  type: ADMIN_SURVEY_CONFIGURATION_SUCCESS,
  payload: { data }
})

export const adminSendBulkInvitation = (data, callback) => ({
  type: ADMIN_SEND_BULK_INVITATION,
  payload: { data, callback }
})

export const adminBulkArchiveUser = (data, callback) => ({
  type: ADMIN_BULK_ARCHIVE_USER,
  payload: { data, callback }
})

export const adminGetDriverList = (surveyId) => ({
  type: ADMIN_GET_DRIVER_LIST,
  payload: { surveyId }
})

export const adminDriverListSuccess = (driverList) => ({
  type: ADMIN_DRIVER_LIST_SUCCESS,
  payload: { driverList },
});

export const adminUploadImages = (data, callback) => ({
  type: ADMIN_UPLOAD_IMAGES,
  payload: {data, callback},
})

export const flaggedResponseList = (surveyId, callback) => ({
  type: FLAGGED_RESPONSE_LIST,
  payload: {surveyId, callback},
})