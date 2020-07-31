import {
  NIKEL_TOUR_CONTENT,
  NIKEL_TOUR_CONTENT_SUCCESS,
  TOOLTIP_TOUR_CONTENT,
  TOOLTIP_TOUR_CONTENT_SUCCESS,
  PAGE_CONTENT,
  PAGE_CONTENT_SUCCESS,
} from "Constants/actionTypes";

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

export const pageContent = (surveyId = 0) => ({
  type: PAGE_CONTENT,
  payload: { surveyId },
});

export const pageContentSuccess = (content) => ({
  type: PAGE_CONTENT_SUCCESS,
  payload: { content },
});
