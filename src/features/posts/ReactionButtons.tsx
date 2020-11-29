import React from "react";
import { useDispatch } from "react-redux";
import { Post, addReaction } from "./postsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

type Props = { post: Post };
type Name = keyof Props["post"]["reactions"];
const ReactionButtons: React.FC<Props> = ({
  post: { reactions, id },
}: Props) => {
  const dispatch = useDispatch();
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => (
    <button
      key={name}
      type="button"
      name={name}
      data-testid={name}
      onClick={() =>
        dispatch(addReaction({ postId: id, reaction: name as Name }))
      }
    >
      {emoji} {reactions[name as Name]}
    </button>
  ));
  return <div className="reactions-container">{reactionButtons}</div>;
};

export default ReactionButtons;
