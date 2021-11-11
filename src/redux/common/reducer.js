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
  ADD_STAKEHOLDER_SUCCESS,
  UPDATE_STAKEHOLDER,
  UPDATE_STAKEHOLDER_SUCCESS,
  STAKEHOLDER_ANSWER,
  CLEAR_COMMON,
  SET_TEAM_LIST
} from "Constants/actionTypes";

import { SH_CATEGORY_TYPE } from "Constants/defaultValues";

const INIT_STATE = {
  teamList: [],
  shgroupList: [],
  optionList: [],
  driverList: [],
  skipQuestionList: [],
  stakeholderList: [],
  shCategoryList: [],
  projectMapShCategoryList: [],
  userList: [],
  loading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TEAM_LIST:
      return { ...state };
    case SET_TEAM_LIST:
      return { ...state, teamList: action.payload.data }
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
      return {
        ...state,
        stakeholderList: [...action.payload.stakeholderList],
        userList: [...action.payload.userList],
      };
    case SHCATEGORY_LIST:
      return { ...state };
    case SHCATEGORY_LIST_SUCCESS:
      const { shCategoryList } = action.payload;
      const myMapShCategoryList = [];
      const projectMapShCategoryList = [];

      shCategoryList.forEach((item) => {
        if (item.mapType === SH_CATEGORY_TYPE.MY_MAP) {
          myMapShCategoryList.push(item);
        } else if (item.mapType === SH_CATEGORY_TYPE.PROJECT_MAP) {
          projectMapShCategoryList.push(item);
        }
      });

      return {
        ...state,
        shCategoryList: myMapShCategoryList,
        projectMapShCategoryList: projectMapShCategoryList,
      };
    case ADD_STAKEHOLDER:
      return { ...state, loading: true };
    case ADD_STAKEHOLDER_SUCCESS:
      return { ...state, load: false };
    case UPDATE_STAKEHOLDER:
      return { ...state, loading: true };
    case UPDATE_STAKEHOLDER_SUCCESS:
      return { ...state, load: false };
    case STAKEHOLDER_ANSWER:
      const { projectUserId, questionId } = action.payload;
      for (let i = 0; i < state.stakeholderList.length; i++) {
        if (state.stakeholderList[i].projectUserId.toString() === projectUserId.toString()) {
          state.stakeholderList[i].aoResponse.push(questionId);
          state.stakeholderList[i].aoResponse = state.stakeholderList[
            i
          ].aoResponse.filter((item, index) => {
            return state.stakeholderList[i].aoResponse.indexOf(item) === index;
          });
          state.stakeholderList[i].aoAnswered =
            state.stakeholderList[i].aoResponse.length;
          break;
        }
      }

      return { ...state };
    case CLEAR_COMMON:
      return { ...INIT_STATE };
    default:
      return { ...state };
  }
};
