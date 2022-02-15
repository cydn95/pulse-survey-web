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
  ADMIN_SET_QUESTION_LIST,
  ADMIN_SET_QUESTION_LIST_BY_FIELD,
  ADMIN_SURVEY_SETUP,
  ADMIN_SURVEY_SETUP_SUCCESS,
  ADMIN_SURVEY_CONFIGURATION,
  ADMIN_SURVEY_CONFIGURATION_SUCCESS,
  ADMIN_ADD_SURVEY,
  ADMIN_UPDATE_SURVEY,
  ADMIN_SEND_BULK_INVITATION,
  ADMIN_BULK_ARCHIVE_USER,
  DEL_MORE_INFO_PAGE,
  ADMIN_SET_USER_LIST,
  ADMIN_SET_QUESTION_LIST_BLANK,
  ADMIN_DELETE_QUESTION,
  ADMIN_DRIVER_LIST_SUCCESS,
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
    case ADMIN_SET_USER_LIST:
      return { ...state, userList: action.payload.data }
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
    case ADMIN_SET_QUESTION_LIST_BLANK:
      return {
        ...state,
        aoQuestionList: [],
        amQuestionList: [],
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
    case ADMIN_SET_QUESTION_LIST:
      let filterText
      if (action.payload.filter === "About Me") {
        filterText = 'amQuestionList'
      } else {
        filterText = 'aoQuestionList'
      }
      return {
        ...state,
        [filterText]: [
          action.payload.data,
          ...state[filterText],
        ]
      }
    case ADMIN_SET_QUESTION_LIST_BY_FIELD:
      const { filter, index, field, value } = action.payload
      let filterText2
      if (filter === "About Me") {
        filterText2 = 'amQuestionList'
      } else {
        filterText2 = 'aoQuestionList'
      }
      let temp = state[filterText2].map(d => {
        if (d.id === index) {
          d[field] = value
          return d
        } else {
          return d
        }
      })
      console.log('data', temp)
      console.log('value', value)
      console.log('index', index)
      return {
        ...state,
        [filterText2]: [
          ...temp
        ]
      }
    case ADMIN_DELETE_QUESTION:
      let filterText3
      if (action.payload.filter === "About Me") {
        filterText3 = 'amQuestionList'
      } else {
        filterText3 = 'aoQuestionList'
      }
      console.log(filterText3, action.payload.questionText)
      console.log('filterText3', state[filterText3])
      let temp2 = [...state[filterText3]].filter(q => q.questionText !== action.payload.questionText)
      console.log('temp2', temp2)
      return {
        ...state,
        [filterText3]: [
          ...temp2
        ]
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
    case ADMIN_ADD_SURVEY:
      return {
        ...state,
      }
    case ADMIN_UPDATE_SURVEY:
      return {
        ...state,
      }
    case ADMIN_SEND_BULK_INVITATION:
      return {
        ...state,
      }
    case ADMIN_BULK_ARCHIVE_USER: {
      return {
        ...state,
      }
    }
    case DEL_MORE_INFO_PAGE: {
      return {
        ...state
      }
    }
    case ADMIN_DRIVER_LIST_SUCCESS: {
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          driverList: action.payload.driverList
        }
      }
    }
    default:
      return { ...state }
  }
}