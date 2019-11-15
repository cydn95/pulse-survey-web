import {
  AOQUESTION_LIST,
  AOQUESTION_LIST_SUCCESS,
  SUBMIT_AOQUESTION
} from "Constants/actionTypes";

const INIT_STATE = {
  aoQuestionList: [],
  optionList: [],
  loading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case AOQUESTION_LIST:
      return { ...state, loading: true };
    case AOQUESTION_LIST_SUCCESS:
      return { ...state, loading: false, aoQuestionList: action.payload.aoQuestionList, optionList: action.payload.optionList };
    case SUBMIT_AOQUESTION:
      return { ...state }
    default:
      return { ...state };
  }
};
