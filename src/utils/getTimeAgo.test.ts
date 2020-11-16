import getTimeAgo from "./getTimeAgo";

test("return empty string when invalid date", () => {
  expect(getTimeAgo("")).toBe("");
});
