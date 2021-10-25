import {
  ADMIN_USER_LIST,
  ADMIN_USER_LIST_SUCCESS,
  ADMIN_SET_USER_FIELD,
  ADMIN_UPDATE_USER_LIST,
} from 'Constants/actionTypes'

export const adminUserList = (surveyId) => ({
  type: ADMIN_USER_LIST,
  payload: { surveyId }
})

export const adminUserListSuccess = (userList) => ({
  type: ADMIN_USER_LIST_SUCCESS,
  payload: { userList }
})

export const adminSetUserField = (id, field, value) => ({
  type: ADMIN_SET_USER_FIELD,
  payload: { id, field, value }
})

export const adminUpdateUserList = (data, callback) => ({
  type: ADMIN_UPDATE_USER_LIST,
  payload: { data, callback }
})