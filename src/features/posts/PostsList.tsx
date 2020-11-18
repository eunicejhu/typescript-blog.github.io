import React from "react";
import { useSelector } from "react-redux";
import { useRouteMatch, Link } from "react-router-dom";
import AddPostForm from "./AddPostForm";
import { selectAllPosts } from "../../store";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
const PostsList = () => {
  const { path } = useRouteMatch();
  const posts = useSelector(selectAllPosts);
  const sortedPosts =
    posts && posts.slice().sort((a, b) => a.date.localeCompare(b.date));
  const renderPosts =
    sortedPosts &&
    sortedPosts.map((post) => (
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

  return (
    <>
      <section className="add-post-form">
        <AddPostForm />
      </section>
      <section className="posts-list">
        <h2>Posts</h2>
        {posts && posts.length ? renderPosts : "No posts"}
      </section>
    </>
  );
};

export default PostsList;
