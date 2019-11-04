import {
  TEAM_LIST,
  TEAM_LIST_SUCCESS,
  SHGROUP_LIST,
  SHGROUP_LIST_SUCCESS
} from "Constants/actionTypes";

const INIT_STATE = {
  teamList: [],
  shgroupList: [],
  loading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TEAM_LIST:
      return { ...state };
    case TEAM_LIST_SUCCESS:
      return { ...state, teamList: action.payload.teamList };
    case SHGROUP_LIST:
      return { ...state };
    case SHGROUP_LIST_SUCCESS:
      return { ...state, shgroupList: action.payload.shgroupList };
    default:
      return { ...state };
  }
};
