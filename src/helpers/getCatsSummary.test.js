import getCatsSummary from "./getCatsSummary";

jest.mock("../utils/cats_utils", () => {
  return {
    avgWeight: jest.fn().mockReturnValue(4),
    avgLifeSpan: jest.fn().mockReturnValue(6),
    totalBreeds: jest.fn().mockReturnValue(33),
  };
});

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
test("handle the passing data ", () => {
  expect(getCatsSummary([{ data: "SOME_FAKE_DATA" }])).toEqual({
    totalBreeds: 33,
    averageLifeSpan: 6,
    avergageWeight: 4,
  });
});
