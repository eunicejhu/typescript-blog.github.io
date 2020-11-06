export const mockLogin = jest.fn();
const mock = jest.fn().mockImplementation(() => {
  return mockLogin;
});
export default mock;
