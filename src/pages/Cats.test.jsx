import React from "react";
import { render } from "@testing-library/react";
import Cats from "./Cats";
import useApi, { API_STATUS } from "../hooks/useApi";
import getCatsSummary from "../helpers/getCatsSummary";

const MOCK_CATS_DATA = [
  {
    weight: { imperial: "7  -  10", metric: "3 - 5" },
    id: "abys",
    name: "Abyssinian",
    cfa_url: "http://cfa.org/Breeds/BreedsAB/Abyssinian.aspx",
    vetstreet_url: "http://www.vetstreet.com/cats/abyssinian",
    vcahospitals_url:
      "https://vcahospitals.com/know-your-pet/cat-breeds/abyssinian",
    temperament: "Active, Energetic, Independent, Intelligent, Gentle",
    origin: "Egypt",
    country_codes: "EG",
    country_code: "EG",
    description:
      "The Abyssinian is easy to care for, and a joy to have in your home. They’re affectionate cats and love both people and other animals.",
    life_span: "14 - 15",
    indoor: 0,
    lap: 1,
    alt_names: "",
    adaptability: 5,
    affection_level: 5,
    child_friendly: 3,
    dog_friendly: 4,
    energy_level: 5,
    grooming: 1,
    health_issues: 2,
    intelligence: 5,
    shedding_level: 2,
    social_needs: 5,
    stranger_friendly: 5,
    vocalisation: 1,
    experimental: 0,
    hairless: 0,
    natural: 1,
    rare: 0,
    rex: 0,
    suppressed_tail: 0,
    short_legs: 0,
    wikipedia_url: "https://en.wikipedia.org/wiki/Abyssinian_(cat)",
    hypoallergenic: 0,
  },
  {
    weight: { imperial: "7 - 10", metric: "3 - 5" },
    id: "aege",
    name: "Aegean",
    vetstreet_url: "http://www.vetstreet.com/cats/aegean-cat",
    temperament: "Affectionate, Social, Intelligent, Playful, Active",
    origin: "Greece",
    country_codes: "GR",
    country_code: "GR",
    description:
      "Native to the Greek islands known as the Cyclades in the Aegean Sea, these are natural cats, meaning they developed without humans getting involved in their breeding. As a breed, Aegean Cats are rare, although they are numerous on their home islands. They are generally friendly toward people and can be excellent cats for families with children.",
    life_span: "9 - 12",
    indoor: 0,
    alt_names: "",
    adaptability: 5,
    affection_level: 4,
    child_friendly: 4,
    dog_friendly: 4,
    energy_level: 3,
    grooming: 3,
    health_issues: 1,
    intelligence: 3,
    shedding_level: 3,
    social_needs: 4,
    stranger_friendly: 4,
    vocalisation: 3,
    experimental: 0,
    hairless: 0,
    natural: 0,
    rare: 0,
    rex: 0,
    suppressed_tail: 0,
    short_legs: 0,
    wikipedia_url: "https://en.wikipedia.org/wiki/Aegean_cat",
    hypoallergenic: 0,
  },
];
jest.mock("react-router-dom", () => {
  return {
    useRouteMatch: jest.fn().mockReturnValue({ url: "/cats" }),
    // eslint-disable-next-line react/prop-types
    Link: ({ to, children, ...rest }) => (
      // eslint-disable-next-line react/prop-types
      <a href={`${to.pathname}${to.search}`} {...rest}>
        {children}
      </a>
    ),
  };
});

jest.mock("../hooks/useQuery", () => {
  return () => ({ get: jest.fn().mockReturnValue(null) });
});

jest.mock("../helpers/getCatsSummary");
getCatsSummary.mockReturnValue({
  totalBreeds: 67,
  averageLifeSpan: 4.17,
  averageWeight: 14.71,
});
jest.mock("../hooks/useApi");
useApi.mockReturnValue({
  data: MOCK_CATS_DATA,
  state: API_STATUS.SUCCESS,
  error: null,
});

test("show summary info", () => {
  const { getByTestId } = render(<Cats />);
  expect(getByTestId("totalBreeds").innerHTML).toBe("67");
  expect(getByTestId("averageLifeSpan").innerHTML).toBe("4.17");
  expect(getByTestId("averageWeight").innerHTML).toBe("14.71");
});
test("show cats list", () => {
  const { baseElement } = render(<Cats />);
  const firstCat = baseElement.querySelector("li.item");

  expect(baseElement.querySelectorAll("li.item").length).toBe(
    MOCK_CATS_DATA.length
  );
  expect(firstCat.innerHTML).toContain(MOCK_CATS_DATA[0].name);
});

test("Each cat item is a link to its cat page ", () => {
  const { baseElement } = render(<Cats />);
  const firstItemClassName = `.${MOCK_CATS_DATA[0].id}`;
  const firstCatLi = baseElement.querySelector(firstItemClassName);
  expect(firstCatLi.innerHTML).toContain(`/cats?id=${MOCK_CATS_DATA[0].id}`);
});
