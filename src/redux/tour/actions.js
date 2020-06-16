import {
  GUIDE_SHOW_STATUS,
  NIKEL_TOUR_CONTENT,
  NIKEL_TOUR_CONTENT_SUCCESS,
  TOOLTIP_TOUR_CONTENT,
  TOOLTIP_TOUR_CONTENT_SUCCESS,
  PAGE_CONTENT,
  PAGE_CONTENT_SUCCESS,
} from "Constants/actionTypes";

export const guideShowStatus = (status) => ({
  type: GUIDE_SHOW_STATUS,
  payload: { status },
});

export const nikelTourContent = () => ({
  type: NIKEL_TOUR_CONTENT,
});

export const nikelTourContentSuccess = (content) => ({
  type: NIKEL_TOUR_CONTENT_SUCCESS,
  payload: { content },
});

export const tooltipTourContent = () => ({
  type: TOOLTIP_TOUR_CONTENT,
});

export const tooltipTourContentSuccess = (content) => ({
  type: TOOLTIP_TOUR_CONTENT_SUCCESS,
  payload: { content },
});

export const pageContent = () => ({
  type: PAGE_CONTENT,
});

export const pageContentSuccess = (content) => ({
  type: PAGE_CONTENT_SUCCESS,
  payload: { content },
});
