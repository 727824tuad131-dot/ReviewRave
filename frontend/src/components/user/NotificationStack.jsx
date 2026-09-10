
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from '../../store/slices/notificationSlice';
import './Login.css';

const NotificationItem = ({ notification }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeNotification(notification.id));
    }, 3000);
    return () => clearTimeout(timer);
  }, [dispatch, notification.id]);

  const type = notification.type === 'error' ? 'error' : 'success';

  return (
    <div
      className={`notification ${type}`}
      data-testid="notification-item"
    >
      <span>{notification.message || (type === 'error' ? 'Operation failed' : 'Operation successful')}</span>
      <button
        className="notification-close"
        onClick={() => dispatch(removeNotification(notification.id))}
        aria-label="Close notification"
      >
        x
      </button>
    </div>
  );
};

const NotificationStack = () => {
  const notifications = useSelector(
    (state) => state.notifications?.notifications || []
  );

  if (!notifications.length) return null;

  return (
    <div className="notification-stack" data-testid="notification-stack">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationStack;