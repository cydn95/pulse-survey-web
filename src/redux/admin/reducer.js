import {
  ADMIN_PROJECT_LIST,
  ADMIN_PROJECT_LIST_SUCCESS,
  ADMIN_USER_LIST,
  ADMIN_USER_LIST_SUCCESS,
  ADMIN_SET_USER_FIELD,
  ADMIN_SET_PROJECT_FIELD,
  ADMIN_SET_CURRENT_PROJECT,
} from 'Constants/actionTypes'

const INIT_STATE = {
  userList: {},
  projectList: [],
  currentProject: {},
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
      console.log('data', action.payload.data)
      return {
        ...state,
        currentProject: action.payload.data,
      }
    case ADMIN_SET_PROJECT_FIELD:
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          [action.paylaod.field]: action.paylaod.value
        }
      }
    default:
      return { ...state }
  }
}