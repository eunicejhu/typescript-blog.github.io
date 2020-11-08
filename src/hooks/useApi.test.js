import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import useApi, { API_STATUS } from "./useApi";

jest.mock("axios");

let dispatch;

beforeEach(() => {
  axios.get = jest.fn().mockName("get");
  dispatch = jest.fn().mockName("dispatch");
});
afterEach(() => {
  axios.get = null;
  dispatch = null;
});

test("loading when getting data is in progress", () => {
  renderHook(() => useApi("URL", dispatch));
  expect(dispatch).toHaveBeenCalledWith({ type: API_STATUS.LOADING });
});
test("succeed when successfully get data", async () => {
  axios.get.mockReturnValueOnce({ data: "FAKE DATA" });
  const { waitForNextUpdate } = renderHook(() => useApi("URL", dispatch));
  try {
    await waitForNextUpdate({ timeout: 100 });
  } catch (err) {
    expect(err.timeout).toBeTruthy();
  }
  expect(dispatch).toHaveBeenLastCalledWith({
    type: API_STATUS.SUCCESS,
    payload: { data: "FAKE DATA" },
  });
});
test("throw error when failed get data", async () => {
  axios.get.mockRejectedValueOnce(new Error("error"));
  const { waitForNextUpdate } = renderHook(() => useApi("URL", dispatch));
  try {
    await waitForNextUpdate({ timeout: 100 });
  } catch (err) {
    expect(err.timeout).toBeTruthy();
    expect(dispatch).toHaveBeenLastCalledWith({
      type: API_STATUS.ERROR,
      payload: { error: Error("error") },
    });
  }
});
