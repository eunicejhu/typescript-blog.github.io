import React, { useState } from "react";

import Input from "../input/Input";
import withValidation from "../hoc/withValidation";

// 1. validation
// Use built-in validation (invalid popup is too ugly), Style it ? Hmm.. feeling reluctant
// Use Contraint Validation API to custom validation message (buggy)
// HOC withValidation, disable form's validation
// 2. Style HOC validation UI
// 3. form submission

const emailRef = React.createRef();
const pwdRef = React.createRef();
const pwdConfirmationRef = React.createRef();
const validatedPwdInputRef = React.createRef();
const validatedConfirmPwdInputRef = React.createRef();

// Use novalidate attribute of form to turn off all validation
// Email use built-in default validation
// Password should be 6-22 length, at least one uppercase and one lowercase
// customize validaty message
const ONE_UPPERCASE_REGEX = /[A-Z]{1}/g;
const ONE_LOWERCASE_REGEX = /[a-z]{1}/g;
const MAX_PASSWORD_LENGTH = 22;
const MIN_PASSWORD_LENGTH = 6;

const VALIDATE_PASSWORD = {
  minLength: 6,
  maxLength: 22,
  pattern: /.*[a-z]+.*[A-Z]+.*/g,
};

const SignupForm = () => {
  const [message, setMessage] = useState("");
  const [confirm, setConfirm] = useState(true);
  const onSubmit = (e) => {
    const [email, password] = [emailRef.current.value, pwdRef.current.value];
    e.preventDefault();
    setTimeout(() => {
      setMessage(`Submit with ${email}, ${password}`);
    }, 2000);
  };

  const onConfirmPasswordInput = () => {
    const [pwd, confirmpwd] = [
      pwdRef.current.value,
      pwdConfirmationRef.current.value,
    ];
    setConfirm(pwd === confirmpwd);
  };

  const ValidatedPwdInput = withValidation((props) => (
    <Input {...props} ref={pwdRef} />
  ));
  const ValidatedConfirmPwdInput = withValidation((props) => (
    <Input {...props} ref={pwdConfirmationRef} />
  ));

  return (
    <form noValidate onSubmit={onSubmit}>
      <fieldset>
        <legend>Sign up</legend>
        <div>
          <label htmlFor="email">Email:</label>
          <Input
            type="email"
            id="email"
            name="email"
            // required
            aria-label="Input Email"
            ref={emailRef}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <ValidatedPwdInput
            type="password"
            id="password"
            name="password"
            className="form-pwd-input"
            required
            aria-label="Input Password"
            validate_options={VALIDATE_PASSWORD}
            ref={validatedPwdInputRef}
          />
        </div>
        <div>
          <label htmlFor="password_confirmation">Confirm Password:</label>
          <ValidatedConfirmPwdInput
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            required
            aria-label="confirm password"
            onInput={onConfirmPasswordInput}
            validation={{
              error: confirm,
              message: "Please type the same password!",
            }}
            ref={validatedConfirmPwdInputRef}
          />
        </div>
        <Input type="submit" value="Submit" />
        <span>{message}</span>
      </fieldset>
    </form>
  );
};

export default SignupForm;
