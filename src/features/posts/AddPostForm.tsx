import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./postsSlice";
import { State } from "../../store";
const AddPostForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();

  const users = useSelector((state: State) => state.users.data);

  const renderUsersOptions =
    users &&
    users.map((user) => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ));
  const onTitleChanged = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onContentChanged = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };
  const onUserChanged = (e: React.SyntheticEvent<HTMLSelectElement>) => {
    setUserId(e.currentTarget.value);
  };

  const canAdd = Boolean(title) && Boolean(content) && Boolean(userId);

  const onAddPostClicked = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (canAdd) {
      dispatch(postAdded({ title, content, userId }));
      setTitle("");
      setContent("");
      setUserId("");
    }
  };

  return (
    <div className="add-post">
      <form>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            data-testid="title"
            name="title"
            width={20}
            value={title}
            onChange={onTitleChanged}
          />
        </div>
        <div className="field">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            data-testid="content"
            name="content"
            value={content}
            onChange={onContentChanged}
          ></textarea>
        </div>
        <div className="field">
          <label htmlFor="users">Author</label>
          <select
            data-testid="users"
            value={userId}
            name="users"
            id="users"
            onChange={onUserChanged}
          >
            <option value=""></option>
            {renderUsersOptions}
          </select>
        </div>
        <div className="field">
          <button type="button" onClick={onAddPostClicked} disabled={!canAdd}>
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPostForm;
