import React from "react";

const Subscribe = () => (
  <div className="subscribe_wrapper">
    <h2>SUBSCRIBE</h2>
    <p>Sign up with your email address to receive news and updates</p>
    <div className="inputs_wrapper">
      <input className="firstname" type="text" placeholder="First name" />
      <input className="lastname" type="text" placeholder="Last name" />
      <input className="email" type="text" placeholder="Email name" />
    </div>
    <button type="submit">Subscribe</button>
  </div>
);

export default Subscribe;
