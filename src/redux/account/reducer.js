import {
  UPDATE_GUIDE_STATUS_SUCCESS,
  GET_PROFILE_SUCCESS,
} from "Constants/actionTypes";

const INIT_STATE = {
  profile: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    team: "",
    organization: "",
    avatarId: 0,
    avatar: "",
    guide: false,
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PROFILE_SUCCESS:
      return { ...state, profile: action.payload.profile };
    case UPDATE_GUIDE_STATUS_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, guide: action.payload.status },
      };
    default:
      return { ...state };
  }
};
