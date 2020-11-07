import React from "react";

import CSSLogo from "../../assets/images/css_logo.png";
import HTMLLogo from "../../assets/images/html_logo.png";
import REACTLogo from "../../assets/images/react_logo.png";

const ImageStyle = {
  display: "flex",
  justifyContent: "center",
  height: 300,
};
const Image = () => (
  <div className="image_wrapper" style={ImageStyle}>
    <img src={CSSLogo} alt="css logo" />
    <img src={HTMLLogo} alt="html logo" />
    <img src={REACTLogo} alt="react logo" />
  </div>
);

export default Image;
