import authReducer, { AUTH_STATUS } from "./authReducer";

const initial = { data: null, error: null };

test("New state should be returned when dispatch AUTH_ERROR ", () => {
  const action = {
    type: AUTH_STATUS.ERROR,
    payload: "Invalid identifier or password",
  };

  expect(authReducer(initial, action)).toEqual({
    data: null,
    error: "Invalid identifier or password",
  });
});
test("New state should be returned when dispatch AUTH_SUCCESS ", () => {
  const action = {
    type: AUTH_STATUS.SUCCESS,
    payload: { id: 1, username: "isabella" },
  };

  expect(authReducer(initial, action)).toEqual({
    data: { id: 1, username: "isabella" },
    error: null,
  });
});

test("throw error when dispatch other actions", () => {
  const action = {
    type: "UNKNOWN_ACTION",
    data: { id: 1, username: "isabella" },
  };
  const wrapperFunc = () => {
    authReducer(initial, action);
  };
  expect(wrapperFunc).toThrowError("Unknown action");
});
