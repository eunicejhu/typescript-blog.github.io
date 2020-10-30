import React, { Component } from "react";

import Input from "../input/Input";
import withValidation from "../hoc/withValidation";

const firstnameRef = React.createRef();
const emailRef = React.createRef();
const telRef = React.createRef();
const validateEmailRef = React.createRef();
const validateTelRef = React.createRef();
const validations = {
  email: { regEx: /\w+@(gmail|icloud|yahoo)\.\w+/g },
  tel: { regEx: /\+\d{2}\s?\d{9,11}/g },
};
export default class Form extends Component {
  static onSubmit = (e) => {
    // submit data
    e.preventDefault();
    const firstname = firstnameRef.current.value;
    const email = emailRef.current.value;
    const tel = telRef.current.value;
    const errors = [
      validateEmailRef.current.state.error,
      validateTelRef.current.state.error,
    ];
    // check errors
    if (errors.every((error) => error === "")) {
      // eslint-disable-next-line no-console
      console.log("Submit!", { firstname, email, tel });
    } else {
      // eslint-disable-next-line no-console
      console.error("Cannot submit");
    }
  };

  render() {
    const ForwardedRefEmailInput = (props) => (
      <Input {...props} ref={emailRef} />
    );
    const ForwardedRefTelInput = (props) => <Input {...props} ref={telRef} />;
    const ValidatedEmailInput = withValidation(ForwardedRefEmailInput);
    const ValidateTelInput = withValidation(ForwardedRefTelInput);
    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <label htmlFor="firstname">FirstName:</label>
          <Input
            ref={firstnameRef}
            type="text"
            id="firstname"
            name="firstname"
            placeholder="firstname"
          />
        </div>
        <div>
          <label htmlFor="lastname">LastName:</label>
          <Input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="lastname"
          />
        </div>

        <fieldset>
          <legend>Gender</legend>
          <div>
            <Input type="radio" id="male" name="gender" value="male" />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <Input type="radio" id="female" name="gender" value="female" />
            <label htmlFor="female">Male</label>
          </div>
        </fieldset>
        <div>
          <label htmlFor="tel">Tel:</label>
          <ValidateTelInput
            ref={validateTelRef}
            type="tel"
            id="tel"
            name="tel"
            placeholder="tel"
            validations={validations}
            list="tels"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <ValidatedEmailInput
            ref={validateEmailRef}
            type="email"
            id="email"
            name="email"
            placeholder="email"
            validations={validations}
            list="emails"
            pattern="\w+@(gmail|icloud|yahoo).\w+"
          />
          <datalist id="emails">
            <option aria-label="emails" value="example@gmail.com" />
            <option aria-label="emails" value="example@icloud.com" />
            <option aria-label="emails" value="example@yahoo.com" />
          </datalist>
        </div>

        <div>
          <label htmlFor="url">Github</label>
          <Input type="url" id="url" name="url" pattern="http(s)?://\w+" />
        </div>

        <fieldset>
          <legend>Skills</legend>
          <div>
            <Input type="checkbox" id="react" name="skills" value="react" />
            <label htmlFor="react">React</label>
          </div>
          <div>
            <Input
              type="checkbox"
              id="reactRouter"
              name="skills"
              value="reactRouter"
            />
            <label htmlFor="reactRouter">React Router</label>
          </div>
          <div>
            <Input type="checkbox" id="sass" name="skills" value="sass" />
            <label htmlFor="sass">Sass</label>
          </div>
          <div>
            <Input type="checkbox" id="nodejs" name="skills" value="nodejs" />
            <label htmlFor="nodejs">NodeJS</label>
          </div>
        </fieldset>
        <div>
          <label htmlFor="startDate">Available From:</label>
          <Input
            type="date"
            id="startDate"
            name="startDate"
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div>
          <label htmlFor="cv">CV:</label>
          <Input
            type="file"
            id="cv"
            name="cv"
            placeholder="cv"
            accept=".pdf,.doc,.docx"
          />
        </div>
        <Input type="submit" value="Submit" />
      </form>
    );
  }
}
