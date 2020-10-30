import React, { useState } from "react";
import { useImmer } from "use-immer";
import PropTypes from "prop-types";

import style from "./ConfirmPasswordInput.module.scss";

const ConfirmPasswordInput = (props) => {
  const { handleConfirm, validate } = props;
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [error, setError] = useImmer({ pwd: "", confirmPwd: "" });

  const handleChangePwd = (e) => {
    const { value } = e.target;
    setPwd(value);

    // clear confirm password and error
    setConfirmPwd("");
    setError((draft) => {
      draft.confirmPwd = "";
    });

    setError((draft) => {
      draft.pwd = validate(value);
    });
  };
  const handleChangeConfirmPwd = (e) => {
    const { value } = e.target;
    const isIdentical = !!value && !!pwd && value === pwd;
    setConfirmPwd(value);
    if (isIdentical) {
      handleConfirm(pwd);
      // clear error if exist
      setError((draft) => {
        draft.confirmPwd = "";
      });
    } else {
      setError((draft) => {
        draft.confirmPwd = "Password is not identical";
      });
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
          className={!error.pwd ? "" : style.invalid}
          value={pwd}
        />
        <small data-testid="error_pwd" className={style.error}>
          {error.pwd}
        </small>
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
          className={!error.confirmPwd ? "" : style.invalid}
          value={confirmPwd}
        />
        <small data-testid="error_confirmPwd" className={style.error}>
          {error.confirmPwd}
        </small>
      </div>
    </>
  );
};

ConfirmPasswordInput.propTypes = {
  handleConfirm: PropTypes.func,
  validate: PropTypes.func,
};
ConfirmPasswordInput.defaultProps = {
  handleConfirm: (value) => value,
  validate: () => {},
};

export default ConfirmPasswordInput;
