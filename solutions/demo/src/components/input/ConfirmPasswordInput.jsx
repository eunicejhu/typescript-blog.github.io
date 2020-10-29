import React, { useState } from "react";
import { produce } from "immer";
import { useImmer } from "use-immer";
import PropTypes from "prop-types";

import style from "./ConfirmPasswordInput.module.scss";

const VALIDATE_OPTIONS = {
  minLength: [6, "Length should be greater than 6"],
  maxLength: [22, "Length should be less than 22"],
  pattern: [
    /.*[a-z]+.*[A-Z]+.*/g,
    "Should contain at least one uppercase and one lowercase letter",
  ],
};

// Password should be 6-22 length, at least one uppercase and one lowercase
// customize validaty message

const validate = (value, options, cb) => {
  const { minLength, maxLength, pattern } = options;
  if (value.length < minLength[0]) {
    cb(minLength[1]);
  } else if (value.length > maxLength[0]) {
    cb(maxLength[1]);
  } else if (!value.match(pattern[0])) {
    cb(pattern[1]);
  } else {
    cb("");
  }
};

/**
 *
 * @param {handleConfirm} props
 * initial value {pwd: "", error: true, handlePwd, handleError}
 *
 */

export const ConfirmPasswordInputFC = (props) => {
  const { handleConfirm } = props;
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const handleChangePwd = (e) => {
    setPwd(e.target.value);
  };
  const handleChangeConfirmPwd = (e) => {
    const { value } = e.target;
    const isIdentical = !!value && !!pwd && value === pwd;
    setConfirmPwd(value);
    if (isIdentical) {
      handleConfirm(pwd);
    }
  };

  return (
    <>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          aria-label="Input Password"
          onChange={handleChangePwd}
          data-testid="password"
          // className={!error.pwd ? "" : style.invalid}
          value={pwd}
        />
        {/* <small className={style.error}>{error.pwd}</small> */}
      </div>
      <div>
        <label htmlFor="password_confirmation">Confirm Password:</label>
        <input
          type="password"
          id="password_confirmation"
          name="password_confirmation"
          required
          aria-label="confirm password"
          onChange={handleChangeConfirmPwd}
          data-testid="password_confirmation"
          // className={!error.confirmPwd ? "" : style.invalid}
          value={confirmPwd}
        />
        {/* <small className={style.error}>{error.confirmPwd}</small> */}
      </div>
    </>
  );
};

ConfirmPasswordInputFC.propTypes = {
  handleConfirm: PropTypes.func,
};
ConfirmPasswordInputFC.defaultProps = {
  handleConfirm: () => {},
};

class ConfirmPasswordInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pwd: "",
      confirmPwd: "",
      error: { pwd: "", confirmPwd: "" },
    };
  }

  handlePwdInputChange = (e) => {
    const { value } = e.target;
    const errorCb = (message) => {
      this.setState(
        produce((draft) => {
          draft.error = { pwd: message, confirmPwd: "" };
          draft.pwd = value;
          draft.confirmPwd = "";
        })
      );
    };
    validate(value, VALIDATE_OPTIONS, errorCb);
  };

  handleConfirmPwdInputChange = (e) => {
    const { value } = e.target;
    const { pwd } = this.state;
    this.setState((prevState) => ({ ...prevState, confirmPwd: value }));
    if (value !== pwd) {
      this.setState(
        produce((draft) => {
          draft.error.confirmPwd = "Password is not identical";
        })
      );
    } else {
      this.setState(
        produce((draft) => {
          draft.error.confirmPwd = "";
        })
      );
    }
  };

  render() {
    const { pwd, confirmPwd, error } = this.state;
    return (
      <>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            aria-label="Input Password"
            onChange={this.handlePwdInputChange}
            className={!error.pwd ? "" : style.invalid}
            value={pwd}
          />
          <small className={style.error}>{error.pwd}</small>
        </div>
        <div>
          <label htmlFor="password_confirmation">Confirm Password:</label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            required
            aria-label="confirm password"
            onChange={this.handleConfirmPwdInputChange}
            className={!error.confirmPwd ? "" : style.invalid}
            value={confirmPwd}
          />
          <small className={style.error}>{error.confirmPwd}</small>
        </div>
      </>
    );
  }
}

export default ConfirmPasswordInput;
