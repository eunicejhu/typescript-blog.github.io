import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function useLogout() {
  const history = useHistory();
  const [, setCookie] = useCookies(["isLoggedIn"]);
  const logout = () => {
    setCookie("isLoggedIn", false, { path: "/" });
    history.replace("/");
  };
  return logout;
}
