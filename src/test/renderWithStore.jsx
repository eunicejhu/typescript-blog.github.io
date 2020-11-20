import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store/index";

const renderWithStore = (ui) => {
  const wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return render(ui, { wrapper });
};

export default renderWithStore;
