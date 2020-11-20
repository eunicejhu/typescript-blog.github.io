import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllNotifications } from "../../store/selectors";
import { useAppDispatch } from "../../store/index";
import { fetchAll } from "./notificationsSlice";
import TimeAgo from "../posts/TimeAgo";
import { unwrapResult } from "@reduxjs/toolkit";
const NotificationsList: React.FC = () => {
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
  const renderedNotifications = notifications.map((notification) => (
    <article key={notification.id}>
      <p>
        <b>author.name</b>: <span>{notification.message}</span>
      </p>
      <p>
        <TimeAgo date={notification.date}></TimeAgo>
      </p>
    </article>
  ));

  if (isLoading) {
    content = <p>Loading...</p>;
  } else {
    content = (
      <div>
        <h2>Notifications List</h2>
        {renderedNotifications}
      </div>
    );
  }
  return <>{content}</>;
};

export default NotificationsList;
