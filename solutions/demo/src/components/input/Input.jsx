import React, { Component, useState } from "react";

//Handle types: color, file, email, password, search, radio, image, checkbox, button, tel, time
// validation options

const Input = React.forwardRef((props, ref) => {
  const [value, setValue] = useState("");
  const { type, value: valueProp } = props;
  const onChange = (e) => {
    const { onChange } = props;
    if (onChange) onChange(e);
    setValue(e.target.value);
  };
  console.log("Input ref: ", ref);
  switch (type) {
    case "submit":
      return <input {...props} value={valueProp} />;
      break;
    default:
      return <input ref={ref} {...props} value={value} onChange={onChange} />;
  }
});
const validate = (WrappedComponent) => {
  return class extends Component {
    state = {
      error: "",
    };

    handleValidate = (e) => {
      const { type, value } = e.target;
      const {
        validations: { email, tel },
      } = this.props;
      switch (type) {
        case "email":
          if (!value.match(email.regEx)) {
            this.setState({ error: "Email should be Gmail, icloud, yahoo." });
          } else {
            this.setState({ error: "" });
          }
          break;
        case "tel":
          if (!value.match(tel.regEx)) {
            this.setState({
              error: "Telphone number should be from China or France region",
            });
          } else {
            this.setState({ error: "" });
          }
          break;
        default:
          // text
          break;
      }
    };
    render() {
      const { error } = this.state;
      console.log(this.props.ref);
      return (
        <>
          <WrappedComponent {...this.props} onChange={this.handleValidate} />
          <small>{error}</small>
        </>
      );
    }
  };
};

export default Input;
export { validate };
