import { storeActions } from "./store-slice";
import { AppThunk } from ".";
import { Notification } from "@/types/redux";
export const showNotification =
  (notification: Notification): AppThunk =>
  (dispatch) => {
    dispatch(storeActions._showNotification(notification));
    setTimeout(() => {
      dispatch(storeActions.hideNotification());
    }, 3000);
  };
