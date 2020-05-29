import {
  SET_TOUR_VIEW_VALUE
} from "Constants/actionTypes";

export const  setTourViewValue= (key, value) => ({
    type: SET_TOUR_VIEW_VALUE,
    payload: { key, value }
});
