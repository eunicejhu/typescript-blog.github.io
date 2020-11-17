import React from "react";
import TimeAgo from "./TimeAgo";
import getTimeAgo from "../../utils/getTimeAgo";

jest.mock("../../utils/getTimeAgo.ts", () => ({
  __esModule: true,
  default: jest.fn(),
}));
test("render correctly", () => {
  getTimeAgo.mockReturnValue("28 minutes");
  const date = "2020-11-15T16:16:08.493Z";
  const tree = renderer.create(<TimeAgo date={date} />).toJSON();
  expect(tree).toMatchSnapshot();
});
