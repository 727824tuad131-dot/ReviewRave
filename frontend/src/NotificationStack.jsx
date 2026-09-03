import React, {
  useEffect
} from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  removeNotification
} from "../store/slices/notificationSlice";

const NotificationItem = ({
  notification
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        removeNotification(
          notification.id
        )
      );
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [
    dispatch,
    notification.id
  ]);

  return (
    <div
      className={`notification notification-${notification.type}`}
    >

      <span>
        {notification.message}
      </span>

      <button
        onClick={() =>
          dispatch(
            removeNotification(
              notification.id
            )
          )
        }
      >
        ×
      </button>

    </div>
  );
};

const NotificationStack = () => {
  const {
    list
  } = useSelector(
    (state) => state.notifications
  );

  return (
    <div className="notification-stack">

      {list.map((notification) => (

        <NotificationItem
          key={notification.id}
          notification={notification}
        />

      ))}

    </div>
  );
};

export default NotificationStack;