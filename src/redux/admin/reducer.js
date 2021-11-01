import {
  ADMIN_PROJECT_LIST,
  ADMIN_PROJECT_LIST_SUCCESS,
  ADMIN_USER_LIST,
  ADMIN_USER_LIST_SUCCESS,
  ADMIN_USER_LIST_FAILURE,
  ADMIN_SET_USER_FIELD,
  ADMIN_SET_PROJECT_FIELD,
  ADMIN_SET_CURRENT_PROJECT,
  ADMIN_SET_ACTIVE_REQUEST,
} from 'Constants/actionTypes'

const INIT_STATE = {
  userList: {},
  projectList: [],
  currentProject: {},
  surveyId: '',
  loading: false,
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
          projectUser: state.userList.projectUser.map(user =>
            user.id === action.payload.id
              ? { ...user, [action.payload.field]: action.payload.value }
              : user)
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
    case ADMIN_SET_ACTIVE_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    default:
      return { ...state }
  }
}