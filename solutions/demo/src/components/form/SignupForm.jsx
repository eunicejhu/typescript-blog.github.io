import React, { useState } from "react";

import Input from "../input/Input";
import ConfirmPasswordInput from "../input/ConfirmPasswordInput";

// 1. validation
// Use built-in validation (invalid popup is too ugly), Style it ? Hmm.. feeling reluctant
// Use Contraint Validation API to custom validation message (buggy)
// HOC withValidation, disable form's validation
// 2. Style HOC validation UI
// 3. form submission

const emailRef = React.createRef();

// Use novalidate attribute of form to turn off all validation
// Email use built-in default validation

const SignupForm = () => {
  const [message, setMessage] = useState("");
  const onSubmit = (e) => {
    const [email] = [emailRef.current.value];
    e.preventDefault();

    setTimeout(() => {
      setMessage(`Submit with ${email}`);
    }, 2000);
  };

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
        <ConfirmPasswordInput />
        <Input type="submit" value="Submit" />
        <span>{message}</span>
      </fieldset>
    </form>
  );
};

export default SignupForm;
