import {
  ADMIN_USER_LIST,
  ADMIN_USER_LIST_SUCCESS
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
    default:
      return { ...state }
  }
}