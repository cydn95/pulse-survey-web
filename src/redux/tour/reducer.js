import {
  GUIDE_SHOW_STATUS,
  NIKEL_TOUR_CONTENT_SUCCESS,
  TOOLTIP_TOUR_CONTENT_SUCCESS,
  PAGE_CONTENT_SUCCESS,
} from "Constants/actionTypes";

const INIT_STATE = {
  guide: localStorage.getItem("guide") === "true",
  nikelContent: [],
  tooltipContent: [],
  pageContent: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GUIDE_SHOW_STATUS:
      return { ...state, guide: action.payload.status };
    case NIKEL_TOUR_CONTENT_SUCCESS:
      const { content } = action.payload;
      const nikelContent = [];
      for (let i = 0; i < content.length; i++) {
        nikelContent.push({
          background: content[i].backgroundColor,
          img: content[i].img,
          title: content[i].pageName,
          content: content[i].pageContent,
        });
      }
      return { ...state, 'nikelContent': nikelContent };
    case TOOLTIP_TOUR_CONTENT_SUCCESS:
      return { ...state, tooltipContent: action.payload.content };
    case PAGE_CONTENT_SUCCESS:
      return { ...state, pageContent: action.payload.content };
    default:
      return { ...state };
  }
};
