import {
  SHOW_NOTIFICATION,
  CLOSE_NOTIFICATION
} from "Constants/actionTypes";

const INIT_STATE = {
  show: true,
  type: '',
  message: ''
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return { ...state, show: true, type: action.payload.type, message: action.payload.message };
    case CLOSE_NOTIFICATION:
      return { ...state, show: false };
    default:
      return { ...state };
  }
};
  