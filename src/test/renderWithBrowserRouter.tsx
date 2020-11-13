import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";

const renderWithBrowserRouter = (
  ui: React.ReactElement,
  { route = "/" } = {}
) => {
  window.history.pushState({}, "Home page", route);
  return render(ui, { wrapper: BrowserRouter });
};

export default renderWithBrowserRouter;
