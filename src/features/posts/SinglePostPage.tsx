import React from "react";
import { useSelector } from "react-redux";
// eslint-disable-next-line
import { useRouteMatch, match, Link } from "react-router-dom";
import { State, selectPostById } from "../../store";
import { Post } from "./postsSlice";
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
  const post = useSelector<State, Post | undefined>((state) =>
    selectPostById(state, postId)
  );
  if (!post) {
    return <div>No post found</div>;
  }

  return (
    <section className="post">
      <article>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <PostAuthor userId={post.userId} />
        <TimeAgo date={post.date} />
        <Link to={`/editPost/${postId}`}>Edit</Link>
        <ReactionButtons post={post} />
      </article>
    </section>
  );
};

export default SinglePostPage;
