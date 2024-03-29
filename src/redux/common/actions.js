import {
  ORGANIZATION_LIST,
  ORGANIZATION_LIST_SUCCESS,
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
  SHCATEGORY_LIST_SUCCESS,
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_STAKEHOLDER,
  ADD_STAKEHOLDER_SUCCESS,
  UPDATE_STAKEHOLDER,
  UPDATE_STAKEHOLDER_SUCCESS,
  STAKEHOLDER_ANSWER,
  CLEAR_COMMON,
  SET_TEAM_LIST,
} from "Constants/actionTypes";

export const organizationList = (surveyId = 0) => ({
  type: ORGANIZATION_LIST,
  payload: { surveyId },
});

export const organizationListSuccess = (data) => ({
  type: ORGANIZATION_LIST_SUCCESS,
  payload: { data },
});

export const teamList = (projectId = 0, surveyId = 0) => ({
  type: TEAM_LIST,
  payload: { projectId, surveyId },
});

export const setTeamList = (data) => ({
  type: SET_TEAM_LIST,
  payload: { data }
})

export const teamListSuccess = (teamList) => ({
  type: TEAM_LIST_SUCCESS,
  payload: { teamList },
});

export const shgroupList = (surveyId = 0) => ({
  type: SHGROUP_LIST,
  payload: { surveyId }
});

export const shgroupListSuccess = (shgroupList) => ({
  type: SHGROUP_LIST_SUCCESS,
  payload: { shgroupList },
});

export const optionList = () => ({
  type: OPTION_LIST,
});

export const optionListSuccess = (optionList) => ({
  type: OPTION_LIST_SUCCESS,
  payload: { optionList },
});

export const driverList = (surveyId) => ({
  type: DRIVER_LIST,
  payload: { surveyId },
});

export const driverListSuccess = (driverList) => ({
  type: DRIVER_LIST_SUCCESS,
  payload: { driverList },
});

export const skipQuestionList = () => ({
  type: SKIP_QUESTION_LIST,
});

export const skipQuestionListSuccess = (skipQuestionList) => ({
  type: SKIP_QUESTION_LIST_SUCCESS,
  payload: { skipQuestionList },
});

export const stakeholderList = (projectUserId, surveyId = 0, callback = null) => ({
  type: STAKEHOLDER_LIST,
  payload: { projectUserId, surveyId, callback },
});

export const stakeholderListSuccess = (stakeholderList, userList) => ({
  type: STAKEHOLDER_LIST_SUCCESS,
  payload: { stakeholderList, userList },
});

export const shCategoryList = (surveyId, mapType) => ({
  type: SHCATEGORY_LIST,
  payload: { surveyId, mapType },
});

export const shCategoryListSuccess = (shCategoryList) => ({
  type: SHCATEGORY_LIST_SUCCESS,
  payload: { shCategoryList },
});

export const addUser = (user) => ({
  type: ADD_USER,
  payload: { user },
});

export const addUserSuccess = (insertedUserId) => ({
  type: ADD_USER_SUCCESS,
  payload: { insertedUserId },
});

export const addStakeholder = (userId, projectId, surveyId, stakeholder, callback) => ({
  type: ADD_STAKEHOLDER,
  payload: { addByProjectUser_id: userId, projectId, surveyId, stakeholder, callback },
});

export const addStakeholderSuccess = () => ({
  type: ADD_STAKEHOLDER_SUCCESS,
});

export const updateStakeholder = (projectId, surveyId, stakeholder, callback = null) => ({
  type: UPDATE_STAKEHOLDER,
  payload: { projectId, surveyId, stakeholder, callback },
});

export const updateStakeholderSuccess = () => ({
  type: UPDATE_STAKEHOLDER_SUCCESS,
});

export const stakeholderAnswer = (projectUserId, questionId) => ({
  type: STAKEHOLDER_ANSWER,
  payload: { projectUserId, questionId },
});

export const clearCommon = () => ({
  type: CLEAR_COMMON
});

