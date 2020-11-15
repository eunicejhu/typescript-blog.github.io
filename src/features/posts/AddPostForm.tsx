import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./postsSlice";
import { State } from "../../store";
const AddPostForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();

  const users = useSelector((state: State) => state.users);

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

  const onAddPostClicked = (e: React.SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (title && content && userId) {
      dispatch(postAdded({ title, content, userId }));
      setTitle("");
      setContent("");
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
          <select
            data-testid="users"
            value={userId}
            name="users"
            id="users"
            onChange={onUserChanged}
          >
            {renderUsersOptions}
          </select>
        </div>
        <div className="field">
          <input type="submit" value="Add Post" onClick={onAddPostClicked} />
        </div>
      </form>
    </div>
  );
};

export default AddPostForm;
