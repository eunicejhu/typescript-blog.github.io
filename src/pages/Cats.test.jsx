import React from "react";
import { render } from "@testing-library/react";
import renderInRouter from "../test/renderInRouter";

import Cats from "./Cats";
import getCatsSummary from "../helpers/getCatsSummary";

import { MOCK_CATS_DATA } from "../__mocks__/cats";
import { API_STATUS } from "../hooks/__mocks__/useApi";

jest.mock("react-router-dom", () => {
  return {
    useRouteMatch: jest.fn().mockReturnValue({ url: "/cats" }),
    Link: jest.requireActual("react-router-dom").Link,
    Router: jest.requireActual("react-router-dom").Router,
  };
});

const mockUseQueryGet = jest.fn();
jest.mock("../hooks/useQuery", () => {
  return () => ({ get: mockUseQueryGet.mockReturnValue() });
});

jest.mock("../helpers/getCatsSummary");
getCatsSummary.mockReturnValue({
  totalBreeds: null,
  averageLifeSpan: null,
  averageWeight: null,
});
jest.mock("../hooks/useApi");

jest.mock("./Cat.jsx", () => jest.fn(() => <div data-testid="CatComponent" />));

const { useReducer } = React;
const mockUseReducer = jest.spyOn(React, "useReducer");

test("Loading", () => {
  const mockInitial = { data: null, status: null, error: null };
  mockUseReducer.mockImplementation(() => useReducer(jest.fn(), mockInitial));
  const { container } = render(<Cats />);
  expect(container.innerHTML).toContain("Loading");
});

describe("Data is loaded", () => {
  test("show summary and datalist", () => {
    const mockInitial = {
      data: MOCK_CATS_DATA,
      status: API_STATUS.SUCCESS,
      error: null,
    };
    mockUseReducer.mockImplementation(() => useReducer(jest.fn(), mockInitial));
    getCatsSummary.mockReturnValue({
      totalBreeds: 67,
      averageLifeSpan: 4.17,
      averageWeight: 14.71,
    });

    const { getByTestId, baseElement } = renderInRouter(Cats);
    const firstCat = baseElement.querySelector("li.item");

    expect(getByTestId("totalBreeds").innerHTML).toBe("67");
    expect(getByTestId("averageLifeSpan").innerHTML).toBe("4.17");
    expect(getByTestId("averageWeight").innerHTML).toBe("14.71");

    expect(baseElement.querySelectorAll("li.item").length).toBe(
      MOCK_CATS_DATA.length
    );
    expect(firstCat.innerHTML).toContain(MOCK_CATS_DATA[0].name);
  });
});

test("Show No data when No Data error", () => {
  const mockInitial = {
    data: null,
    status: API_STATUS.ERROR,
    error: "No Data",
  };
  mockUseReducer.mockImplementation(() => useReducer(jest.fn(), mockInitial));
  const { container } = render(<Cats />);
  expect(container.innerHTML).toContain("No Data");
});

test("Show No data when returned data is empty", () => {
  const mockInitial = {
    data: [],
    status: API_STATUS.SUCCESS,
    error: null,
  };
  mockUseReducer.mockImplementation(() => useReducer(jest.fn(), mockInitial));
  const { container } = render(<Cats />);
  expect(container.innerHTML).toContain("No Data");
});

// QUESTION: why we cannot querySelector from container? https://testing-library.com/docs/react-testing-library/api#container
// REFERENCE: React testing library https://testing-library.com/docs/react-testing-library/intro
// REFERENCE: DOM testing library https://testing-library.com/docs/dom-testing-library/intro
// REFERENCE: jsdom https://github.com/jsdom/jsdom
// REFERENCE dom standard https://dom.spec.whatwg.org/ html standard https://html.spec.whatwg.org/multipage/

test("Render Cat Component when /cats?id=CAT_ID", () => {
  mockUseQueryGet.mockReturnValueOnce("CAT_ID");
  const { getByTestId } = render(<Cats />);
  expect(getByTestId("CatComponent")).not.toBeNull();
});

test("Each cat item is a link to its cat page ", () => {
  const mockInitial = {
    data: MOCK_CATS_DATA,
    status: API_STATUS.SUCCESS,
    error: null,
  };
  mockUseReducer.mockImplementation(() => useReducer(jest.fn(), mockInitial));
  const { getByTestId } = renderInRouter(Cats);
  const firstLink = getByTestId(MOCK_CATS_DATA[0].id);
  expect(firstLink.href).toContain(`/cats?id=${MOCK_CATS_DATA[0].id}`);
});
