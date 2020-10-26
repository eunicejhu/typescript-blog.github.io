import React from "react";

import Input, { validate } from "./components/input/Input";
import Form from "./components/form/Form";

class App extends React.Component {
  render() {
    // Tel should be a valid number from France or China
    // Email should be a valid email. allowed list be yahoo,gmail,icloud
    const validations = {
      email: { regEx: /\w+@(gmail|icloud|yahoo)\.\w+/g },
      tel: { regEx: /\+\d{2}\s?\d{9,11}/g },
    };

    const ProfessionalEmailInput = Input;
    const ValidatedPersonalEmailInput = validate(Input);
    const ValidatedTelInput = validate(Input);
    return (
      <>
        <Form />
        <ProfessionalEmailInput
          type="email"
          name="professionalEmail"
          placeholder="Professional Email"
        />
        <ValidatedPersonalEmailInput
          type="email"
          name="personalEmail"
          placeholder="Personal Email"
          validations={validations}
        />
        <ValidatedTelInput
          type="tel"
          name="tel"
          placeholder="Tel"
          validations={validations}
        />
      </>
    );
  }
}

export default App;
