import {
  USER_LIST,
  USER_LIST_SUCCESS,
  PROJECT_USER_LIST,
  PROJECT_USER_LIST_SUCCESS,
  KMAP_DATA,
  KMAP_DATA_SUCCESS
} from 'Constants/actionTypes';

export const userList = () => ({
  type: USER_LIST
});

export const userListSuccess = (userList) => ({
  type: USER_LIST_SUCCESS,
  payload: { userList }
});

export const projectUserList = () => ({
  type: PROJECT_USER_LIST
});

export const projectUserListSuccess = (projectUserList) => ({
  type: PROJECT_USER_LIST_SUCCESS,
  payload: { projectUserList }
});

export const kMapData = () => ({
  type: KMAP_DATA
});

export const kMapDataSuccess = (kMapData) => ({
  type: KMAP_DATA_SUCCESS,
  payload: { kMapData }
});