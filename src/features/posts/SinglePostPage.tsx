import React from "react";
import { useSelector } from "react-redux";
// eslint-disable-next-line
import { useRouteMatch, match, Link } from "react-router-dom";
import { selectPostById } from "../../store/selectors";
import { State } from "../../store/types";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

interface MatchParams {
  id: string;
}

const SinglePostPage = () => {
  const match: match<MatchParams> = useRouteMatch();
  const {
    params: { id: postId },
  } = match;
  const post = useSelector((state: State) => selectPostById(state, postId));
  if (!post) {
    return <div>No post found</div>;
  }

  return (
    <section className="post">
      <article>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        <PostAuthor userId={post.userId} />
        <TimeAgo date={post.date} />
        <p>
          <Link to={`/editPost/${postId}`}>Edit</Link>
        </p>

        <ReactionButtons post={post} />
      </article>
    </section>
  );
};

export default SinglePostPage;
