import { avgWeight, avgLifeSpan } from "./cats_metrics";
import CATS from "../data/cats.json";

let fakeData;

describe("test cats utility functions", () => {
  beforeAll(() => {
    fakeData = CATS.splice(0, 1);
  });
  afterAll(() => {
    fakeData = null;
  });
  test("average of weight should be 4", () => {
    expect(avgWeight(fakeData)).toBe(4);
  });
  test("average of lifespan should be 14.5", () => {
    expect(avgLifeSpan(fakeData)).toBe(14.5);
  });
});
