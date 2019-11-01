import {
  PAGE_LIST,
  PAGE_LIST_SUCCESS,
  SELECT_PAGE,
  CONTINUE_SURVEY,
  INPUT_ANSWER
} from "Constants/actionTypes";

const INIT_STATE = {
  pageList: [],
  percentage: 0,
  pageIndex: 0,
  loading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PAGE_LIST:
      return { ...state, loading: true };
    case PAGE_LIST_SUCCESS:
      return { ...state, loading: false, pageIndex: 0, pageList: action.payload };
    case SELECT_PAGE:
      return { ...state, pageIndex: action.payload.pageIndex };
    case CONTINUE_SURVEY:
      return { ...state, pageIndex: action.payload.pageIndex, percentage: action.payload.percentage };
    case INPUT_ANSWER:
      const { answer } = action.payload;
        
      if (answer.type === 'me') {
        state.pageList[answer.pageIndex].pages.ampagesetting[answer.questionIndex].answer = {
          ...answer
        };
      } else {
        state.pageList[answer.pageIndex].pages.aopagesetting[answer.questionIndex].answer = {
          ...answer
        };
      }
      return { ...state };
    default:
      return { ...state };
  }
};
