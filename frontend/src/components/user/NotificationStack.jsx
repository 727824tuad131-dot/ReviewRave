import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeNotification } from "../../store/slices/notificationSlice";

const NotificationStack = () => {
  const dispatch = useDispatch();

  const notifications = useSelector(
    (state) => state.notifications?.items || state.notifications || []
  );

  useEffect(() => {
    if (!notifications.length) return;

    const timers = notifications.map((notification) =>
      setTimeout(() => {
        dispatch(removeNotification(notification.id));
      }, 3000)
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [notifications, dispatch]);

  if (!notifications.length) {
    return null;
  }

  return (
    <div className="notification-stack" aria-live="polite">
      {notifications.map((notification) => {
        const type = notification.type || "info";

        return (
          <div
            key={notification.id}
            className={`notification notification-${type}`}
            role="alert"
          >
            <div className="notification-icon">
              {type === "success" && "✓"}
              {type === "warning" && "!"}
              {type === "error" && "×"}
              {type === "info" && "i"}
            </div>

            <div className="notification-content">
              <span className="notification-message">
                {notification.message}
              </span>
            </div>

            <button
              type="button"
              className="notification-close"
              onClick={() => dispatch(removeNotification(notification.id))}
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationStack;

