import { GET_PROFILE_SUCCESS } from "Constants/actionTypes";

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
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PROFILE_SUCCESS:
      return { ...state, profile: action.payload.profile };
    default:
      return { ...state };
  }
};
