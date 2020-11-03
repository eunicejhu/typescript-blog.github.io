import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function useLogin() {
  const [isLogged, setIsLogged] = useState(false);
  const history = useHistory();
  const login = ({ identifier, password }) => {
    setTimeout(() => {
      // API call to login}
      setIsLogged(true);
      // back to previous page
      history.goBack("/");
    }, 1000);
  };
  return [isLogged, login];
}
