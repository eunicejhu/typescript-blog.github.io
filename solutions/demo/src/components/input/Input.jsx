import React, { Component, useState } from "react";
import PropTypes from "prop-types";

// Handle types: color, file, email, password, search, radio, image, checkbox, button, tel, time
// validation options

const Input = React.forwardRef((props, ref) => {
  const [value, setValue] = useState("");
  const { type, value: valueProp } = props;
  const onChange = (e) => {
    const { onChange: otherHandler } = props;
    if (otherHandler) otherHandler(e);
    setValue(e.target.value);
  };
  switch (type) {
    case "submit":
      return <input {...props} value={valueProp} />;
    default:
      return <input ref={ref} {...props} value={value} onChange={onChange} />;
  }
});
Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
Input.defaultProps = {
  type: "text",
  value: "",
  onChange: () => {},
};
Input.displayName = "Input";

const validate = (WrappedComponent) => {
  class ValidatedComponent extends Component {
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
      return (
        <>
          <WrappedComponent {...this.props} onChange={this.handleValidate} />
          <small>{error}</small>
        </>
      );
    }
  }

  ValidatedComponent.propTypes = {
    validations: PropTypes.shape({
      email: PropTypes.shape({ regEx: PropTypes.instanceOf(RegExp) }),
      tel: PropTypes.shape({ regEx: PropTypes.instanceOf(RegExp) }),
    }).isRequired,
  };

  return ValidatedComponent;
};

export default Input;
export { validate };
