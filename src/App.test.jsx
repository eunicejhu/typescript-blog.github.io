import React from "react";
import renderer from "react-test-renderer";
import App from "./App";
import BrowserRouterWrapper from "./test/BrowserRouterWrapper.tsx";
import StoreWrapper from "./test/StoreWrapper";

test("renders correctly", () => {
  const tree = renderer
    .create(
      <BrowserRouterWrapper>
        <StoreWrapper>
          <App />
        </StoreWrapper>
      </BrowserRouterWrapper>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
