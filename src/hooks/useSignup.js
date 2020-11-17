import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SIGNUP_URL = "singup_url";
export default function useSignup() {
  const [error, setError] = useState(null);
  const history = useHistory();
  const signup = async ({ identifier, password }) => {
    try {
      const result = await axios.post(SIGNUP_URL, { identifier, password });
      const { data } = result;
      localStorage.setItem("auth", JSON.stringify(data));
      history.push("/");
    } catch (err) {
      // console.error(err);
      setError("Identifier is taken");
    }
  };
  return { error, signup };
}
