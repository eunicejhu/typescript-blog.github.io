export const AUTH_STATUS = {
  SUCCESS: "AUTH_SUCCESS",
  ERROR: "AUTH_ERROR",
};
export const INITIAL_AUTH_STATE = {
  data: null,
  error: null,
};
export default function authReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case AUTH_STATUS.SUCCESS:
      return { ...state, data: payload, error: null };
    case AUTH_STATUS.ERROR:
      return { ...state, data: null, error: payload };
    default:
      throw Error("Unknown action");
  }
}
