import { renderHook } from "@testing-library/react-hooks";
import useApi, { API_STATUS } from "./useApi";

// automatic mock
jest.mock("axios", () => ({
  get: jest
    .fn()
    .mockResolvedValueOnce()
    .mockResolvedValueOnce({ data: "FAKE DATA" })
    .mockRejectedValueOnce("Error"),
}));
test("loading when getting data is in progress", () => {
  const { result } = renderHook(() => useApi("URL"));
  expect(result.current.state).toBe(API_STATUS.LOADING);
});
test("succeed when successfully get data", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useApi("URL"));
  await waitForNextUpdate();
  expect(result.current.data).toBe("FAKE DATA");
  expect(result.current.state).toBe(API_STATUS.SUCCESS);
});
test("throw error when failed get data", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useApi("URL"));
  await waitForNextUpdate();
  expect(result.current.data).toBe(null);
  expect(result.current.state).toBe(API_STATUS.ERROR);
  expect(result.current.error).toBe("Error");
});
