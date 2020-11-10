import React, { useState } from "react";

import authReducer, {
  INITIAL_AUTH_STATE,
  AUTH_STATUS,
} from "../../reducers/authReducer";
import useLogin from "../../hooks/useLogin";
import "./Login.scss";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [{ error }, dispatch] = React.useReducer(
    authReducer,
    INITIAL_AUTH_STATE
  );
  const { login } = useLogin(dispatch);
  const submitIsDisabled = !(identifier && password);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ identifier, password });
    } catch (err) {
      dispatch({ type: AUTH_STATUS.ERROR, err });
    }
  };
  return (
    <div className="form-container">
      <div className="backdrop">
        <form onSubmit={handleSubmit}>
          <small>{error}</small>
          <div className="field">
            <label htmlFor="identifier">Identifier</label>
            <input
              id="identifier"
              name="identifier"
              placeholder="Identifier"
              type="text"
              value={identifier}
              onChange={({ target: { value } }) => {
                setIdentifier(value);
              }}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={({ target: { value } }) => {
                setPassword(value);
              }}
              required
            />
          </div>
          <div className="field">
            <input
              type="submit"
              aria-label="submit"
              value="Login"
              disabled={submitIsDisabled}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
