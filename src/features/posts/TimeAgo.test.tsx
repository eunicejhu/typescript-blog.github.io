import React from "react";
import { render } from "@testing-library/react";
import TimeAgo from "./TimeAgo";
import getTimeAgo from "../../utils/getTimeAgo";

jest.mock("../../utils/getTimeAgo.ts");
test("render correctly", () => {
  (getTimeAgo as jest.Mock).mockReturnValue("28 minutes");
  const date = "2020-11-15T16:16:08.493Z";
  const ui = <TimeAgo date={date}></TimeAgo>;
  const { asFragment } = render(ui);
  expect(asFragment()).toMatchSnapshot();
});
