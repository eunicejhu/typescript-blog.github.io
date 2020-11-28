import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addNewPost } from "./postsSlice";
import { State, useAppDispatch } from "../../store";
import { unwrapResult } from "@reduxjs/toolkit";
import useTheme from "../../hooks/useTheme";
import Button from "../../components/buttons/Button";
import Select from "../../components/select/Select";
import StyledForm from "../../components/form/StyledForm";

const ERROR_MSG_FOR_USER = "Failed to add new post";

const AddPostForm: React.FC = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");
    const [addRequestStatus, setAddRequestStatus] = useState("idle");
    const [addRequestError, setAddRequestError] = useState("");

    const { themes, mode } = useTheme();

    const dispatch = useAppDispatch();

    const users = useSelector((state: State) => state.users.data);

    const onTitleChanged = (e: React.SyntheticEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    const onContentChanged = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
        setContent(e.currentTarget.value);
    };
    const onUserChanged = (value: string) => {
        setUserId(value);
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
                //Improve: log error for Dev
                console.error(error.message);

                setAddRequestError(ERROR_MSG_FOR_USER);
                setTimeout(() => {
                    setAddRequestError("");
                }, 1000);
                console.error("Failed to save the post: ", error.message);
            } finally {
                setAddRequestStatus("idle");
            }
        }
    };

    return (
        <StyledForm>
            <div className="field">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    data-testid="title"
                    name="title"
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
                <div>
                    <Select
                        data-testid="users"
                        value={userId}
                        name="users"
                        id="users"
                        onChange={onUserChanged}
                        themes={themes}
                        mode={mode}
                        placeholder={"choose the user"}
                        data={users}
                    ></Select>
                </div>
            </div>
            <div className="field">
                <Button
                    themes={themes}
                    mode={mode}
                    variant="primary"
                    type="button"
                    onClick={onAddPostClicked}
                    disabled={!canAdd}
                >
                    Add Post
                </Button>
                <span>{addRequestError}</span>
            </div>
        </StyledForm>
    );
};

export default AddPostForm;
