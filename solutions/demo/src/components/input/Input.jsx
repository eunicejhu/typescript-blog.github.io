
import React, { useState } from "react";
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

// checkbox
// radio

// range
// color

// file
// image

// email
// tel
// search
// password
// text

// number
// hidden
// reset
// submit
// button

// date cross-browser try use 3rd party library, IE & Safari does not support it. also, the date format user inputs differs. it's not always YYYY-MM-DD
// month need fallback select for non-support browser
// week need fallback select for non-support browser
// time need fallback, text for non-support browser
// datetime-local a date and time

export default Input;
