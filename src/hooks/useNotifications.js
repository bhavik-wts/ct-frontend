import { useContext } from "react";
import NotificationContext from "../context/notificationContext";

export const useNotifications = () => {
  return useContext(NotificationContext);
};
