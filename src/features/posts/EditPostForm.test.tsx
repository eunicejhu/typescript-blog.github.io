import EditPostForm from "./EditPostForm";
import React from "react";
import { Route } from "react-router-dom";
import renderWithStoreAndRouter from "../../test/renderWithStoreAndRouter";
import { fireEvent } from "@testing-library/react";

test("show no post found when post does not exist", () => {
  const { getByText, getByDisplayValue } = renderWithStoreAndRouter(
    <Route path="/posts/edit/:id">
      <EditPostForm />
    </Route>,
    {
      route: "/posts/edit/unknown-id",
    }
  );
  expect(getByText(/No post found/i)).toBeInTheDocument();
});

test("load existing post in the form", () => {
  const { getByText, getByDisplayValue } = renderWithStoreAndRouter(
    <Route path="/posts/edit/:id">
      <EditPostForm />
    </Route>,
    {
      route: "/posts/edit/1",
    }
  );
  expect(getByDisplayValue(/First test Post!/i)).toBeInTheDocument();
  expect(getByText(/test!/i)).toBeInTheDocument();
});

test("edit post, submit it with all fields are filled, direct to home page ", () => {
  const {
    container,
    getByTestId,
    getByRole,
    getByText,
  } = renderWithStoreAndRouter(
    <Route path="/posts/edit/:id">
      <EditPostForm />
    </Route>,
    {
      route: "/posts/edit/1",
    }
  );
  fireEvent.change(container.querySelector("#title"), {
    target: { value: "Updated Title 1" },
  });
  fireEvent.change(container.querySelector("#content"), {
    target: { value: "Updated Content 1" },
  });
  fireEvent.submit(getByRole("button"));
  expect(window.location.pathname).toBe("/");
});
