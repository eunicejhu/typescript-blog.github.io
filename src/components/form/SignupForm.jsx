import React, { useState } from "react";

import Input from "../input/Input";
import ConfirmPasswordInput from "../input/ConfirmPasswordInput";
import withValidation from "../hoc/withValidation";

import validate from "../../utils/validate";

// 1. validation
// Use built-in validation (invalid popup is too ugly), Style it ? Hmm.. feeling reluctant
// Use Contraint Validation API to custom validation message (buggy)
// HOC withValidation, disable form's validation
// 2. Style HOC validation UI
// 3. form submission

// Use novalidate attribute of form to turn off all validation
// Email use built-in default validation
const EMAIL_VALIDATION_OPTIONS = {
  pattern: [/.+@(gmail|icloud)\..+/g, "Email should be gmail or icloud"],
};

const PASSWORD_VALIDATION_OPTIONS = {
  minLength: [6, "Length should be greater than 6"],
  maxLength: [22, "Length should be less than 22"],
  pattern: [
    /.*[a-z]+.*[A-Z]+.*/g,
    "Should contain at least one uppercase and one lowercase letter",
  ],
};
const validatePassword = validate(PASSWORD_VALIDATION_OPTIONS);
const validateEmail = validate(EMAIL_VALIDATION_OPTIONS);

const ValidatedEmailInput = withValidation(Input);

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!!email && !!pwd) {
      console.log("submit for user: ", email, pwd);
    } else {
      setMessage("Cannot submit");
    }
  };

  return (
    <form noValidate onSubmit={onSubmit}>
      <fieldset>
        <legend>Sign up</legend>

        <div>
          <label htmlFor="email">Email:</label>
          <ValidatedEmailInput
            type="email"
            id="email"
            name="email"
            setValue={(value) => {
              setEmail(value);
            }}
            required
            aria-label="Input Email"
            validate={validateEmail}
          />
        </div>
        <ConfirmPasswordInput
          setValue={(value) => setPwd(value)}
          validate={validatePassword}
        />
        <Input type="submit" value="Submit" />
        <span>{message}</span>
      </fieldset>
    </form>
  );
};

export default SignupForm;
