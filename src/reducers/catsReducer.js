import { API_STATUS } from "../hooks/useApi";

function catsReducer(state, action) {
  const { payload, type } = action;
  switch (type) {
    case API_STATUS.LOADING:
      return { ...state, data: null, error: null, status: API_STATUS.LOADING };
    case API_STATUS.SUCCESS:
      return {
        ...state,
        data: payload.data,
        error: null,
        status: API_STATUS.SUCCESS,
      };
    case API_STATUS.ERROR:
      return {
        ...state,
        data: null,
        error: payload.error,
        status: API_STATUS.LOADING,
      };
    default:
      throw new Error("invalid action");
  }
}

export default catsReducer;
