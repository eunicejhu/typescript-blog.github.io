const R = require("ramda");

const average = (arr) =>
  Math.round((arr.reduce((sum, curr) => sum + curr, 0) / arr.length) * 100) /
  100;
const format = (str) => str.split("-").map((substr) => Number(substr.trim()));
const metrics = (data) =>
  data.map(({ weight: { metric } }) => average(format(metric)));
const lifeSpans = (data) =>
  data.map(({ life_span: lifeSpan }) => average(format(lifeSpan)));

const avgWeight = R.compose(average, metrics);
const avgLifeSpan = R.compose(average, lifeSpans);

export { avgWeight, avgLifeSpan };
