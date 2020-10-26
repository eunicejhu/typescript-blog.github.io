import React, {Component} from 'react'

import Input, { validate } from "../input/Input"

const firstnameRef = React.createRef();
const emailRef = React.createRef();
const telRef = React.createRef();
const validateEmailRef = React.createRef();
const validateTelRef = React.createRef();
const validations = {email: {regEx: /\w+@(gmail|icloud|yahoo)\.\w+/g}, tel: {regEx: /\+\d{2}\s?\d{9,11}/g}}
export default class Form extends Component {
    onSubmit = (e) => {
        // submit data
        e.preventDefault()
        const firstname = firstnameRef.current.value
        const email = emailRef.current.value
        const tel = telRef.current.value
        const errors = [validateEmailRef.current.state.error, validateTelRef.current.state.error]

        // check errors
        if(errors.every(error => error === "")) {
            console.log("Submit!",{firstname, email, tel})
        } else {
            console.error("Cannot submit")
        }

    }
    render() {
        const ForwardedRefEmailInput = (props) => <Input {...props} ref={emailRef} />
        const ForwardedRefTelInput = (props) => <Input {...props} ref={telRef} />
        const ValidatedEmailInput = validate(ForwardedRefEmailInput)
        const ValidateTelInput = validate(ForwardedRefTelInput)
        return <form onSubmit={this.onSubmit}>
           <label htmlFor="firstname">FirstName:</label> <Input ref={firstnameRef} type="text" id="firstname" name="firstname" placeholder="firstname"   ></Input>
           <label htmlFor="lastname">LastName:</label> <Input type="text" id="lastname" name="lastname" placeholder="lastname"  ></Input>
           <label htmlFor="tel">Tel:</label> <ValidateTelInput ref={validateTelRef} type="tel" id="tel" name="tel" placeholder="tel" validations={validations}  ></ValidateTelInput>
           <label htmlFor="email">Email:</label> <ValidatedEmailInput ref={validateEmailRef}  type="email" id="email" name="email" placeholder="email"  validations={validations} ></ValidatedEmailInput>
           <label htmlFor="file">file:</label> <Input type="file" id="file" name="file" placeholder="cv"  ></Input>
           <Input type="submit" value="Submit" />
        </form>
    }
}
