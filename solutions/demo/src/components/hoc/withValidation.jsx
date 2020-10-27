import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "../../styles/validate.module.scss";

const withValidation = (WrappedComponent) => {
  class ValidatedComponent extends Component {
    state = {
      error: "",
    };

    handleValidate = (e) => {
      const { type, value, name } = e.target;
      const {
        validate_options: { email, tel, minLength, maxLength, pattern },
        validation: { error, message },
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

      if (minLength && value.length < minLength) {
        this.setState({ error: `${name} length should be > ${minLength} ` });
      } else if (maxLength && value.length > maxLength) {
        this.setState({ error: `${name} length should be < ${maxLength} ` });
      } else if (pattern && !value.match(pattern)) {
        this.setState({ error: `${name} does not match ${pattern} ` });
      } else {
        this.setState({ error: "" });
      }

      if (error) {
        this.setState({ error: message });
      }
    };

    render() {
      const { error } = this.state;
      const { className, ...restProps } = this.props;
      return (
        <>
          <WrappedComponent
            className={`${className} ${!error ? "" : styles.errorInput}`}
            {...restProps}
            onInput={this.handleValidate}
          />
          <small className={styles.error}>{error}</small>
        </>
      );
    }
  }

  ValidatedComponent.propTypes = {
    className: PropTypes.string,
    validation: PropTypes.shape({
      error: PropTypes.bool,
      message: PropTypes.string,
    }),
    validate_options: PropTypes.shape({
      maxLength: PropTypes.number,
      minLength: PropTypes.number,
      pattern: PropTypes.instanceOf(RegExp),
      email: PropTypes.shape({ regEx: PropTypes.instanceOf(RegExp) }),
      tel: PropTypes.shape({ regEx: PropTypes.instanceOf(RegExp) }),
    }),
  };

  ValidatedComponent.defaultProps = {
    className: "",
    validation: { error: false, message: "" },
    validate_options: {
      maxLength: 0,
      minLength: 0,
      pattern: null,
      email: { regEx: null },
      tel: { regEx: null },
    },
  };

  return ValidatedComponent;
};

export default withValidation;
