import React from 'react'

import CSSLogo from "./images/css_logo.png"
import HTMLLogo from "./images/html_logo.png"
import REACTLogo from "./images/react_logo.png"

const ImageStyle = {
    display: "flex",
    alignContent: "center",
    height: 300,
    margin: "0 2em"
}
export const Image = () =><div className="image_wrapper" style={ImageStyle}> 
    <img src={CSSLogo} alt="css logo" />
    <img src={HTMLLogo} alt="html logo" />
    <img src={REACTLogo} alt="react logo" />
 </div>