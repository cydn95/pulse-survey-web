import {
  ADMIN_USER_LIST,
  ADMIN_USER_LIST_SUCCESS
} from 'Constants/actionTypes'

const INIT_STATE = {
  userList: [],
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADMIN_USER_LIST:
      return { ...state }
    case ADMIN_USER_LIST_SUCCESS:
      return { ...state, userList: action.payload.userList }
    default:
      return { ...state }
  }
}