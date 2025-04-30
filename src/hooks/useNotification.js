import { useNotifications } from "@/hooks/useNotifications";

let notificationId = 0;

const useNotification = () => {
  const { addNotification } = useNotifications();

  const triggerNotification = (message, type = "info") => {
    addNotification({
      id: notificationId++,
      message,
      type, // 'info', 'success', 'error', etc.
    });
  };

  return { triggerNotification };
};

export default useNotification;
