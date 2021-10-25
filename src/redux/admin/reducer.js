import {
  ADMIN_USER_LIST,
  ADMIN_USER_LIST_SUCCESS,
  ADMIN_SET_USER_FIELD,
  ADMIN_UPDATE_USER_LIST,
} from 'Constants/actionTypes'

const INIT_STATE = {
  userList: [],
  loading: false,
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADMIN_USER_LIST:
      return { ...state, loading: true }
    case ADMIN_USER_LIST_SUCCESS:
      return { ...state, userList: action.payload.userList, loading: false }
    case ADMIN_SET_USER_FIELD:
      const { id, field, value } = action.payload
      return {
        ...state,
        userList: {
          ...state.userList,
          projectUser: state.userList.projectUser.map(user =>
            user.id === id
              ? { ...user, [field]: value }
              : user)
        }
      }
    default:
      return { ...state }
  }
}