import {
  TEAM_LIST,
  TEAM_LIST_SUCCESS,
  SHGROUP_LIST,
  SHGROUP_LIST_SUCCESS,
  OPTION_LIST,
  OPTION_LIST_SUCCESS,
  DRIVER_LIST,
  DRIVER_LIST_SUCCESS,
  SKIP_QUESTION_LIST,
  SKIP_QUESTION_LIST_SUCCESS,
  STAKEHOLDER_LIST,
  STAKEHOLDER_LIST_SUCCESS,
  SHCATEGORY_LIST,
  SHCATEGORY_LIST_SUCCESS
} from 'Constants/actionTypes';

export const teamList = () => ({
  type: TEAM_LIST
});

export const teamListSuccess = (teamList) => ({
  type: TEAM_LIST_SUCCESS,
  payload: { teamList }
});

export const shgroupList = () => ({
  type: SHGROUP_LIST
});

export const shgroupListSuccess = (shgroupList) => ({
  type: SHGROUP_LIST_SUCCESS,
  payload: {shgroupList}
});

export const optionList = () => ({
  type: OPTION_LIST
});

export const optionListSuccess = (optionList) => ({
  type: OPTION_LIST_SUCCESS,
  payload: { optionList }
});

export const driverList = () => ({
  type: DRIVER_LIST
});

export const driverListSuccess = (driverList) => ({
  type: DRIVER_LIST_SUCCESS,
  payload: { driverList }
});

export const skipQuestionList = () => ({
  type: SKIP_QUESTION_LIST
});

export const skipQuestionListSuccess = (skipQuestionList) => ({
  type: SKIP_QUESTION_LIST_SUCCESS,
  payload: { skipQuestionList }
});

export const stakeholderList = (projectId) => ({
  type: STAKEHOLDER_LIST,
  payload: { projectId }
});

export const stakeholderListSuccess = (stakeholderList, userList) => ({
  type: STAKEHOLDER_LIST_SUCCESS,
  payload: { stakeholderList, userList }
});

export const shCategoryList = () => ({
  type: SHCATEGORY_LIST
});

export const shCategoryListSuccess = (shCategoryList ) => ({
  type: SHCATEGORY_LIST_SUCCESS,
  payload: { shCategoryList }
});