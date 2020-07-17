import {
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
      return { ...state, nikelContent: nikelContent };
    case TOOLTIP_TOUR_CONTENT_SUCCESS:
      const tooltipContent = action.payload.content.sort((a, b) =>
        a.tooltipOrder >= b.tooltipOrder ? 1 : -1
      );

      const arrangedContent = {};

      for (let i = 0; i < tooltipContent.length; i++) {
        if (tooltipContent[i].group.toLowerCase() in arrangedContent) {
          arrangedContent[tooltipContent[i].group.toLowerCase()].push(
            tooltipContent[i]
          );
        } else {
          arrangedContent[tooltipContent[i].group.toLowerCase()] = [
            tooltipContent[i],
          ];
        }
      }

      return {
        ...state,
        tooltipContent: arrangedContent,
      };
    case PAGE_CONTENT_SUCCESS:
      return { ...state, pageContent: action.payload.content };
    default:
      return { ...state };
  }
};
