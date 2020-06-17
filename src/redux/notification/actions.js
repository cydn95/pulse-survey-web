import { SHOW_NOTIFICATION, CLOSE_NOTIFICATION } from "Constants/actionTypes";

export const showNotification = (type, message) => ({
  type: SHOW_NOTIFICATION,
  payload: { type, message },
});

export const closeNotification = (type, message) => ({
  type: CLOSE_NOTIFICATION,
});
