import React from "react";

const withStyle = (WrappedComponent) => {
  return (props) => <WrappedComponent {...props} style={{}} />;
};

export default withStyle;
