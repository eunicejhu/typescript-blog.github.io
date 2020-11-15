import React from "react";
import PostAuthor from "./PostAuthor";
import renderer from "react-test-renderer";
import StoreWrapper from "../../test/StoreWrapper";
import { render } from "@testing-library/react";

test("render correctly", () => {
  const tree = renderer
    .create(
      <StoreWrapper>
        <PostAuthor id={"2"} />
      </StoreWrapper>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("show By Unknown author if user does not exist", () => {
  const { getByText } = render(
    <StoreWrapper>
      <PostAuthor id={"unknown"} />
    </StoreWrapper>
  );
  expect(getByText(/Unknown author/i)).toBeInTheDocument();
});
