import React, { useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectPostById, State } from "../../store";
import { updatePost, Post } from "./postsSlice";

interface Params {
  id: string;
}
const EditPostForm: React.FC = () => {
  const {
    params: { id },
  } = useRouteMatch<Params>();
  const existingPost = useSelector<State, Post | undefined>((state) =>
    selectPostById(state, id)
  );
  const [title, setTitle] = useState(existingPost?.title);
  const [content, setContent] = useState(existingPost?.content);

  const dispatch = useDispatch();
  const history = useHistory();

  const onTitleChanged = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onContentChanged = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };

  const onSavePostClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (content && title) {
      dispatch(updatePost({ ...existingPost, title, content } as Post));
      history.push("/");
    }
  };
  if (!existingPost) {
    return <div>No post found</div>;
  }
  return (
    <form>
      <h2>Edit Post</h2>
      <div className="field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={onTitleChanged}
        />
      </div>
      <div className="field">
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
      <div className="field">
        <button value="Submit" onClick={onSavePostClicked}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditPostForm;
