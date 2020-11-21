import React from "react";
import { fireEvent, render } from "@testing-library/react";
import AddPostForm from "./AddPostForm";
import { Provider } from "react-redux";
import store from "../../store/index";
import { INITIAL_STATE } from "../../test/mock_data";
import Client from "../../api/client";

import { fetchUsers } from "../users/usersSlice";

jest.mock("../../api/client");
beforeAll(() => {
  console.error = jest.fn();
});
beforeEach(async () => {
  Client.addNewPost = jest
    .fn()
    .mockResolvedValueOnce({ data: { ...INITIAL_STATE.posts.data[0] } });
  await store.dispatch(fetchUsers());
});

test("type text in title and content input, select a user from the dropdown of users, click save post button to add a post", async () => {
  expect(store.getState().users.data.length).toBe(3);
  const { getByTestId, getByRole, findAllByText } = render(
    <Provider store={store}>
      <AddPostForm />
    </Provider>
  );
  const addPostButton = getByRole("button") as HTMLButtonElement;
  const titleInput = getByTestId("title") as HTMLInputElement;
  const contentTextArea = getByTestId("content") as HTMLTextAreaElement;
  fireEvent.change(titleInput, { target: { value: "Title 3" } });
  fireEvent.change(contentTextArea, {
    target: { value: "Content 3" },
  });
  expect(addPostButton.disabled).toBeTruthy();
  fireEvent.change(getByTestId("users"), { target: { value: "0" } });

  expect(addPostButton.disabled).toBeFalsy();
  fireEvent.click(addPostButton);

  expect(Client.addNewPost).toHaveBeenCalledTimes(1);
  await findAllByText(/ /i);
  expect(titleInput.value).toBe("");
  expect(contentTextArea.value).toBe("");
  expect(addPostButton.disabled).toBeTruthy();
});

test("show error message when failed to add new post", async () => {
  Client.addNewPost = jest
    .fn()
    .mockRejectedValueOnce(new Error("Failed to add new post"));
  const { getByTestId, getByRole, findAllByText, getByText } = render(
    <Provider store={store}>
      <AddPostForm />
    </Provider>
  );
  fireEvent.change(getByTestId("title"), { target: { value: "Title 1" } });
  fireEvent.change(getByTestId("content"), {
    target: { value: "Content 1" },
  });
  fireEvent.change(getByTestId("users"), { target: { value: "1" } });
  fireEvent.click(getByRole("button"));
  expect(Client.addNewPost).toHaveBeenCalled();
  await findAllByText(/ /i);
  expect(getByText(/Failed to add new post/i)).toBeInTheDocument();
});
