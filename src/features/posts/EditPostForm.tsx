import React, { useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../store";
import { postUpdated } from "./postsSlice";

interface Params {
  id: string;
}
const EditPostForm: React.FC = () => {
  const {
    params: { id },
  } = useRouteMatch<Params>();
  const existingPost = useSelector((state: State) =>
    state.posts.find((post) => post.id === id)
  ) || { id: "", title: "", content: "", userId: "" };
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

  const onSavePostClicked = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (content && title) {
      dispatch(postUpdated({ ...existingPost, title, content }));
      history.push("/");
    }
  };
  if (!existingPost.id) {
    return <div>No post found</div>;
  }
  return (
    <form>
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
        <input type="button" value="Submit" onClick={onSavePostClicked} />
      </div>
    </form>
  );
};

export default EditPostForm;
