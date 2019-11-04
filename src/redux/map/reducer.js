import {
  USER_LIST,
  USER_LIST_SUCCESS,
  PROJECT_USER_LIST,
  PROJECT_USER_LIST_SUCCESS,
  KMAP_DATA,
  KMAP_DATA_SUCCESS
} from "Constants/actionTypes";

const INIT_STATE = {
  userList: [],
  projectUserList: [],
  kMapData: {},
  loading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case USER_LIST:
      return { ...state };
    case USER_LIST_SUCCESS:
      return { ...state, userList: action.payload.userList };
    case PROJECT_USER_LIST:
      return { ...state };
    case PROJECT_USER_LIST_SUCCESS:
      return { ...state, projectUserList: action.payload.projectUserList };
    case KMAP_DATA:
        return { ...state, loading: false };
    case KMAP_DATA_SUCCESS:
      return { ...state, loading: true, kMapData: action.payload.kMapData };
    default:
      return { ...state };
  }
};
