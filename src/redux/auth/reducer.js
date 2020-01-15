import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  LOGOUT_USER,
  PROJECT_ID
} from "Constants/actionTypes";

const INIT_STATE = {
  user: {
    userId: localStorage.getItem("userId"),
    accessToken: localStorage.getItem("accessToken")
  },
  projectId: localStorage.getItem("projectId"),
  loading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PROJECT_ID:
      return { ...state, projectId: action.payload.projectId };
    case LOGIN_USER:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
      //notify.success('Login Success');
      return { ...state, loading: false, user: action.payload };
    case REGISTER_USER:
      return { ...state, loading: true };
    case REGISTER_USER_SUCCESS:
      //notify.success('Register User Success');
      return { ...state, loading: false, user: action.payload.uid };
    case LOGOUT_USER:
      return { ...state, user: { accessToken: '' } };
    default:
      return { ...state };
  }
};
