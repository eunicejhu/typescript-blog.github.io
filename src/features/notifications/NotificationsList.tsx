import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllNotifications, selectAllUsers } from "../../store/selectors";
import { useAppDispatch } from "../../store/index";
import { fetchAll } from "./notificationsSlice";
import TimeAgo from "../posts/TimeAgo";
import { unwrapResult } from "@reduxjs/toolkit";
const NotificationsList: React.FC = () => {
  const users = useSelector(selectAllUsers);
  const notifications = useSelector(selectAllNotifications);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  let content;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const resultAction = await dispatch(fetchAll());
        unwrapResult(resultAction);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [dispatch]);
  const renderedNotifications = notifications.map((notification) => {
    const author = users.find((user) => user.id === notification.userId)?.name;
    return (
      <article key={notification.id}>
        <p>
          <b>{author}</b>: <span>{notification.message}</span>
        </p>
        <p>
          <TimeAgo date={notification.date}></TimeAgo>
        </p>
      </article>
    );
  });

  if (isLoading) {
    content = <p>Loading...</p>;
  } else {
    content = renderedNotifications;
  }
  return (
    <div>
      <h2>Notifications List</h2>
      {content}
    </div>
  );
};

export default NotificationsList;
