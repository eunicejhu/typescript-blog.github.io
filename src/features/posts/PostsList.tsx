import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch, Link } from "react-router-dom";
import AddPostForm from "./AddPostForm";
import { selectAllPosts } from "../../store/selectors";
import { State } from "../../store/types";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { fetchPosts } from "./postsSlice";
import { useAppDispatch } from "../../store/index";

const PostsList = () => {
  const { path } = useRouteMatch();
  const dispatch = useAppDispatch();
  const postsStatus = useSelector((state: State) => state.posts.status);
  const postsError = useSelector((state: State) => state.posts.error);
  const posts = useSelector(selectAllPosts);

  let content;

  useEffect(() => {
    if (postsStatus === "idle") dispatch(fetchPosts());
  }, [dispatch, postsStatus]);

  const sortedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
  const renderedPosts = sortedPosts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <PostAuthor userId={post.userId} />
      <TimeAgo date={post.date} />
      <p>
        <Link to={`${path}posts/${post.id}`}>See more</Link>
      </p>
      <ReactionButtons post={post} />
    </article>
  ));

  if (postsStatus === "loading") {
    content = <div>loading...</div>;
  } else if (postsStatus === "succeeded") {
    if (posts.length) {
      content = renderedPosts;
    } else {
      content = <div>No post</div>;
    }
  } else if (postsError) {
    content = <div>{postsError}</div>;
  }
  return (
    <>
      <section className="add-post-form">
        <AddPostForm />
      </section>
      <section className="posts-list">
        <h2>Posts</h2>
        {content}
      </section>
    </>
  );
};

export default PostsList;
