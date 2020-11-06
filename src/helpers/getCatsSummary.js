import { avgWeight, avgLifeSpan, totalBreeds } from "../utils/cats_utils";

const useCatsSummary = (data) => ({
  totalBreeds: avgWeight(data),
  averageLifeSpan: avgLifeSpan(data),
  avergageWeight: totalBreeds(data),
});

export default useCatsSummary;
