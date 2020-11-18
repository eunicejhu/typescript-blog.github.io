import getCatsSummary from "./getCatsSummary";
import { avgWeight, avgLifeSpan, totalBreeds } from "../utils/cats_metrics";

jest.mock("../utils/cats_metrics");

test("handle the passing data is null or [], undefined, {}", () => {
  expect(getCatsSummary([])).toEqual({
    totalBreeds: null,
    averageLifeSpan: null,
    avergageWeight: null,
  });
  expect(getCatsSummary(undefined)).toEqual({
    totalBreeds: null,
    averageLifeSpan: null,
    avergageWeight: null,
  });
  expect(getCatsSummary(null)).toEqual({
    totalBreeds: null,
    averageLifeSpan: null,
    avergageWeight: null,
  });
  expect(getCatsSummary("")).toEqual({
    totalBreeds: null,
    averageLifeSpan: null,
    avergageWeight: null,
  });
  expect(getCatsSummary({})).toEqual({
    totalBreeds: null,
    averageLifeSpan: null,
    avergageWeight: null,
  });
  expect(getCatsSummary(false)).toEqual({
    totalBreeds: null,
    averageLifeSpan: null,
    avergageWeight: null,
  });
});
test("handle the passing data", () => {
  avgWeight.mockReturnValue(4);
  avgLifeSpan.mockReturnValue(6);
  totalBreeds.mockReturnValue(33);
  expect(getCatsSummary([{ data: "SOME_FAKE_DATA" }])).toEqual({
    totalBreeds: 33,
    averageLifeSpan: 6,
    avergageWeight: 4,
  });
});
