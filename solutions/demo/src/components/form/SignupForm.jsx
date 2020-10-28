import React, { useState } from "react";

import Input from "../input/Input";
import ConfirmPasswordInput from "../input/ConfirmPasswordInput";
import withValidation from "../hoc/withValidation";
import withType from "../hoc/withType";

// 1. validation
// Use built-in validation (invalid popup is too ugly), Style it ? Hmm.. feeling reluctant
// Use Contraint Validation API to custom validation message (buggy)
// HOC withValidation, disable form's validation
// 2. Style HOC validation UI
// 3. form submission

const emailRef = React.createRef();
const confirmPasswordInputRef = React.createRef();

const ValidatedEmailInput = withValidation(Input);

const TypedNumberInput = withType(Input);
const TypedSubmitInput = withType(Input);

// Use novalidate attribute of form to turn off all validation
// Email use built-in default validation

const SignupForm = () => {
  const [message, setMessage] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    const [email] = [emailRef.current.value];
    const { pwd, confirmPwd, error } = confirmPasswordInputRef.current.state;
    const confirmIsValid =
      Object.entries(error).every(([, value]) => !value) && pwd === confirmPwd;
    if (confirmIsValid && !!email && !!pwd && !!confirmPwd) {
      // submit
      setTimeout(() => {
        setMessage(`Submit with ${email} ${pwd}`);
      }, 2000);
    } else {
      setMessage("Cannot submit invalid form ");
    }
  };

  return (
    <form noValidate onSubmit={onSubmit}>
      <fieldset>
        <legend>Sign up</legend>
        <div>
          <TypedNumberInput
            type="text"
            id="number"
            onChange={() => {
              console.log("Mount in SignupForm");
            }}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <ValidatedEmailInput
            type="email"
            id="email"
            name="email"
            required
            aria-label="Input Email"
            ref={emailRef}
            validate_options={{ pattern: /.+@(gmail|icloud)\..+/g }}
          />
        </div>
        <ConfirmPasswordInput ref={confirmPasswordInputRef} />
        <TypedSubmitInput type="submit" value="Submit" />
        <span>{message}</span>
      </fieldset>
    </form>
  );
};

export default SignupForm;
