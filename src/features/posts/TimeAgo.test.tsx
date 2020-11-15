import React from "react";
import TimeAgo from "./TimeAgo";
import renderer from "react-test-renderer";

jest.mock("../../utils/getTimeAgo.ts", () =>
  jest.fn().mockReturnValue("28 minutes")
);
test("render correctly", () => {
  const date = "2020-11-15T16:16:08.493Z";
  const tree = renderer.create(<TimeAgo date={date} />).toJSON();
  expect(tree).toMatchSnapshot();
});
