import React, { useRef, useState } from "react";
import useSignup from "../../hooks/useSignup";

export default function Signup() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPwdRef = useRef("");
  const [disabled, setDisabled] = useState(true);
  const [visible, setVisible] = useState(false);
  const { error, signup } = useSignup();

  const onChange = (e) => {
    e.preventDefault();
    const noBlankInputs =
      !!emailRef.current.value &&
      !!passwordRef.current.value &&
      !!confirmPwdRef.current.value;
    const passwordIsIdentical =
      passwordRef.current.value === confirmPwdRef.current.value;
    if (noBlankInputs && passwordIsIdentical) {
      setDisabled(false);
    }
    if (passwordIsIdentical) {
      setVisible(false);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({
        identifier: emailRef.current.value,
        password: passwordRef.current.value,
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Signup</h1>
        <small style={{ display: `${error ? "block" : "none"}` }}>
          Identifier is taken
        </small>
        <div>
          <label htmlFor="email">Email</label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            required
            placeholder="Email"
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            required
            placeholder="Password"
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="confirm_password">Confirm password</label>
          <input
            ref={confirmPwdRef}
            type="password"
            id="confirm_password"
            required
            placeholder="password"
            onChange={onChange}
          />
          <small style={{ display: `${visible ? "block" : "none"}` }}>
            Password is not identical
          </small>
        </div>
        <div>
          <input type="submit" value="Signup" disabled={disabled} />
        </div>
      </form>
    </div>
  );
}
