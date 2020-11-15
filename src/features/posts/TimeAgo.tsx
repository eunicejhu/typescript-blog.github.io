import React from "react";
import getTimeAgo from "../../utils/getTimeAgo";

const TimeAgo: React.FC<{ date: string }> = ({ date }) => {
  const timeAgo = getTimeAgo(date);
  const hasValidTimeAgo = Boolean(timeAgo);
  return (
    <div className="date">{`${hasValidTimeAgo ? timeAgo + " ago" : ""}`} </div>
  );
};
export default TimeAgo;
