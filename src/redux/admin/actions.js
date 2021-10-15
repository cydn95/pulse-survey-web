import {
  ADMIN_USER_LIST,
  ADMIN_USER_LIST_SUCCESS
} from 'Constants/actionTypes'

export const adminUserList = (surveyId) => ({
  type: ADMIN_USER_LIST,
  payload: { surveyId }
})

export const adminUserListSuccess = (userList) => ({
  type: ADMIN_USER_LIST_SUCCESS,
  payload: { userList }
})