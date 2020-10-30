import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "../../styles/validate.module.scss";

const withValidation = (WrappedComponent) => {
  class ValidatedComponent extends Component {
    state = {
      error: "",
    };

    handleChange = (e) => {
      const { validate, setValue } = this.props;
      const { value } = e.target;
      const error = validate(value);
      this.setState({ error });
      if (!error) {
        setValue(value);
      } else {
        setValue("");
      }
    };

    render() {
      const { error } = this.state;
      const {
        className,
        forwardedRef,
        setValue,
        validate,
        ...restProps
      } = this.props;
      return (
        <>
          <WrappedComponent
            className={`${className} ${!error ? "" : styles.errorInput}`}
            {...restProps}
            onChange={this.handleChange}
            ref={forwardedRef}
          />
          <small className={styles.error}>{error}</small>
        </>
      );
    }
  }

  ValidatedComponent.propTypes = {
    className: PropTypes.string,
    validate: PropTypes.func,
    setValue: PropTypes.func,
    forwardedRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape(PropTypes.instanceOf({ current: PropTypes.elementType })),
    ]),
  };

  ValidatedComponent.defaultProps = {
    className: "",
    forwardedRef: () => {},
    validate: () => "",
    setValue: () => "",
  };

  return React.forwardRef((props, ref) => {
    return <ValidatedComponent {...props} forwardedRef={ref} />;
  });
};

export default withValidation;
