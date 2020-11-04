import { useHistory } from "react-router-dom";
import {useCookies} from 'react-cookie'

export default function useLogin() {
  const history = useHistory();
  const [, setCookie] = useCookies(['isLoggedIn']);
  const login = ({ identifier, password }) => {
    setTimeout(() => {
      // API call to login}
      setCookie('isLoggedIn', true, {path:"/"})
      // back to previous page
      history.go(-1);
    }, 1000);
  };
  return login;
}
