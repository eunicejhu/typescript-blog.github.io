import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// enable passing ref to functional component
const Input = React.forwardRef((props, ref) => {
  const [value, setValue] = useState(props.value);
  useEffect(() => {
    setValue(props.value);
  }, []);
  const onChange = (e) => {
    const { onChange: otherHandler } = props;
    if (otherHandler) otherHandler(e);
    setValue(e.target.value);
  };
  return <input {...props} onChange={onChange} ref={ref} value={value} />;
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

export default Input;
