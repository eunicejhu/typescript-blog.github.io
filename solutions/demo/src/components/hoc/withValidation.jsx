import React, { Component } from "react";
import PropTypes from "prop-types";

const withValidation = (WrappedComponent) => {
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

export default withValidation;
