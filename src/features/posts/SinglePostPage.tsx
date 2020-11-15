import React from "react";
import { useSelector } from "react-redux";
// eslint-disable-next-line
import { useRouteMatch, match, Link } from "react-router-dom";
import { State } from "../../store";
import PostAuthor from "./PostAuthor";

interface MatchParams {
  id: string;
}

const SinglePostPage = () => {
  const match: match<MatchParams> = useRouteMatch();
  const {
    params: { id: postId },
  } = match;
  const post = useSelector((state: State) =>
    state.posts.find((item) => item.id === postId)
  );
  if (!(postId && post)) {
    return <div>No post found</div>;
  }

  return (
    <section className="post">
      <article>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <PostAuthor userId={post.userId} />
        <Link to={`/editPost/${postId}`}>Edit</Link>
      </article>
    </section>
  );
};

export default SinglePostPage;
