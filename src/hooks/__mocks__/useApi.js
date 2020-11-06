export const API_STATUS = {
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
  LOADING: "LOADING",
};
const mock = jest.fn();
mock.API_STATUS = API_STATUS;
export default mock;
