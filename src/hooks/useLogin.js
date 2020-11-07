import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function useLogin() {
  const history = useHistory();
  const [, setCookie] = useCookies(["isLoggedIn"]);
  const login = () => {
    setTimeout(() => {
      // TODO: API call to login with identifier & password
      setCookie("isLoggedIn", true, { path: "/" });
      // go to home page
      history.replace("/");
    }, 1000);
  };
  return login;
}
