import {
  ADMIN_PROJECT_LIST,
  ADMIN_PROJECT_LIST_SUCCESS,
  ADMIN_USER_LIST,
  ADMIN_USER_LIST_SUCCESS,
  ADMIN_USER_LIST_FAILURE,
  ADMIN_SET_USER_FIELD,
  ADMIN_ADD_NEW_USER,
  ADMIN_SET_PROJECT_FIELD,
  ADMIN_SET_CURRENT_PROJECT,
  ADMIN_SET_ACTIVE_REQUEST,
  ADMIN_AO_QUESTION_LIST,
  ADMIN_AO_QUESTION_LIST_SUCCESS,
  ADMIN_AM_QUESTION_LIST,
  ADMIN_AM_QUESTION_LIST_SUCCESS,
  ADMIN_SURVEY_SETUP,
  ADMIN_SURVEY_SETUP_SUCCESS,
  ADMIN_SURVEY_CONFIGURATION,
  ADMIN_SURVEY_CONFIGURATION_SUCCESS,
} from 'Constants/actionTypes'

const INIT_STATE = {
  userList: {},
  projectList: [],
  aoQuestionList: [],
  amQuestionList: [],
  currentProject: {},
  surveyId: '',
  loading: false,
  error: '',
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADMIN_PROJECT_LIST:
      return { ...state, loading: true }
    case ADMIN_PROJECT_LIST_SUCCESS:
      return { ...state, projectList: action.payload.projectList, loading: false }
    case ADMIN_USER_LIST:
      return { ...state, loading: true }
    case ADMIN_USER_LIST_SUCCESS:
      return { ...state, userList: action.payload.userList, loading: false }
    case ADMIN_USER_LIST_FAILURE:
      return { ...state, loading: false, userList: {} }
    case ADMIN_SET_USER_FIELD:
      return {
        ...state,
        userList: {
          ...state.userList,
          projectUser: state.userList.projectUser.map((user, idx) =>
            idx === action.payload.id
              ? { ...user, [action.payload.field]: action.payload.value }
              : user)
        }
      }
    case ADMIN_ADD_NEW_USER:
      return {
        ...state,
        userList: {
          ...(state.userList || {}),
          totalIdentifiedCnt: ((state.userList || {}).totalIdentifiedCnt || 0) + 1,
          totalInvitedCnt: action.payload.user.sendInvite ? ((state.userList || {}).totalInvitedCnt || 0) + 1 : ((state.userList || {}).totalInvitedCnt || 0),
          projectUser: [
            ...(state.userList.projectUser || {}),
            action.payload.user
          ]
        }
      }
    case ADMIN_SET_CURRENT_PROJECT:
      return {
        ...state,
        surveyId: action.payload.data.id,
        currentProject: action.payload.data,
      }
    case ADMIN_SET_PROJECT_FIELD:
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          [action.payload.field]: action.payload.value
        }
      }
    case ADMIN_SET_ACTIVE_REQUEST:
      return {
        ...state,
      }
    case ADMIN_AO_QUESTION_LIST:
      return {
        ...state,
        loading: true
      }
    case ADMIN_AO_QUESTION_LIST_SUCCESS:
      return {
        ...state,
        aoQuestionList: action.payload.data,
        loading: false,
      }
    case ADMIN_AM_QUESTION_LIST:
      return {
        ...state,
        loading: true
      }
    case ADMIN_AM_QUESTION_LIST_SUCCESS:
      return {
        ...state,
        amQuestionList: action.payload.data,
        loading: false,
      }
    case ADMIN_SURVEY_SETUP:
      return {
        ...state,
        loading: true,
      }
    case ADMIN_SURVEY_SETUP_SUCCESS:
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          ...action.payload.data
        },
        loading: false,
      }
    case ADMIN_SURVEY_CONFIGURATION:
      return {
        ...state,
        loading: true,
      }
    case ADMIN_SURVEY_CONFIGURATION_SUCCESS:
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          ...action.payload.data
        },
        loading: false,
      }
    default:
      return { ...state }
  }
}