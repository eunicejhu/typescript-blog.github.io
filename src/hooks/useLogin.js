import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { AUTH_STATUS } from "../reducers/authReducer";

const LOGIN_URL = "LOGIN_URL";

export default function useLogin(dispatch) {
  const history = useHistory();
  const [, setCookie] = useCookies(["auth"]);
  const login = async (identifier, password) => {
    try {
      const result = await axios.post(LOGIN_URL, { identifier, password });
      const { data } = result;
      dispatch({ type: AUTH_STATUS.SUCCESS, payload: data });
      setCookie("auth", data, { path: "/" });
      history.replace("/");
    } catch (error) {
      dispatch({ type: AUTH_STATUS.ERROR, payload: error });
    }
  };
  return { login };
}
