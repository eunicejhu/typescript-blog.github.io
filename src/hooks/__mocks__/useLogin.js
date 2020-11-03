export const mockLogin = jest.fn();
const mock = jest.fn().mockImplementation(() => {
  return [false, mockLogin];
});
export default mock;
