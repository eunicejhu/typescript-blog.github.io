import React from "react";
import { Router } from "react-router-dom";
import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import useSignup from "./useSignup";
import history from "../helpers/history";

jest.mock("axios");

test("store user to localStorage and redirect to home page when signup API call succeeds", async () => {
  axios.post.mockResolvedValueOnce({
    data: {
      id: 1,
      isLoggedIn: true,
      identifier: "eunicejhu@gmail.com",
    },
  });
  const wrapper = ({ children }) => (
    <Router history={history}>{children}</Router>
  );
  const { result, waitForNextUpdate } = renderHook(() => useSignup(), {
    wrapper,
  });
  try {
    result.current.signup({ identifier: "isabella", password: "***" });
    await waitForNextUpdate({ timeout: 100 });
  } catch (err) {}
  expect(history.location.pathname).toBe("/");
  expect(JSON.parse(localStorage.getItem("auth"))).toEqual({
    id: 1,
    isLoggedIn: true,
    identifier: "eunicejhu@gmail.com",
  });
});
test("return 'Identifier is taken' error when signup API call fails", async () => {
  axios.post.mockRejectedValueOnce("signup failure");
  const { result, waitForNextUpdate } = renderHook(() => useSignup());
  result.current.signup({ identifier: "isabella", password: "***" });
  await waitForNextUpdate();
  expect(result.current.error).toBe("Identifier is taken");
});
