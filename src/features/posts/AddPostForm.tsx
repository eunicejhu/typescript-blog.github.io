import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addNewPost } from "./postsSlice";
import { State, useAppDispatch } from "../../store";
import { unwrapResult } from "@reduxjs/toolkit";
const AddPostForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [addRequestError, setAddRequestError] = useState(undefined);

  const dispatch = useAppDispatch();

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

  const canAdd =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onAddPostClicked = async () => {
    if (canAdd) {
      try {
        setAddRequestStatus("pending");
        const resultAction = await dispatch(
          addNewPost({ title, content, userId })
        );
        unwrapResult(resultAction);
        setTitle("");
        setContent("");
        setUserId("");
      } catch (error) {
        setAddRequestError(error.message);
        setTimeout(() => {
          setAddRequestError(undefined);
        }, 1000);
        console.error("Failed to save the post: ", error.message);
      } finally {
        setAddRequestStatus("idle");
      }
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
            <option value="1">hello</option>
            {renderUsersOptions}
          </select>
        </div>
        <div className="field">
          <button type="button" onClick={onAddPostClicked} disabled={!canAdd}>
            Add Post
          </button>{" "}
          <span>{addRequestError}</span>
        </div>
      </form>
    </div>
  );
};

export default AddPostForm;
