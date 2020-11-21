import EditPostForm from "./EditPostForm";
import React from "react";
import { MemoryRouter, Route, BrowserRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store/index";
import { fetchPosts } from "./postsSlice";

describe("EditPostFrom test", () => {
  beforeEach(async () => {
    await store.dispatch(fetchPosts());
  });
  test("show no post found when post does not exist", () => {
    const ui = (
      <MemoryRouter initialEntries={["/editPost/unknown-id"]} initialIndex={0}>
        <Provider store={store}>
          <Route path="/editPost/:id">
            <EditPostForm />
          </Route>
        </Provider>
      </MemoryRouter>
    );
    const { getByText } = render(ui);
    expect(getByText(/No post found/i)).toBeInTheDocument();
  });

  test("load existing post in the form", () => {
    const ui = (
      <MemoryRouter initialEntries={["/editPost/1"]} initialIndex={0}>
        <Provider store={store}>
          <Route path="/editPost/:id">
            <EditPostForm />
          </Route>
        </Provider>
      </MemoryRouter>
    );
    const { getByText, getByDisplayValue } = render(ui);
    expect(getByDisplayValue(/First test Post!/i)).toBeInTheDocument();
    expect(getByText(/test!/i)).toBeInTheDocument();
  });

  test("edit post, submit it with all fields are filled, direct to home page", () => {
    window.history.pushState({}, "Edit post", "/editPost/1");
    const ui = (
      <BrowserRouter>
        <Provider store={store}>
          <Route path="/editPost/:id">
            <EditPostForm />
          </Route>
        </Provider>
      </BrowserRouter>
    );
    const { getByRole, getByLabelText } = render(ui);
    fireEvent.change(getByLabelText("Title"), {
      target: { value: "Updated Title 1" },
    });
    fireEvent.change(getByLabelText("Content"), {
      target: { value: "Updated Content 1" },
    });
    fireEvent.click(getByRole("button"));
    expect(window.location.pathname).toBe("/");
  });
});
