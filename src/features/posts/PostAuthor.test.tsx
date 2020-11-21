import React from "react";
import PostAuthor from "./PostAuthor";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store";
import { fetchUsers } from "../users/usersSlice";

describe("PostAuthor test", () => {
  beforeEach(async () => {
    await store.dispatch(fetchUsers());
  });

  test("render correctly", () => {
    const ui = (
      <Provider store={store}>
        <PostAuthor userId={"2"} />
      </Provider>
    );
    const tree = renderer.create(ui).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("show By Unknown author if user does not exist", () => {
    const ui = (
      <Provider store={store}>
        <PostAuthor userId={"unknown"} />
      </Provider>
    );
    const { getByText } = render(ui);
    expect(getByText(/Unknown author/i)).toBeInTheDocument();
  });
});
