import React from "react";
import getTimeAgo from "../../utils/getTimeAgo";

const TimeAgo: React.FC<{ date: string }> = ({ date }) => {
  let timeAgo = getTimeAgo(date);
  if (Boolean(timeAgo)) {
    timeAgo += " ago";
  }
  return (
    <span className="date">
      {" "}
      <i>{timeAgo}</i>{" "}
    </span>
  );
};
export default TimeAgo;
