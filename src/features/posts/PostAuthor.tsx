import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../store";

const PostAuthor: React.FC<{ id: string }> = ({ id }) => {
  const user = useSelector((state: State) =>
    state.users.find((user) => user.id === id)
  );
  return (
    <span className="post-author">
      By {user ? user.name : "Unknown author"}
    </span>
  );
};
export default PostAuthor;
