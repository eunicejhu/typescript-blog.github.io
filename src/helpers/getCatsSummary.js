import { avgWeight, avgLifeSpan, totalBreeds } from "../utils/cats_utils";

const IsNotEmpty = (data) => Array.isArray(data) && data.length;
const useCatsSummary = (data) => {
  if (IsNotEmpty(data)) {
    return {
      totalBreeds: totalBreeds(data),
      averageLifeSpan: avgLifeSpan(data),
      avergageWeight: avgWeight(data),
    };
  }
  return {
    totalBreeds: null,
    averageLifeSpan: null,
    avergageWeight: null,
  };
};

export default useCatsSummary;
