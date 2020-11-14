import React from "react";
import { useSelector } from "react-redux";
// eslint-disable-next-line
import { useRouteMatch, match } from "react-router-dom";
import { State } from "../../store";

interface MatchParams {
  id: string;
}

const SinglePostPage = () => {
  const match: match<MatchParams> = useRouteMatch();
  const {
    params: { id: PostId },
  } = match;
  const post = useSelector((state: State) =>
    state.posts.find((item) => item.id === PostId)
  );
  if (!(PostId && post)) {
    return <div>No post found</div>;
  }

  return (
    <section className="post">
      <article>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </article>
    </section>
  );
};

export default SinglePostPage;
