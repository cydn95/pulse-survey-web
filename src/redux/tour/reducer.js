import { GUIDE_SHOW_STATUS } from "Constants/actionTypes";

const INIT_STATE = {
  guide: localStorage.getItem("guide") === "true",
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GUIDE_SHOW_STATUS:
      return { ...state, guide: action.payload.status };
    default:
      return { ...state };
  }
};
