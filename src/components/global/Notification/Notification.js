"use client";

import React, { useEffect } from "react";
import { useNotifications } from "@/hooks/useNotifications";

// Notification Component
const Notification = ({ notification, onDismiss }) => {
  useEffect(() => {
    // Automatically remove notification after 5 seconds
    const timer = setTimeout(() => {
      document.querySelector(".toaster-wrapper").classList.add("hide");
      setTimeout(() => {
        onDismiss(notification.id);
      }, 200); // Match with the slide-out animation duration
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification]);

  const getNotificationStyle = (type) => {
    switch (type) {
      case "success":
        return {
          icon: "/images/toaster-success.svg",
          alt: "Success",
          className: "notification-success",
        };
      case "error":
        return {
          icon: "/images/toaster-warning.svg",
          alt: "Error",
          className: "notification-error",
        };
    }
  };

  const { icon, alt, className } = getNotificationStyle(notification.type);

  return (
    <div className={`toaster-wrapper ${className}`}>
      <img src={icon} alt={alt} />
      <h6>{notification.message}</h6>
      <img
        onClick={() => onDismiss(notification.id)}
        src="/images/close.svg"
        alt="close"
        className="close"
      />
    </div>
  );
};

const NotificationList = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="notification-list">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onDismiss={removeNotification}
        />
      ))}
    </div>
  );
};

export default NotificationList;
