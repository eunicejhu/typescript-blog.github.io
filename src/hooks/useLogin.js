import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function useLogin() {
  const history = useHistory();
  const [, setCookie] = useCookies(["isLoggedIn"]);
  const login = ({ identifier, password }) => {
    setTimeout(() => {
      // API call to login}
      setCookie("isLoggedIn", true, { path: "/" });
      // go to home page
      history.replace("/");
    }, 1000);
  };
  return login;
}
