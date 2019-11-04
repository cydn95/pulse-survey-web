import {
  TEAM_LIST,
  TEAM_LIST_SUCCESS,
  SHGROUP_LIST,
  SHGROUP_LIST_SUCCESS
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
