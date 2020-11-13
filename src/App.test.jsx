import React from "react";
import renderer from "react-test-renderer";
import App from "./App";
import BrowserRouterWrapper from "./test/BrowserRouterWrapper.tsx";

test("renders correctly", () => {
  const tree = renderer
    .create(
      <BrowserRouterWrapper>
        <App />
      </BrowserRouterWrapper>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
