import { GUIDE_SHOW_STATUS } from "Constants/actionTypes";

export const guideShowStatus = (status) => ({
  type: GUIDE_SHOW_STATUS,
  payload: { status },
});
