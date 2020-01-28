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
  SHCATEGORY_LIST_SUCCESS,
  ADD_STAKEHOLDER,
  ADD_STAKEHOLDER_SUCCESS
} from "Constants/actionTypes";

const INIT_STATE = {
  teamList: [],
  shgroupList: [],
  optionList: [],
  driverList: [],
  skipQuestionList: [],
  stakeholderList: [],
  shCategoryList: [],
  userList: [],
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
    case OPTION_LIST:
      return { ...state };
    case OPTION_LIST_SUCCESS:
      return { ...state, optionList: action.payload.optionList };
    case DRIVER_LIST:
      return { ...state };
    case DRIVER_LIST_SUCCESS:
      return { ...state, driverList: action.payload.driverList };
    case SKIP_QUESTION_LIST:
      return { ...state };
    case SKIP_QUESTION_LIST_SUCCESS:
      return { ...state, skipQuestionList: action.payload.skipQuestionList };
    case STAKEHOLDER_LIST:
      return { ...state };
    case STAKEHOLDER_LIST_SUCCESS:
      return { ...state, stakeholderList: action.payload.stakeholderList, userList: action.payload.userList };
    case SHCATEGORY_LIST:
      return { ...state };
    case SHCATEGORY_LIST_SUCCESS:
      return { ...state, shCategoryList: action.payload.shCategoryList };
    case ADD_STAKEHOLDER:
      return { ...state, loading: true };
    case ADD_STAKEHOLDER_SUCCESS:
      return { ...state, load: false };
    default:
      return { ...state };
  }
};
