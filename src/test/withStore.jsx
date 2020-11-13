import React from "react";
import { Provider } from "react-redux";
import store from "../store";

const withStore = (Component) => (props) => (
  <Provider store={store}>
    <Component {...props} />
  </Provider>
);

export default withStore;
