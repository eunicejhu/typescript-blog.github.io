import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../store";

const PostAuthor: React.FC<{ userId: string }> = ({ userId }) => {
  const user = useSelector((state: State) =>
    state.users.data.find((user) => user.id === userId)
  );
  return (
    <span className="post-author">
      By {user ? user.name : "Unknown author"}
    </span>
  );
};
export default PostAuthor;
