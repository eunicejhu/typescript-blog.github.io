import React, { useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../store";
import { postUpdated } from "./postsSlice";
const EditPostForm: React.FC = () => {
  const {
    params: { id },
  } = useRouteMatch();
  const existingPost = useSelector((state: State) =>
    state.posts.find((post) => post.id === id)
  );
  if (!existingPost) {
    return <div>No post found</div>;
  }
  const [title, setTitle] = useState(existingPost.title);
  const [content, setContent] = useState(existingPost.content);

  const dispatch = useDispatch();
  const history = useHistory();

  const onTitleChanged = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onContentChanged = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };

  const onSavePostClicked = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content && title) {
      dispatch(postUpdated({ id: existingPost.id, title, content }));
      history.push("/");
    }
  };

  return (
    <form onSubmit={onSavePostClicked}>
      <h1>Edit Post</h1>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={onTitleChanged}
        />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          cols={30}
          rows={10}
          value={content}
          onChange={onContentChanged}
        ></textarea>
      </div>
      <div>
        <input type="button" value="Submit" />
      </div>
    </form>
  );
};

export default EditPostForm;
